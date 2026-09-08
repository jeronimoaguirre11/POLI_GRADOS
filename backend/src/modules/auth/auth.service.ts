import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

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

    if (dto.rol === 'EMPRESA' && (!dto.nombreEmpresa || !dto.nit || !dto.sector)) {
      throw new BadRequestException(
        'Para registrar una cuenta de empresa se requiere nombreEmpresa, nit y sector',
      );
    }

    if (
      dto.rol === 'ESTUDIANTE' &&
      (!dto.codigo || !dto.programa)
    ) {
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

    const { password, ...usuarioSinPassword } = usuario;
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

    const { password: _, ...usuarioSinPassword } = usuario;
    return { usuario: usuarioSinPassword, token };
  }
}
