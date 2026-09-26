// src/modules/diplomado/diplomado.service.ts
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CrearDiplomadoDto } from './dto/crear-diplomado.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

@Injectable()
export class DiplomadoService {
  constructor(private readonly prisma: PrismaService) {}

  private asegurarRolCoordinador(payload: JwtPayload) {
    if (payload.rol !== 'COORDINADOR') {
      throw new ForbiddenException(
        'Solo el coordinador puede gestionar diplomados',
      );
    }
  }

  private asegurarRolEstudiante(payload: JwtPayload) {
    if (payload.rol !== 'ESTUDIANTE') {
      throw new ForbiddenException(
        'Solo las cuentas de estudiante pueden inscribirse',
      );
    }
  }

  async crear(payload: JwtPayload, dto: CrearDiplomadoDto) {
    this.asegurarRolCoordinador(payload);

    return this.prisma.diplomado.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        duracionHoras: dto.duracionHoras,
        fechaInicio: new Date(dto.fechaInicio),
        cuposTotales: dto.cuposTotales,
        cuposDisponibles: dto.cuposTotales,
        creadoPorId: payload.sub,
      },
    });
  }

  async listar() {
    return this.prisma.diplomado.findMany({
      where: { estado: 'ACTIVO' },
      orderBy: { fechaInicio: 'asc' },
    });
  }

  async obtenerPorId(id: string) {
    const diplomado = await this.prisma.diplomado.findUnique({ where: { id } });
    if (!diplomado) {
      throw new NotFoundException('Diplomado no encontrado');
    }
    return diplomado;
  }

  async inscribirse(payload: JwtPayload, diplomadoId: string) {
    this.asegurarRolEstudiante(payload);

    return this.prisma.$transaction(async (tx) => {
      const actualizado = await tx.diplomado.updateMany({
        where: {
          id: diplomadoId,
          estado: 'ACTIVO',
          cuposDisponibles: { gt: 0 },
        },
        data: { cuposDisponibles: { decrement: 1 } },
      });

      if (actualizado.count === 0) {
        const existe = await tx.diplomado.findUnique({
          where: { id: diplomadoId },
        });
        if (!existe) {
          throw new NotFoundException('Diplomado no encontrado');
        }
        throw new ConflictException(
          'No hay cupos disponibles para este diplomado',
        );
      }

      try {
        return await tx.inscripcion.create({
          data: { diplomadoId, estudianteId: payload.sub },
        });
      } catch (error: any) {
        if (error?.code === 'P2002') {
          throw new ConflictException('Ya estas inscrito en este diplomado');
        }
        throw error;
      }
    });
  }

  async cancelarInscripcion(payload: JwtPayload, diplomadoId: string) {
    this.asegurarRolEstudiante(payload);

    return this.prisma.$transaction(async (tx) => {
      const inscripcion = await tx.inscripcion.findUnique({
        where: {
          diplomadoId_estudianteId: {
            diplomadoId,
            estudianteId: payload.sub,
          },
        },
      });

      if (!inscripcion || inscripcion.estado === 'CANCELADO') {
        throw new NotFoundException(
          'No tienes una inscripcion activa en este diplomado',
        );
      }

      await tx.inscripcion.update({
        where: { id: inscripcion.id },
        data: { estado: 'CANCELADO' },
      });

      await tx.diplomado.update({
        where: { id: diplomadoId },
        data: { cuposDisponibles: { increment: 1 } },
      });

      return { cancelado: true };
    });
  }
}
