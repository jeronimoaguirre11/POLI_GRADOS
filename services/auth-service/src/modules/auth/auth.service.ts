import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto.js';
import { CrearCoordinadorDto } from './dto/crear-coordinador.dto.js';
import { CrearDocenteDto } from './dto/crear-docente.dto.js';
import { CrearSuperadminDto } from './dto/crear-superadmin.dto.js';
import { PASSWORD_REGEX } from './dto/password.validation.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

type RolUsuario = 'ESTUDIANTE' | 'EMPRESA' | 'COORDINADOR' | 'DOCENTE' | 'SUPERADMIN';

// Datos que se pueden mostrar de un usuario: nunca incluye el password.
const SELECCION_PUBLICA = {
  id: true,
  nombre: true,
  email: true,
  rol: true,
  activo: true,
  createdAt: true,
} as const;

export const MENSAJE_CUENTA_DESACTIVADA =
  'Tu cuenta está desactivada. Comunícate con el administrador de la plataforma.';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private headersInternos() {
    return { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' };
  }

  // Registro publico: solo devuelve un mensaje (no expone datos del usuario).
  async register(dto: RegisterDto) {
    await this.crearCuentaConPerfil(dto);
    return { message: 'Usuario registrado exitosamente' };
  }

  // Lo usa el super administrador (via administracion-service) para crear
  // estudiantes y empresas con su perfil completo. Devuelve el usuario creado.
  async registrarDesdeAdministracion(dto: RegisterDto) {
    return this.crearCuentaConPerfil(dto);
  }

  private async crearCuentaConPerfil(dto: RegisterDto) {
    const existente = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (existente) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    if (
      dto.rol === 'EMPRESA' &&
      (!dto.nombreEmpresa || !dto.nit || !dto.sector)
    ) {
      throw new BadRequestException(
        'Para registrar una cuenta de empresa se requiere nombreEmpresa, nit y sector',
      );
    }

    if (dto.rol === 'ESTUDIANTE' && (!dto.codigo || !dto.programa)) {
      throw new BadRequestException(
        'Para registrar una cuenta de estudiante se requiere codigo y programa',
      );
    }

    const passwordHasheada = await bcrypt.hash(dto.password, 10);

    // Antes esto y la creacion de Empresa/Estudiante iban en un solo
    // prisma.$transaction. Ahora Empresa/Estudiante viven en otra base de
    // datos (otro microservicio), asi que ya no se puede hacer atomico con
    // una transaccion de Prisma: se crea el Usuario aqui y se avisa al otro
    // servicio por HTTP. Si esa llamada falla, se deshace el Usuario
    // (compensacion simple).
    const usuario = await this.prisma.usuario.create({
      data: {
        email: dto.email,
        password: passwordHasheada,
        nombre: dto.nombre,
        rol: dto.rol,
      },
    });

    try {
      if (dto.rol === 'EMPRESA') {
        await axios.post(
          `${process.env.EMPRESAS_SERVICE_URL}/internal/empresas`,
          {
            usuarioId: usuario.id,
            nombreEmpresa: dto.nombreEmpresa,
            nit: dto.nit,
            sector: dto.sector,
          },
          { headers: this.headersInternos() },
        );
      }

      if (dto.rol === 'ESTUDIANTE') {
        await axios.post(
          `${process.env.ESTUDIANTES_SERVICE_URL}/internal/estudiantes`,
          {
            usuarioId: usuario.id,
            codigo: dto.codigo,
            programa: dto.programa,
            semestre: dto.semestre ?? null,
          },
          { headers: this.headersInternos() },
        );
      }
    } catch (error: any) {
      await this.prisma.usuario.delete({ where: { id: usuario.id } });

      if (error?.response?.status === 409) {
        throw new ConflictException('Ya existe un perfil con ese codigo o NIT');
      }
      throw new BadRequestException(
        'No se pudo crear el perfil del usuario, intenta de nuevo',
      );
    }

    const { password: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const passwordValida = await bcrypt.compare(dto.password, usuario.password);

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    // Se revisa despues de validar la contraseña para no revelar a un
    // tercero si un correo existe o si su cuenta esta desactivada.
    if (!usuario.activo) {
      throw new UnauthorizedException(MENSAJE_CUENTA_DESACTIVADA);
    }

    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async obtenerPerfil(payload: JwtPayload) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      select: { nombre: true, email: true, rol: true, activo: true },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Todas las apps llaman a /auth/me al cargar: asi, una cuenta que el
    // administrador desactiva queda fuera en cuanto recarga cualquier pagina.
    if (!usuario.activo) {
      throw new UnauthorizedException(MENSAJE_CUENTA_DESACTIVADA);
    }

    const { activo: _, ...perfil } = usuario;
    return perfil;
  }

  // Los coordinadores no se pueden crear desde /auth/register. Este metodo
  // solo se expone por la ruta interna protegida con x-internal-key y fija el
  // rol en servidor, por lo que el cliente no puede elevar sus privilegios.
  async crearCoordinador(dto: CrearCoordinadorDto) {
    return this.crearCuentaSinPerfil(dto, 'COORDINADOR');
  }

  // Igual que el coordinador: solo por ruta interna y con el rol fijado aqui.
  async crearSuperadmin(dto: CrearSuperadminDto) {
    return this.crearCuentaSinPerfil(dto, 'SUPERADMIN');
  }

  private async crearCuentaSinPerfil(
    dto: CrearCoordinadorDto,
    rol: 'COORDINADOR' | 'SUPERADMIN',
  ) {
    const existente = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (existente) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    try {
      const usuario = await this.prisma.usuario.create({
        data: {
          nombre: dto.nombre,
          email: dto.email,
          password: await bcrypt.hash(dto.password, 10),
          rol,
        },
      });

      const { password: _, ...usuarioSinPassword } = usuario;
      return usuarioSinPassword;
    } catch (error: any) {
      // La verificacion anterior mejora el mensaje habitual, y capturar P2002
      // tambien cubre dos solicitudes concurrentes con el mismo correo.
      if (error?.code === 'P2002') {
        throw new ConflictException('Ya existe un usuario con ese email');
      }
      throw error;
    }
  }

  async crearDocente(dto: CrearDocenteDto) {
    const existente = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (existente) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
        rol: 'DOCENTE',
      },
    });

    try {
      await axios.post(
        `${process.env.DOCENTES_SERVICE_URL}/internal/docentes`,
        {
          usuarioId: usuario.id,
          identificacion: dto.identificacion,
          programa: dto.programa,
          especialidad: dto.especialidad,
        },
        {
          headers: this.headersInternos(),
        },
      );
    } catch (error: any) {
      await this.prisma.usuario.delete({
        where: { id: usuario.id },
      });

      if (error?.response?.status === 409) {
        throw new ConflictException(
          'Ya existe un docente con esa identificación',
        );
      }

      throw new BadRequestException(
        'No se pudo crear el perfil del docente, intenta de nuevo',
      );
    }

    const { password: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }

  // ---------- Administracion de cuentas (solo rutas internas) ----------

  async listarParaAdministracion() {
    return this.prisma.usuario.findMany({
      select: SELECCION_PUBLICA,
      orderBy: [{ createdAt: 'desc' }, { email: 'asc' }],
    });
  }

  async obtenerEstadoCuenta(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, rol: true, activo: true },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async cambiarEstadoCuenta(id: string, activo: boolean) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Nunca puede quedar el sistema sin un super administrador activo.
    if (!activo && usuario.rol === 'SUPERADMIN' && usuario.activo) {
      const superadminsActivos = await this.prisma.usuario.count({
        where: { rol: 'SUPERADMIN', activo: true },
      });
      if (superadminsActivos <= 1) {
        throw new ConflictException(
          'No se puede desactivar al único super administrador activo',
        );
      }
    }

    return this.prisma.usuario.update({
      where: { id },
      data: { activo },
      select: SELECCION_PUBLICA,
    });
  }

  // Crea el primer super administrador al arrancar el servicio, con los datos
  // de SUPERADMIN_NOMBRE, SUPERADMIN_EMAIL y SUPERADMIN_PASSWORD. Si ya existe
  // algun super administrador no hace nada, asi que es seguro en cada arranque.
  async asegurarSuperadminInicial(
    entorno: Record<string, string | undefined> = process.env,
  ): Promise<{ creado: boolean; motivo: string }> {
    const email = entorno.SUPERADMIN_EMAIL?.trim();
    const password = entorno.SUPERADMIN_PASSWORD;
    const nombre = entorno.SUPERADMIN_NOMBRE?.trim() || 'Super administrador';

    if (!email || !password) {
      return { creado: false, motivo: 'sin-configuracion' };
    }

    const yaHaySuperadmin = await this.prisma.usuario.count({
      where: { rol: 'SUPERADMIN' },
    });
    if (yaHaySuperadmin > 0) {
      return { creado: false, motivo: 'ya-existe' };
    }

    if (
      password.length < 8 ||
      password.length > 15 ||
      !PASSWORD_REGEX.test(password)
    ) {
      return { creado: false, motivo: 'password-invalido' };
    }

    const existente = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (existente) {
      return { creado: false, motivo: 'email-en-uso' };
    }

    await this.prisma.usuario.create({
      data: {
        nombre,
        email,
        password: await bcrypt.hash(password, 10),
        rol: 'SUPERADMIN' satisfies RolUsuario,
      },
    });
    return { creado: true, motivo: 'creado' };
  }

  async actualizarPerfil(payload: JwtPayload, dto: ActualizarPerfilDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException(MENSAJE_CUENTA_DESACTIVADA);
    }

    const cambiaCredenciales =
      dto.email !== undefined || dto.password !== undefined;

    if (cambiaCredenciales) {
      if (!dto.passwordActual) {
        throw new BadRequestException(
          'Debes confirmar tu contraseña actual para cambiar el correo o la contraseña',
        );
      }

      const passwordValida = await bcrypt.compare(
        dto.passwordActual,
        usuario.password,
      );
      if (!passwordValida) {
        throw new UnauthorizedException('La contraseña actual no es correcta');
      }
    }

    if (dto.email && dto.email !== usuario.email) {
      const existente = await this.prisma.usuario.findUnique({
        where: { email: dto.email },
      });
      if (existente) {
        throw new ConflictException('Ya existe un usuario con ese correo');
      }
    }

    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        ...(dto.nombre !== undefined && { nombre: dto.nombre }),
        ...(dto.email !== undefined && { email: dto.email }),
        ...(dto.password !== undefined && {
          password: await bcrypt.hash(dto.password, 10),
        }),
      },
    });

    return { message: 'Perfil actualizado correctamente' };
  }
}
