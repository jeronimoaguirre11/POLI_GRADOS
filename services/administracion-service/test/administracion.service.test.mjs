import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import axios from 'axios';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AdministracionService } from '../dist/modules/administracion/administracion.service.js';
import { CrearEstudianteDto } from '../dist/modules/administracion/dto/crear-estudiante.dto.js';
import { CrearCuentaDto } from '../dist/modules/administracion/dto/crear-cuenta.dto.js';

process.env.INTERNAL_API_KEY = 'clave-interna-prueba';
process.env.AUTH_SERVICE_URL = 'http://auth';
process.env.ESTUDIANTES_SERVICE_URL = 'http://estudiantes';
process.env.DOCENTES_SERVICE_URL = 'http://docentes';
process.env.EMPRESAS_SERVICE_URL = 'http://empresas';

const ADMIN = { sub: 'admin-1', email: 'admin@prueba.com', rol: 'SUPERADMIN' };
const original = { get: axios.get, post: axios.post, patch: axios.patch };

afterEach(() => Object.assign(axios, original));

// Simula auth-service. "estado" es lo que responde la verificacion de la
// cuenta del administrador en cada peticion.
function simularAuth({
  estado = { rol: 'SUPERADMIN', activo: true },
  usuarios = [],
  roles = {},
  perfiles = {},
} = {}) {
  const llamadas = [];
  axios.get = async (url, config) => {
    assert.equal(config.headers['x-internal-key'], 'clave-interna-prueba');
    llamadas.push(['GET', url]);
    if (url === `http://auth/internal/usuarios/${ADMIN.sub}/estado`) return { data: estado };
    if (url === 'http://auth/internal/usuarios/administracion') return { data: usuarios };
    const rol = url.match(/^http:\/\/auth\/internal\/usuarios\/([^/]+)\/estado$/);
    if (rol && roles[rol[1]]) return { data: { rol: roles[rol[1]], activo: true } };
    if (perfiles[url]) return { data: perfiles[url] };
    throw new Error(`URL inesperada ${url}`);
  };
  axios.post = async (url, body, config) => {
    assert.equal(config.headers['x-internal-key'], 'clave-interna-prueba');
    llamadas.push(['POST', url, body]);
    return { data: { id: 'nuevo', ...body, password: undefined } };
  };
  axios.patch = async (url, body, config) => {
    assert.equal(config.headers['x-internal-key'], 'clave-interna-prueba');
    llamadas.push(['PATCH', url, body]);
    return { data: { id: 'x', ...body } };
  };
  return llamadas;
}

test('rechaza a quien no es SUPERADMIN sin llamar a auth-service', async () => {
  const llamadas = simularAuth();
  const service = new AdministracionService();

  for (const rol of ['COORDINADOR', 'DOCENTE', 'ESTUDIANTE', 'EMPRESA']) {
    await assert.rejects(
      service.listarUsuarios({ ...ADMIN, rol }),
      (error) => error.getStatus() === 403,
    );
  }
  assert.equal(llamadas.length, 0);
});

test('un super administrador desactivado pierde el acceso aunque su JWT siga vigente', async () => {
  simularAuth({ estado: { rol: 'SUPERADMIN', activo: false } });
  const service = new AdministracionService();

  await assert.rejects(
    service.crearCoordinador(ADMIN, { nombre: 'C', email: 'c@p.com', password: 'Clave1234' }),
    (error) => error.getStatus() === 403,
  );
});

test('lista usuarios con resumen por rol y estado, sin el super administrador', async () => {
  simularAuth({
    usuarios: [
      { id: '1', rol: 'SUPERADMIN', activo: true },
      { id: '2', rol: 'ESTUDIANTE', activo: true },
      { id: '3', rol: 'ESTUDIANTE', activo: false },
      { id: '4', rol: 'DOCENTE', activo: true },
    ],
  });
  const service = new AdministracionService();

  const { usuarios, resumen } = await service.listarUsuarios(ADMIN);

  assert.equal(usuarios.length, 3);
  assert.equal(usuarios.some((u) => u.rol === 'SUPERADMIN'), false);
  assert.deepEqual(resumen, {
    total: 3,
    activos: 2,
    inactivos: 1,
    porRol: { COORDINADOR: 0, DOCENTE: 1, ESTUDIANTE: 2, EMPRESA: 0 },
  });
});

test('cada tipo de cuenta va a su ruta interna y el rol lo fija el servidor', async () => {
  const llamadas = simularAuth();
  const service = new AdministracionService();
  const base = { nombre: 'N', email: 'n@p.com', password: 'Clave1234' };

  await service.crearCoordinador(ADMIN, base);
  await service.crearDocente(ADMIN, { ...base, identificacion: '123' });
  await service.crearEstudiante(ADMIN, { ...base, codigo: '2026', programa: 'INGENIERO_AGROPECUARIO', rol: 'SUPERADMIN' });
  await service.crearEmpresa(ADMIN, { ...base, nombreEmpresa: 'E', nit: '9', sector: 'Agro' });

  const posts = llamadas.filter(([m]) => m === 'POST');
  assert.deepEqual(
    posts.map(([, url]) => url),
    [
      'http://auth/internal/usuarios/coordinador',
      'http://auth/internal/usuarios/docente',
      'http://auth/internal/usuarios/registro',
      'http://auth/internal/usuarios/registro',
    ],
  );
  assert.equal(posts[2][2].rol, 'ESTUDIANTE');
  assert.equal(posts[3][2].rol, 'EMPRESA');
});

test('reenvia el status y mensaje de auth-service (correo duplicado)', async () => {
  simularAuth();
  axios.post = async () => {
    const error = new Error('409');
    error.isAxiosError = true;
    error.response = { status: 409, data: { message: 'Ya existe un usuario con ese email' } };
    throw error;
  };
  const service = new AdministracionService();

  await assert.rejects(
    service.crearCoordinador(ADMIN, { nombre: 'C', email: 'c@p.com', password: 'Clave1234' }),
    (error) => error.getStatus() === 409 && error.message === 'Ya existe un usuario con ese email',
  );
});

test('el administrador no puede desactivarse a si mismo', async () => {
  const llamadas = simularAuth();
  const service = new AdministracionService();

  await assert.rejects(
    service.cambiarEstado(ADMIN, ADMIN.sub, false),
    (error) => error.getStatus() === 400,
  );
  assert.equal(llamadas.some(([m]) => m === 'PATCH'), false);

  const resultado = await service.cambiarEstado(ADMIN, 'otro-id', false);
  assert.equal(resultado.activo, false);
});

test('los DTO aplican la politica de contrasena y la lista de programas', async () => {
  const debil = plainToInstance(CrearCuentaDto, { nombre: 'A', email: 'a@p.com', password: 'clave' });
  assert.equal((await validate(debil)).some((e) => e.property === 'password'), true);

  const programaMalo = plainToInstance(CrearEstudianteDto, {
    nombre: 'A',
    email: 'a@p.com',
    password: 'Clave1234',
    codigo: '1',
    programa: 'MEDICINA',
  });
  assert.equal((await validate(programaMalo)).some((e) => e.property === 'programa'), true);
});

test('no existe forma de crear otro super administrador', () => {
  const service = new AdministracionService();
  assert.equal(typeof service.crearAdministrador, 'undefined');
});

test('el administrador asigna una contrasena nueva a otra cuenta', async () => {
  const llamadas = simularAuth();
  const service = new AdministracionService();

  await service.restablecerPassword(ADMIN, 'usuario-7', 'Nueva1234');

  const patch = llamadas.find(([m]) => m === 'PATCH');
  assert.equal(patch[1], 'http://auth/internal/usuarios/usuario-7/password');
  assert.deepEqual(patch[2], { password: 'Nueva1234' });
});

test('no puede cambiar su propia contrasena por esta ruta ni sin ser SUPERADMIN', async () => {
  const llamadas = simularAuth();
  const service = new AdministracionService();

  await assert.rejects(
    service.restablecerPassword(ADMIN, ADMIN.sub, 'Nueva1234'),
    (error) => error.getStatus() === 400,
  );
  await assert.rejects(
    service.restablecerPassword({ ...ADMIN, rol: 'COORDINADOR' }, 'otro', 'Nueva1234'),
    (error) => error.getStatus() === 403,
  );
  assert.equal(llamadas.some(([m]) => m === 'PATCH'), false);
});

test('devuelve el perfil segun el rol, solo con sus campos', async () => {
  simularAuth({
    roles: { e1: 'ESTUDIANTE', c1: 'COORDINADOR' },
    perfiles: {
      'http://estudiantes/internal/estudiantes/por-usuario/e1': {
        id: 'interno', usuarioId: 'e1', codigo: '2026', programa: 'INGENIERO_AGROPECUARIO', semestre: 4,
      },
    },
  });
  const service = new AdministracionService();

  assert.deepEqual(await service.obtenerPerfil(ADMIN, 'e1'), {
    rol: 'ESTUDIANTE',
    perfil: { codigo: '2026', programa: 'INGENIERO_AGROPECUARIO', semestre: 4 },
  });
  assert.deepEqual(await service.obtenerPerfil(ADMIN, 'c1'), { rol: 'COORDINADOR', perfil: null });
});

test('edita nombre y correo en auth-service, pero no los propios', async () => {
  const llamadas = simularAuth({ roles: { d1: 'DOCENTE' } });
  const service = new AdministracionService();

  await service.actualizarCuenta(ADMIN, 'd1', { nombre: 'Nuevo nombre' });
  const patch = llamadas.find(([m]) => m === 'PATCH');
  assert.equal(patch[1], 'http://auth/internal/usuarios/d1');
  assert.deepEqual(patch[2], { nombre: 'Nuevo nombre' });

  await assert.rejects(
    service.actualizarCuenta(ADMIN, ADMIN.sub, { nombre: 'Yo' }),
    (error) => error.getStatus() === 400,
  );
});

test('edita el perfil en el microservicio de su rol y valida los campos', async () => {
  const llamadas = simularAuth({ roles: { p1: 'EMPRESA', e1: 'ESTUDIANTE', c1: 'COORDINADOR' } });
  const service = new AdministracionService();

  await service.actualizarPerfil(ADMIN, 'p1', { nit: '900-1', sector: 'Café' });
  const patch = llamadas.find(([m]) => m === 'PATCH');
  assert.equal(patch[1], 'http://empresas/internal/empresas/por-usuario/p1');
  assert.deepEqual(patch[2], { nit: '900-1', sector: 'Café' });

  const esperar400 = (promesa) => assert.rejects(promesa, (error) => error.getStatus() === 400);
  await esperar400(service.actualizarPerfil(ADMIN, 'p1', { codigo: '1' }));
  await esperar400(service.actualizarPerfil(ADMIN, 'e1', { programa: 'MEDICINA' }));
  await esperar400(service.actualizarPerfil(ADMIN, 'c1', { sector: 'x' }));
});
