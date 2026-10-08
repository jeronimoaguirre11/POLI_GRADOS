// src/modules/diplomado/diplomado.service.ts
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios from 'axios';
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

    const inscripcionActivaExistente = await this.prisma.inscripcion.findFirst({
      where: {
        estudianteId: payload.sub,
        estado: 'INSCRITO',
        diplomadoId: { not: diplomadoId },
      },
    });

    if (inscripcionActivaExistente) {
      throw new ConflictException(
        'Ya estas inscrito en otro diplomado este semestre. Cancela esa inscripcion antes de elegir uno nuevo.',
      );
    }

    if (await this.estaComprometidoEnPracticas(payload.sub)) {
      throw new ConflictException(
        'Ya fuiste seleccionado en Practicas Profesionales este semestre, por lo que no puedes inscribirte a un diplomado.',
      );
    }

    if (await this.estaComprometidoEnInvestigacion(payload.sub)) {
      throw new ConflictException(
        'Ya tienes una investigacion aprobada este semestre, por lo que no puedes inscribirte a un diplomado.',
      );
    }

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
        const existeDiplomado = await tx.diplomado.findUnique({
          where: { id: diplomadoId },
        });
        if (!existeDiplomado) {
          throw new NotFoundException('Diplomado no encontrado');
        }
        throw new ConflictException(
          'No hay cupos disponibles para este diplomado',
        );
      }

      const inscripcionExistente = await tx.inscripcion.findUnique({
        where: {
          diplomadoId_estudianteId: { diplomadoId, estudianteId: payload.sub },
        },
      });

      if (inscripcionExistente) {
        if (inscripcionExistente.estado === 'INSCRITO') {
          throw new ConflictException('Ya estas inscrito en este diplomado');
        }
        // Estaba cancelada: reactivamos la misma fila en vez de crear otra.
        return tx.inscripcion.update({
          where: { id: inscripcionExistente.id },
          data: { estado: 'INSCRITO', fechaInscripcion: new Date() },
        });
      }

      return tx.inscripcion.create({
        data: { diplomadoId, estudianteId: payload.sub },
      });
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

  async obtenerMisInscripciones(payload: JwtPayload) {
    this.asegurarRolEstudiante(payload);

    const inscripciones = await this.prisma.inscripcion.findMany({
      where: { estudianteId: payload.sub, estado: 'INSCRITO' },
      include: { diplomado: true },
      orderBy: { fechaInscripcion: 'desc' },
    });

    return inscripciones.map(({ diplomado, ...inscripcion }) => ({
      id: inscripcion.id,
      diplomadoId: inscripcion.diplomadoId,
      fechaInscripcion: inscripcion.fechaInscripcion,
      diplomado,
    }));
  }

  async obtenerCompromisoInterno(estudianteId: string) {
    const inscripcion = await this.prisma.inscripcion.findFirst({
      where: { estudianteId, estado: 'INSCRITO' },
      select: { diplomadoId: true },
    });

    return {
      comprometido: Boolean(inscripcion),
      diplomadoId: inscripcion?.diplomadoId ?? null,
    };
  }

  async obtenerResumenParaDocente(usuarioIds: string[]) {
    const ids = [...new Set(usuarioIds)].filter(Boolean);
    if (ids.length === 0) return [];

    const inscripciones = await this.prisma.inscripcion.findMany({
      where: {
        estudianteId: { in: ids },
        estado: 'INSCRITO',
      },
      include: { diplomado: true },
      orderBy: { fechaInscripcion: 'desc' },
    });

    return inscripciones.map((inscripcion) => ({
      usuarioId: inscripcion.estudianteId,
      tipo: 'DIPLOMADO',
      estado: inscripcion.estado,
      titulo: inscripcion.diplomado.nombre,
      detalle: `${inscripcion.diplomado.duracionHoras} horas`,
      fecha: inscripcion.fechaInscripcion,
    }));
  }

  private async estaComprometidoEnPracticas(
    usuarioId: string,
  ): Promise<boolean> {
    try {
      const { data } = await axios.get(
        `${process.env.POSTULACIONES_SERVICE_URL}/internal/estudiante/${usuarioId}/comprometido`,
        { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' } },
      );
      return data.comprometido === true;
    } catch {
      throw new ServiceUnavailableException(
        'No se pudo verificar tu estado en Practicas Profesionales. Intenta de nuevo en unos minutos.',
      );
    }
  }

  private async estaComprometidoEnInvestigacion(
    usuarioId: string,
  ): Promise<boolean> {
    try {
      const { data } = await axios.get(
        `${process.env.INVESTIGACION_SERVICE_URL}/internal/estudiante/${usuarioId}/comprometido`,
        { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' } },
      );
      return data.comprometido === true;
    } catch {
      throw new ServiceUnavailableException(
        'No se pudo verificar tu estado en Investigacion. Intenta de nuevo en unos minutos.',
      );
    }
  }
}
