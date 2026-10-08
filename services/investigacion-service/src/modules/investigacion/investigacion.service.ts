import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service.js';
import { CrearInvestigacionDto } from './dto/crear-investigacion.dto.js';
import { EvaluarInvestigacionDto } from './dto/evaluar-investigacion.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

@Injectable()
export class InvestigacionService {
  constructor(private readonly prisma: PrismaService) {}

  private asegurarRolEstudiante(payload: JwtPayload) {
    if (payload.rol !== 'ESTUDIANTE') {
      throw new ForbiddenException(
        'Solo las cuentas de estudiante pueden proponer una investigacion',
      );
    }
  }

  private asegurarRolCoordinador(payload: JwtPayload) {
    if (payload.rol !== 'COORDINADOR') {
      throw new ForbiddenException(
        'Solo el coordinador puede evaluar una investigacion',
      );
    }
  }

  private async estaComprometidoEnDiplomado(
    usuarioId: string,
  ): Promise<boolean> {
    try {
      const { data } = await axios.get(
        `${process.env.DIPLOMADO_SERVICE_URL}/internal/estudiante/${usuarioId}/comprometido`,
        { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' } },
      );
      return data.comprometido === true;
    } catch {
      throw new ServiceUnavailableException(
        'No se pudo verificar el estado del estudiante en Diplomado. Intenta de nuevo en unos minutos.',
      );
    }
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
        'No se pudo verificar el estado del estudiante en Practicas Profesionales. Intenta de nuevo en unos minutos.',
      );
    }
  }

  async crear(payload: JwtPayload, dto: CrearInvestigacionDto) {
    this.asegurarRolEstudiante(payload);

    const propuestaViva = await this.prisma.investigacion.findFirst({
      where: {
        estudianteId: payload.sub,
        estado: { in: ['PENDIENTE', 'APROBADA'] },
      },
    });

    if (propuestaViva) {
      throw new ConflictException(
        'Ya tienes una investigacion pendiente o aprobada este semestre',
      );
    }

    return this.prisma.investigacion.create({
      data: { ...dto, estudianteId: payload.sub },
    });
  }

  async misInvestigaciones(payload: JwtPayload) {
    this.asegurarRolEstudiante(payload);
    return this.prisma.investigacion.findMany({
      where: { estudianteId: payload.sub },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listarPendientes(payload: JwtPayload) {
    this.asegurarRolCoordinador(payload);
    return this.prisma.investigacion.findMany({
      where: { estado: 'PENDIENTE' },
      orderBy: { createdAt: 'asc' },
    });
  }

  async obtenerPorId(id: string) {
    const investigacion = await this.prisma.investigacion.findUnique({
      where: { id },
    });
    if (!investigacion) {
      throw new NotFoundException('Investigacion no encontrada');
    }
    return investigacion;
  }

  async cancelar(payload: JwtPayload, id: string) {
    this.asegurarRolEstudiante(payload);

    const investigacion = await this.prisma.investigacion.findUnique({
      where: { id },
    });

    if (!investigacion || investigacion.estudianteId !== payload.sub) {
      throw new NotFoundException('Investigacion no encontrada');
    }
    if (investigacion.estado !== 'PENDIENTE') {
      throw new ConflictException(
        'Solo puedes cancelar una investigacion mientras este pendiente',
      );
    }

    return this.prisma.investigacion.update({
      where: { id },
      data: { estado: 'CANCELADA' },
    });
  }

  async evaluar(payload: JwtPayload, id: string, dto: EvaluarInvestigacionDto) {
    this.asegurarRolCoordinador(payload);

    const investigacion = await this.prisma.investigacion.findUnique({
      where: { id },
    });
    if (!investigacion) {
      throw new NotFoundException('Investigacion no encontrada');
    }
    if (investigacion.estado !== 'PENDIENTE') {
      throw new ConflictException('Esta investigacion ya fue evaluada');
    }

    if (dto.estado === 'APROBADA') {
      if (await this.estaComprometidoEnDiplomado(investigacion.estudianteId)) {
        throw new ConflictException(
          'Este estudiante ya esta inscrito en un diplomado este semestre, no se puede aprobar la investigacion.',
        );
      }
      if (await this.estaComprometidoEnPracticas(investigacion.estudianteId)) {
        throw new ConflictException(
          'Este estudiante ya fue seleccionado en Practicas Profesionales este semestre, no se puede aprobar la investigacion.',
        );
      }
    }

    return this.prisma.investigacion.update({
      where: { id },
      data: { estado: dto.estado },
    });
  }

  async obtenerCompromisoInterno(usuarioId: string) {
    const investigacion = await this.prisma.investigacion.findFirst({
      where: { estudianteId: usuarioId, estado: 'APROBADA' },
      select: { id: true },
    });

    return {
      comprometido: Boolean(investigacion),
      investigacionId: investigacion?.id ?? null,
    };
  }

  async obtenerResumenParaDocente(usuarioIds: string[]) {
    const ids = [...new Set(usuarioIds)].filter(Boolean);
    if (ids.length === 0) return [];

    const investigaciones = await this.prisma.investigacion.findMany({
      where: {
        estudianteId: { in: ids },
        estado: { in: ['PENDIENTE', 'APROBADA'] },
      },
      orderBy: { updatedAt: 'desc' },
      select: {
        estudianteId: true,
        nombre: true,
        sector: true,
        estado: true,
        updatedAt: true,
      },
    });

    return investigaciones.map((investigacion) => ({
      usuarioId: investigacion.estudianteId,
      tipo: 'INVESTIGACION',
      estado: investigacion.estado,
      titulo: investigacion.nombre,
      detalle: investigacion.sector,
      fecha: investigacion.updatedAt,
    }));
  }
}
