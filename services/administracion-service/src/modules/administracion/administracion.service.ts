import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';
import { CrearCuentaDto } from './dto/crear-cuenta.dto.js';
import { CrearDocenteDto } from './dto/crear-docente.dto.js';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto.js';
import { CrearEmpresaDto } from './dto/crear-empresa.dto.js';
import { ActualizarCuentaDto } from './dto/actualizar-cuenta.dto.js';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto.js';
import { PROGRAMAS } from './dto/validaciones.js';

// Roles que se administran desde el panel. El super administrador es unico y
// no se lista: no se puede crear otro ni desactivarlo.
export const ROLES = [
  'COORDINADOR',
  'DOCENTE',
  'ESTUDIANTE',
  'EMPRESA',
] as const;

// Donde vive el perfil de cada rol y que campos se pueden editar. El
// coordinador no tiene perfil: solo nombre y correo (en auth-service).
const PERFILES: Record<
  string,
  { variable: string; ruta: string; campos: (keyof ActualizarPerfilDto)[] }
> = {
  ESTUDIANTE: {
    variable: 'ESTUDIANTES_SERVICE_URL',
    ruta: 'internal/estudiantes',
    campos: ['codigo', 'programa', 'semestre'],
  },
  DOCENTE: {
    variable: 'DOCENTES_SERVICE_URL',
    ruta: 'internal/docentes',
    campos: ['identificacion', 'programa', 'especialidad'],
  },
  EMPRESA: {
    variable: 'EMPRESAS_SERVICE_URL',
    ruta: 'internal/empresas',
    campos: ['nombreEmpresa', 'nit', 'sector'],
  },
};

export interface UsuarioAdministrado {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  createdAt: string;
}

// Este servicio no tiene base de datos: orquesta a auth-service (y, a traves
// de el, a empresas/estudiantes/docentes) por sus rutas /internal, que el
// gateway nunca expone. Toda la autorizacion del super administrador vive
// aqui. La plataforma tiene un solo super administrador (lo crea auth-service
// al arrancar), por eso aqui no hay forma de crear otro.
@Injectable()
export class AdministracionService {
  private headersInternos() {
    return { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' };
  }

  private urlAuth() {
    const valor = process.env.AUTH_SERVICE_URL;
    if (!valor) {
      throw new InternalServerErrorException(
        'Falta configurar AUTH_SERVICE_URL en administracion-service',
      );
    }
    return `${valor}/internal/usuarios`;
  }

  private urlPerfil(rol: string, usuarioId: string) {
    const destino = PERFILES[rol];
    const base = destino && process.env[destino.variable];
    if (!destino || !base) {
      throw new InternalServerErrorException(
        `Falta configurar ${destino?.variable ?? 'la URL del perfil'} en administracion-service`,
      );
    }
    return `${base}/${destino.ruta}/por-usuario/${encodeURIComponent(usuarioId)}`;
  }

  // Rol real de la cuenta (no se confia en lo que diga el frontend).
  private async rolDe(id: string) {
    const estado = await this.llamarAuth<{ rol: string }>(
      () =>
        axios.get(`${this.urlAuth()}/${id}/estado`, {
          headers: this.headersInternos(),
        }),
      'No se pudo consultar la cuenta',
    );
    if (estado.rol === 'SUPERADMIN') {
      throw new ForbiddenException(
        'Los datos del super administrador no se editan desde aquí',
      );
    }
    return estado.rol;
  }

  // Reenvia el status y el mensaje de auth-service (409 correo duplicado,
  // 400 validacion, 404...) en lugar de convertir todo en un 500.
  private async llamarAuth<T>(
    peticion: () => Promise<{ data: T }>,
    mensajePorDefecto: string,
  ): Promise<T> {
    try {
      const respuesta = await peticion();
      return respuesta.data;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data as { message?: string | string[] };
        throw new HttpException(
          data?.message ?? mensajePorDefecto,
          error.response.status,
        );
      }
      throw new InternalServerErrorException(
        'No fue posible comunicarse con auth-service',
      );
    }
  }

  // Ademas del rol del JWT se consulta el estado real de la cuenta: si otro
  // administrador la desactivo, pierde el acceso en la siguiente peticion.
  private async asegurarSuperadminActivo(payload: JwtPayload) {
    if (payload?.rol !== 'SUPERADMIN') {
      throw new ForbiddenException(
        'Solo el super administrador puede usar este panel',
      );
    }

    const estado = await this.llamarAuth<{ rol: string; activo: boolean }>(
      () =>
        axios.get(`${this.urlAuth()}/${payload.sub}/estado`, {
          headers: this.headersInternos(),
        }),
      'No se pudo verificar la cuenta',
    ).catch((error) => {
      if (error instanceof HttpException && error.getStatus() === 404) {
        throw new ForbiddenException('Tu cuenta ya no existe');
      }
      throw error;
    });

    if (estado.rol !== 'SUPERADMIN' || !estado.activo) {
      throw new ForbiddenException(
        'Tu cuenta de administrador está desactivada',
      );
    }
  }

  async listarUsuarios(payload: JwtPayload) {
    await this.asegurarSuperadminActivo(payload);

    const todos = await this.llamarAuth<UsuarioAdministrado[]>(
      () =>
        axios.get(`${this.urlAuth()}/administracion`, {
          headers: this.headersInternos(),
        }),
      'No se pudo obtener la lista de usuarios',
    );
    const usuarios = todos.filter((usuario) => usuario.rol !== 'SUPERADMIN');

    const porRol = Object.fromEntries(ROLES.map((rol) => [rol, 0])) as Record<
      string,
      number
    >;
    let activos = 0;
    for (const usuario of usuarios) {
      porRol[usuario.rol] = (porRol[usuario.rol] ?? 0) + 1;
      if (usuario.activo) activos += 1;
    }

    return {
      usuarios,
      resumen: {
        total: usuarios.length,
        activos,
        inactivos: usuarios.length - activos,
        porRol,
      },
    };
  }

  async crearCoordinador(payload: JwtPayload, dto: CrearCuentaDto) {
    await this.asegurarSuperadminActivo(payload);
    return this.llamarAuth(
      () =>
        axios.post(`${this.urlAuth()}/coordinador`, dto, {
          headers: this.headersInternos(),
        }),
      'Error al crear el coordinador',
    );
  }

  async crearDocente(payload: JwtPayload, dto: CrearDocenteDto) {
    await this.asegurarSuperadminActivo(payload);
    return this.llamarAuth(
      () =>
        axios.post(`${this.urlAuth()}/docente`, dto, {
          headers: this.headersInternos(),
        }),
      'Error al crear el docente',
    );
  }

  async crearEstudiante(payload: JwtPayload, dto: CrearEstudianteDto) {
    await this.asegurarSuperadminActivo(payload);
    // El rol lo fija el servidor segun la ruta, nunca el body.
    return this.llamarAuth(
      () =>
        axios.post(
          `${this.urlAuth()}/registro`,
          { ...dto, rol: 'ESTUDIANTE' },
          { headers: this.headersInternos() },
        ),
      'Error al crear el estudiante',
    );
  }

  async crearEmpresa(payload: JwtPayload, dto: CrearEmpresaDto) {
    await this.asegurarSuperadminActivo(payload);
    return this.llamarAuth(
      () =>
        axios.post(
          `${this.urlAuth()}/registro`,
          { ...dto, rol: 'EMPRESA' },
          { headers: this.headersInternos() },
        ),
      'Error al crear la empresa',
    );
  }

  // Perfil de la cuenta segun su rol (estudiante, docente o empresa). El
  // coordinador no tiene perfil y devuelve null.
  async obtenerPerfil(payload: JwtPayload, id: string) {
    await this.asegurarSuperadminActivo(payload);
    const rol = await this.rolDe(id);

    if (!PERFILES[rol]) return { rol, perfil: null };

    const perfil = await this.llamarAuth<Record<string, unknown>>(
      () => axios.get(this.urlPerfil(rol, id), { headers: this.headersInternos() }),
      'No se pudo obtener el perfil',
    );

    const campos = Object.fromEntries(
      PERFILES[rol].campos.map((campo) => [campo, perfil?.[campo] ?? null]),
    );
    return { rol, perfil: campos };
  }

  async actualizarCuenta(payload: JwtPayload, id: string, dto: ActualizarCuentaDto) {
    await this.asegurarSuperadminActivo(payload);
    if (id === payload.sub) {
      throw new BadRequestException('Tus datos se editan desde tu propio perfil');
    }
    await this.rolDe(id);

    return this.llamarAuth(
      () =>
        axios.patch(`${this.urlAuth()}/${id}`, dto, {
          headers: this.headersInternos(),
        }),
      'Error al actualizar la cuenta',
    );
  }

  async actualizarPerfil(payload: JwtPayload, id: string, dto: ActualizarPerfilDto) {
    await this.asegurarSuperadminActivo(payload);
    const rol = await this.rolDe(id);
    const destino = PERFILES[rol];

    if (!destino) {
      throw new BadRequestException(
        'Esta cuenta no tiene datos de perfil; solo se editan nombre y correo',
      );
    }

    const enviados = Object.keys(dto).filter(
      (campo) => dto[campo as keyof ActualizarPerfilDto] !== undefined,
    ) as (keyof ActualizarPerfilDto)[];
    const ajenos = enviados.filter((campo) => !destino.campos.includes(campo));
    if (ajenos.length > 0) {
      throw new BadRequestException(
        `Campos que no aplican a esta cuenta: ${ajenos.join(', ')}`,
      );
    }
    if (enviados.length === 0) {
      throw new BadRequestException('No hay datos para actualizar');
    }

    // Para estudiantes el programa es una lista cerrada; para docentes es
    // texto libre.
    if (
      rol === 'ESTUDIANTE' &&
      dto.programa !== undefined &&
      !(PROGRAMAS as readonly string[]).includes(dto.programa)
    ) {
      throw new BadRequestException('Selecciona un programa válido');
    }

    const cuerpo = Object.fromEntries(enviados.map((campo) => [campo, dto[campo]]));
    return this.llamarAuth(
      () => axios.patch(this.urlPerfil(rol, id), cuerpo, { headers: this.headersInternos() }),
      'Error al actualizar el perfil',
    );
  }

  async restablecerPassword(payload: JwtPayload, id: string, password: string) {
    await this.asegurarSuperadminActivo(payload);

    // Su propia contrasena la cambia desde "Cambiar contraseña" (pide la
    // actual); auth-service tambien lo rechaza.
    if (id === payload.sub) {
      throw new BadRequestException(
        'Tu propia contraseña se cambia desde "Cambiar contraseña"',
      );
    }

    return this.llamarAuth(
      () =>
        axios.patch(
          `${this.urlAuth()}/${id}/password`,
          { password },
          { headers: this.headersInternos() },
        ),
      'Error al cambiar la contraseña',
    );
  }

  async cambiarEstado(payload: JwtPayload, id: string, activo: boolean) {
    await this.asegurarSuperadminActivo(payload);

    // Evita que el administrador se bloquee a si mismo por accidente.
    if (id === payload.sub && !activo) {
      throw new BadRequestException('No puedes desactivar tu propia cuenta');
    }

    return this.llamarAuth(
      () =>
        axios.patch(
          `${this.urlAuth()}/${id}/estado`,
          { activo },
          { headers: this.headersInternos() },
        ),
      'Error al cambiar el estado de la cuenta',
    );
  }
}
