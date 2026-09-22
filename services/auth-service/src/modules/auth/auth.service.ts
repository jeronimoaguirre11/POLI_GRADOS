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
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private headersInternos() {
    return { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' };
  }

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
        throw new ConflictException(
          'Ya existe un perfil con ese codigo o NIT',
        );
      }
      throw new BadRequestException(
        'No se pudo crear el perfil del usuario, intenta de nuevo',
      );
    }

    const { password, ...usuarioSinPassword } = usuario;
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

    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    const token = await this.jwtService.signAsync(payload);

    const { password: _, ...usuarioSinPassword } = usuario;
    return { usuario: usuarioSinPassword, token };
  }

  async actualizarPerfil(payload: JwtPayload, dto: ActualizarPerfilDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
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
