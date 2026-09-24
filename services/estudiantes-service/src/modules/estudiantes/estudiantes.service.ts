import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ActualizarPerfilEstudianteDto } from './dto/actualizar-perfil-estudiante.dto.js';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

@Injectable()
export class EstudiantesService {
  constructor(private readonly prisma: PrismaService) {}

  private asegurarRolEstudiante(payload: JwtPayload) {
    if (payload.rol !== 'ESTUDIANTE') {
      throw new ForbiddenException(
        'Solo las cuentas de estudiante pueden usar este recurso',
      );
    }
  }

  private async obtenerEstudianteDelUsuario(usuarioId: string) {
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { usuarioId },
    });

    if (!estudiante) {
      throw new NotFoundException(
        'Este usuario no tiene un perfil de estudiante asociado',
      );
    }

    return estudiante;
  }

  async obtenerPerfil(payload: JwtPayload) {
    this.asegurarRolEstudiante(payload);
    const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);

    return {
      codigo: estudiante.codigo,
      programa: estudiante.programa,
      semestre: estudiante.semestre,
    };
  }

  async actualizarPerfil(
    payload: JwtPayload,
    dto: ActualizarPerfilEstudianteDto,
  ) {
    this.asegurarRolEstudiante(payload);
    const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);

    return this.prisma.estudiante.update({
      where: { id: estudiante.id },
      data: {
        ...(dto.programa !== undefined && { programa: dto.programa }),
        ...(dto.semestre !== undefined && { semestre: dto.semestre }),
      },
    });
  }

  // --- Llamado solo por auth-service (ruta interna) ---
  async crearPerfil(dto: CrearEstudianteDto) {
    const codigoExistente = await this.prisma.estudiante.findUnique({
      where: { codigo: dto.codigo },
    });
    if (codigoExistente) {
      throw new ConflictException('Ya existe un estudiante con ese codigo');
    }

    return this.prisma.estudiante.create({
      data: {
        usuarioId: dto.usuarioId,
        codigo: dto.codigo,
        programa: dto.programa,
        semestre: dto.semestre ?? null,
      },
    });
  }

  // --- Llamado solo por coordinadores-service (ruta interna) ---
  async listarTodos() {
    return this.prisma.estudiante.findMany({
      select: {
        id: true,
        usuarioId: true,
        codigo: true,
        programa: true,
        semestre: true,
      },
      orderBy: { codigo: 'asc' },
    });
  }

  // --- Llamado solo por empresas-service (ruta interna, listarPostulantes) ---
  async obtenerPorLote(ids: string[]) {
    if (ids.length === 0) return [];

    return this.prisma.estudiante.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        usuarioId: true,
        codigo: true,
        programa: true,
        semestre: true,
      },
    });
  }

  // --- Llamado solo por postulaciones-service (ruta interna, postularse) ---
  async obtenerPorUsuario(usuarioId: string) {
    return this.prisma.estudiante.findUnique({
      where: { usuarioId },
      select: {
        id: true,
        usuarioId: true,
        codigo: true,
        programa: true,
        semestre: true,
      },
    });
  }
}
