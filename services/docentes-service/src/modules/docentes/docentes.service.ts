import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDocenteDto } from './dto/create-docente.dto.js';
import { UpdateDocenteDto } from './dto/update-docente.dto.js';

@Injectable()
export class DocentesService {
  constructor(private readonly prisma: PrismaService) {}

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
}