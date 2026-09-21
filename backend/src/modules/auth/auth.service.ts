import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
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

    const usuario = await this.prisma.$transaction(async (tx) => {
      const nuevoUsuario = await tx.usuario.create({
        data: {
          email: dto.email,
          password: passwordHasheada,
          nombre: dto.nombre,
          rol: dto.rol,
        },
      });

      // El esquema modela cada rol con una tabla propia (Estudiante, Empresa,
      // Docente, Coordinador). Por ahora solo Empresa se crea aqui, porque es
      // el perfil que necesita el modulo de ofertas (Oferta.empresaId).
      if (dto.rol === 'EMPRESA') {
        await tx.empresa.create({
          data: {
            usuarioId: nuevoUsuario.id,
            nombreEmpresa: dto.nombreEmpresa!,
            nit: dto.nit!,
            sector: dto.sector!,
          },
        });
      }

      if (dto.rol === 'ESTUDIANTE') {
        await tx.estudiante.create({
          data: {
            usuarioId: nuevoUsuario.id,
            codigo: dto.codigo!,
            programa: dto.programa!,
            semestre: dto.semestre ?? null,
          },
        });
      }

      return nuevoUsuario;
    });

    const { password: _password, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare(dto.password, usuario.password);

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    const token = await this.jwtService.signAsync(payload);

    const { password: _password, ...usuarioSinPassword } = usuario;
    return { usuario: usuarioSinPassword, token };
  }

  // Actualiza los datos comunes del Usuario (nombre, correo, contraseña).
  // Los datos propios de cada rol (Empresa/Estudiante) se actualizan en sus
  // propios modulos (PATCH /empresas/perfil, PATCH /estudiantes/perfil).
  async actualizarPerfil(payload: JwtPayload, dto: ActualizarPerfilDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const cambiaCredenciales = dto.email !== undefined || dto.password !== undefined;

    if (cambiaCredenciales) {
      if (!dto.passwordActual) {
        throw new BadRequestException(
          'Debes confirmar tu contraseña actual para cambiar el correo o la contraseña',
        );
      }

      const passwordValida = await bcrypt.compare(dto.passwordActual, usuario.password);
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

    const actualizado = await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        ...(dto.nombre !== undefined && { nombre: dto.nombre }),
        ...(dto.email !== undefined && { email: dto.email }),
        ...(dto.password !== undefined && {
          password: await bcrypt.hash(dto.password, 10),
        }),
      },
    });

    const { password, ...usuarioSinPassword } = actualizado;
    return usuarioSinPassword;
  }
}
