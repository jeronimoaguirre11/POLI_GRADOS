import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDocenteDto } from './dto/create-docente.dto.js';
import { UpdateDocenteDto } from './dto/update-docente.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

@Injectable()
export class DocentesService {
  constructor(private readonly prisma: PrismaService) {}

  private asegurarRolDocente(payload: JwtPayload) {
    if (payload.rol !== 'DOCENTE') {
      throw new ForbiddenException(
        'Solo las cuentas de docente pueden usar este recurso',
      );
    }
  }

  private urlEstudiantes() {
    const valor = process.env.ESTUDIANTES_SERVICE_URL;

    if (!valor) {
      throw new InternalServerErrorException(
        'ESTUDIANTES_SERVICE_URL no esta configurada',
      );
    }

    return valor.replace(/\/$/, '');
  }

  private headersInternos() {
    return {
      'x-internal-key': process.env.INTERNAL_API_KEY ?? '',
    };
  }

  async crear(dto: CreateDocenteDto) {
    const existente = await this.prisma.docente.findFirst({
      where: {
        OR: [
          { usuarioId: dto.usuarioId },
          { identificacion: dto.identificacion },
        ],
      },
    });

    if (existente) {
      throw new ConflictException(
        'Ya existe un docente asociado a este usuario o identificación',
      );
    }

    return this.prisma.docente.create({
      data: dto,
    });
  }

  async listar() {
    return this.prisma.docente.findMany({
      orderBy: {
        identificacion: 'asc',
      },
    });
  }

  async obtenerPorId(id: string) {
    const docente = await this.prisma.docente.findUnique({
      where: { id },
    });

    if (!docente) {
      throw new NotFoundException('Docente no encontrado');
    }

    return docente;
  }

  async obtenerPorUsuarioId(usuarioId: string) {
    const docente = await this.prisma.docente.findUnique({
      where: { usuarioId },
    });

    if (!docente) {
      throw new NotFoundException('Docente no encontrado');
    }

    return docente;
  }

  async actualizar(id: string, dto: UpdateDocenteDto) {
    await this.obtenerPorId(id);

    return this.prisma.docente.update({
      where: { id },
      data: dto,
    });
  }

  async asignarEstudiante(docenteId: string, estudianteId: string) {
    const docente = await this.prisma.docente.findUnique({
      where: { id: docenteId },
    });

    if (!docente) {
      throw new NotFoundException('Docente no encontrado');
    }

    const asignacionExistente =
      await this.prisma.asignacionDocente.findUnique({
        where: { estudianteId },
      });

    if (asignacionExistente) {
      throw new ConflictException(
        'El estudiante ya tiene un docente asignado',
      );
    }

    return this.prisma.asignacionDocente.create({
      data: {
        docenteId,
        estudianteId,
      },
    });
  }

  async listarAsignaciones() {
    return this.prisma.asignacionDocente.findMany({
      include: {
        docente: true,
      },
      orderBy: {
        fechaAsignacion: 'desc',
      },
    });
  }

  async listarEstudiantesAsignados(docenteId: string) {
    await this.obtenerPorId(docenteId);

    return this.prisma.asignacionDocente.findMany({
      where: {
        docenteId,
      },
      orderBy: {
        fechaAsignacion: 'desc',
      },
    });
  }

  async obtenerMiPerfil(payload: JwtPayload) {
    this.asegurarRolDocente(payload);

    const docente = await this.obtenerPorUsuarioId(payload.sub);

    return {
      id: docente.id,
      identificacion: docente.identificacion,
      programa: docente.programa,
      especialidad: docente.especialidad,
    };
  }

  async obtenerMisEstudiantes(payload: JwtPayload) {
    this.asegurarRolDocente(payload);

    const docente = await this.obtenerPorUsuarioId(payload.sub);

    const asignaciones = await this.prisma.asignacionDocente.findMany({
      where: {
        docenteId: docente.id,
      },
      orderBy: {
        fechaAsignacion: 'desc',
      },
    });

    if (asignaciones.length === 0) {
      return [];
    }

    const ids = asignaciones.map(
      (asignacion) => asignacion.estudianteId,
    );

    try {
      const respuesta = await axios.get(
        `${this.urlEstudiantes()}/internal/estudiantes/lote`,
        {
          params: {
            ids: ids.join(','),
          },
          headers: this.headersInternos(),
        },
      );

      return respuesta.data;
    } catch {
      throw new InternalServerErrorException(
        'No fue posible consultar los estudiantes asignados',
      );
    }
  }
}