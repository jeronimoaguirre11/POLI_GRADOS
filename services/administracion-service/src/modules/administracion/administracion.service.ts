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

// Roles que se administran desde el panel. El super administrador es unico y
// no se lista: no se puede crear otro ni desactivarlo.
export const ROLES = [
  'COORDINADOR',
  'DOCENTE',
  'ESTUDIANTE',
  'EMPRESA',
] as const;

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
