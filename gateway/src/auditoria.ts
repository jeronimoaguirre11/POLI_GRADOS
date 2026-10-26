import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

// Registro de auditoria: el gateway ve pasar todas las peticiones, asi que
// aqui se anota cada accion que modifica datos (y algunas descargas
// sensibles) y se envia a auditoria-service. Nunca se lee ni se guarda el
// cuerpo de la peticion (contrasenas, formularios): solo quien, que, cuando,
// desde donde y el resultado.

interface UsuarioToken {
  sub?: string;
  email?: string;
  rol?: string;
}

// [metodo, patron de la ruta, descripcion legible]. ":id" es cualquier
// segmento. El primero que coincida gana.
const ACCIONES: Array<[string, string, string]> = [
  ['POST', '/auth/register', 'Registrarse en la plataforma'],
  ['POST', '/auth/logout', 'Cerrar sesión'],
  ['PATCH', '/auth/perfil', 'Actualizar su cuenta (nombre, correo o contraseña)'],

  ['POST', '/administracion/usuarios/coordinadores', 'Crear coordinador'],
  ['POST', '/administracion/usuarios/docentes', 'Crear docente'],
  ['POST', '/administracion/usuarios/estudiantes', 'Crear estudiante'],
  ['POST', '/administracion/usuarios/empresas', 'Crear empresa'],
  ['PATCH', '/administracion/usuarios/:id/perfil', 'Editar perfil de una cuenta'],
  ['PATCH', '/administracion/usuarios/:id/password', 'Cambiar contraseña de una cuenta'],
  ['PATCH', '/administracion/usuarios/:id/estado', 'Activar o desactivar una cuenta'],
  ['PATCH', '/administracion/usuarios/:id', 'Editar nombre o correo de una cuenta'],

  ['POST', '/coordinadores/docentes', 'Crear docente (coordinación)'],
  ['POST', '/coordinadores/asignaciones-docentes', 'Asignar docente a estudiante'],
  ['PUT', '/coordinadores/asignaciones-docentes', 'Reasignar docente'],
  ['DELETE', '/coordinadores/asignaciones-docentes/:id', 'Retirar docente asignado'],
  ['GET', '/coordinadores/reportes/convocatorias-activas.pdf', 'Descargar reporte de convocatorias'],

  ['PATCH', '/empresas/perfil', 'Actualizar perfil de empresa'],
  ['POST', '/empresas/ofertas', 'Publicar convocatoria'],
  ['PATCH', '/empresas/ofertas/:id', 'Editar convocatoria'],
  ['DELETE', '/empresas/ofertas/:id', 'Eliminar convocatoria'],
  ['PATCH', '/empresas/postulaciones/:id', 'Cambiar estado de una postulación'],
  ['GET', '/empresas/postulaciones/:id/hoja-vida', 'Descargar hoja de vida'],

  ['PATCH', '/estudiantes/perfil', 'Actualizar perfil de estudiante'],

  ['POST', '/postulaciones', 'Postularse a una convocatoria'],
  ['DELETE', '/postulaciones/:id', 'Retirar postulación'],

  ['POST', '/diplomados', 'Crear diplomado'],
  ['POST', '/diplomados/:id/inscripciones', 'Inscribirse a diplomado'],
  ['DELETE', '/diplomados/:id/inscripciones', 'Cancelar inscripción a diplomado'],

  ['POST', '/investigaciones', 'Registrar investigación'],
  ['PATCH', '/investigaciones/:id', 'Editar investigación'],
  ['DELETE', '/investigaciones/:id', 'Eliminar investigación'],
];

const METODOS_QUE_MODIFICAN = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function coincide(patron: string, ruta: string) {
  const a = patron.split('/');
  const b = ruta.split('/');
  return a.length === b.length && a.every((parte, i) => parte === ':id' || parte === b[i]);
}

export function describirAccion(metodo: string, ruta: string) {
  const encontrada = ACCIONES.find(([m, patron]) => m === metodo && coincide(patron, ruta));
  return encontrada?.[2];
}

function leerCookie(cabecera: string | undefined, nombre: string) {
  for (const parte of (cabecera ?? '').split(';')) {
    const [clave, ...valor] = parte.trim().split('=');
    if (clave === nombre) return decodeURIComponent(valor.join('='));
  }
  return undefined;
}

// Verifica un JWT HS256 (el que firma auth-service) sin librerias extra. Si
// la firma no es valida o ya vencio, se trata como peticion sin usuario.
export function leerUsuario(token: string | undefined, secreto: string | undefined) {
  if (!token || !secreto) return undefined;
  const partes = token.split('.');
  if (partes.length !== 3) return undefined;

  const firmaEsperada = createHmac('sha256', secreto)
    .update(`${partes[0]}.${partes[1]}`)
    .digest();
  const firma = Buffer.from(partes[2], 'base64url');
  if (firma.length !== firmaEsperada.length || !timingSafeEqual(firma, firmaEsperada)) {
    return undefined;
  }

  try {
    const datos = JSON.parse(Buffer.from(partes[1], 'base64url').toString('utf8'));
    if (typeof datos.exp === 'number' && datos.exp * 1000 < Date.now()) return undefined;
    return datos as UsuarioToken;
  } catch {
    return undefined;
  }
}

export function crearMiddlewareAuditoria() {
  const destino = process.env.AUDITORIA_SERVICE_URL;
  const secreto = process.env.JWT_SECRET;
  const claveInterna = process.env.INTERNAL_API_KEY ?? '';
  let avisoMostrado = false;

  return (req: Request, res: Response, next: NextFunction) => {
    const metodo = req.method.toUpperCase();
    const ruta = (req.originalUrl ?? req.url).split('?')[0];
    const descripcion = describirAccion(metodo, ruta);

    // Se anotan las acciones que modifican datos y las descargas sensibles.
    // El inicio de sesion lo registra auth-service (sabe quien lo intento).
    const registrar =
      destino &&
      ruta !== '/auth/login' &&
      (METODOS_QUE_MODIFICAN.has(metodo) || descripcion !== undefined);

    if (!registrar) return next();

    const usuario = leerUsuario(leerCookie(req.headers.cookie, 'token'), secreto);
    // El gateway es la puerta de entrada: la IP es la de la conexion. No se
    // usa x-forwarded-for del cliente porque cualquiera podria inventarla.
    const ip = req.socket.remoteAddress?.replace(/^::ffff:/, '') || undefined;

    res.on('finish', () => {
      const evento = {
        usuarioId: usuario?.sub,
        email: usuario?.email,
        rol: usuario?.rol,
        accion: descripcion ?? `${metodo} ${ruta}`,
        metodo,
        ruta: ruta.slice(0, 300),
        servicio: ruta.split('/')[1] || 'gateway',
        estado: res.statusCode,
        exito: res.statusCode < 400,
        ip: ip?.slice(0, 64),
      };

      // Sin await: la auditoria nunca debe frenar ni tumbar la peticion.
      fetch(`${destino}/internal/eventos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal-key': claveInterna },
        body: JSON.stringify(evento),
      }).catch((error: Error) => {
        if (!avisoMostrado) {
          avisoMostrado = true;
          console.warn(`[auditoria] No se pudo registrar el evento: ${error.message}`);
        }
      });
    });

    next();
  };
}
