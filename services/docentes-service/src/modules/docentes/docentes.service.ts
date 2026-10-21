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

export interface EstudianteInterno {
  id: string;
  usuarioId: string;
  codigo: string;
  programa: string;
  semestre: number | null;
}

export interface ResumenModalidad {
  tipo: 'PRACTICAS' | 'DIPLOMADO' | 'INVESTIGACION';
  estado: string;
  titulo: string;
  detalle: string | null;
  fecha: string | Date;
}

interface ResumenPracticas extends ResumenModalidad {
  estudianteId: string;
}

interface ResumenPorUsuario extends ResumenModalidad {
  usuarioId: string;
}

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

  private urlServicio(nombreVariable: string) {
    const valor = process.env[nombreVariable];

    if (!valor) {
      throw new InternalServerErrorException(
        `${nombreVariable} no esta configurada`,
      );
    }

    return valor.replace(/\/$/, '');
  }

  private headersInternos() {
    return {
      'x-internal-key': process.env.INTERNAL_API_KEY ?? '',
    };
  }

  private async consultarResumen<T>(
    nombreVariable: string,
    parametros: Record<string, string>,
  ): Promise<T[]> {
    const respuesta = await axios.get(
      `${this.urlServicio(nombreVariable)}/internal/resumen-docente`,
      {
        params: parametros,
        headers: this.headersInternos(),
        timeout: 5000,
      },
    );

    if (!Array.isArray(respuesta.data)) {
      throw new Error(`Respuesta invalida de ${nombreVariable}`);
    }

    return respuesta.data as T[];
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

    const asignacionExistente = await this.prisma.asignacionDocente.findUnique({
      where: { estudianteId },
    });

    if (asignacionExistente) {
      throw new ConflictException('El estudiante ya tiene un docente asignado');
    }

    return this.prisma.asignacionDocente.create({
      data: {
        docenteId,
        estudianteId,
      },
    });
  }

  async reasignarEstudiante(docenteId: string, estudianteId: string) {
    const docente = await this.prisma.docente.findUnique({
      where: { id: docenteId },
    });

    if (!docente) {
      throw new NotFoundException('Docente no encontrado');
    }

    const asignacion = await this.prisma.asignacionDocente.findUnique({
      where: { estudianteId },
    });

    if (!asignacion) {
      throw new NotFoundException('El estudiante no tiene un docente asignado');
    }

    if (asignacion.docenteId === docenteId) {
      return asignacion;
    }

    return this.prisma.asignacionDocente.update({
      where: { estudianteId },
      data: {
        docenteId,
        fechaAsignacion: new Date(),
      },
    });
  }

  async retirarAsignacion(estudianteId: string) {
    const asignacion = await this.prisma.asignacionDocente.findUnique({
      where: { estudianteId },
    });

    if (!asignacion) {
      throw new NotFoundException('El estudiante no tiene un docente asignado');
    }

    return this.prisma.asignacionDocente.delete({
      where: { estudianteId },
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

    const ids = asignaciones.map((asignacion) => asignacion.estudianteId);

    try {
      const respuesta = await axios.get(
        `${this.urlServicio('ESTUDIANTES_SERVICE_URL')}/internal/estudiantes/lote`,
        {
          params: {
            ids: ids.join(','),
          },
          headers: this.headersInternos(),
          timeout: 5000,
        },
      );

      if (!Array.isArray(respuesta.data)) {
        throw new Error('Respuesta invalida de estudiantes-service');
      }

      const estudiantes = respuesta.data as EstudianteInterno[];
      const idsEstudiantes = estudiantes.map((estudiante) => estudiante.id);
      const idsUsuarios = estudiantes.map((estudiante) => estudiante.usuarioId);

      const resultados = await Promise.allSettled([
        this.consultarResumen<ResumenPracticas>('POSTULACIONES_SERVICE_URL', {
          estudianteIds: idsEstudiantes.join(','),
        }),
        this.consultarResumen<ResumenPorUsuario>('DIPLOMADO_SERVICE_URL', {
          usuarioIds: idsUsuarios.join(','),
        }),
        this.consultarResumen<ResumenPorUsuario>('INVESTIGACION_SERVICE_URL', {
          usuarioIds: idsUsuarios.join(','),
        }),
      ]);

      const nombresServicios: ResumenModalidad['tipo'][] = [
        'PRACTICAS',
        'DIPLOMADO',
        'INVESTIGACION',
      ];
      const serviciosModalidadNoDisponibles = resultados
        .map((resultado, indice) =>
          resultado.status === 'rejected' ? nombresServicios[indice] : null,
        )
        .filter(
          (nombre): nombre is ResumenModalidad['tipo'] => nombre !== null,
        );

      const practicas =
        resultados[0].status === 'fulfilled' ? resultados[0].value : [];
      const diplomados =
        resultados[1].status === 'fulfilled' ? resultados[1].value : [];
      const investigaciones =
        resultados[2].status === 'fulfilled' ? resultados[2].value : [];

      return estudiantes.map((estudiante) => {
        const modalidades: ResumenModalidad[] = [
          ...practicas
            .filter((resumen) => resumen.estudianteId === estudiante.id)
            .map(({ estudianteId: _estudianteId, ...resumen }) => resumen),
          ...diplomados
            .filter((resumen) => resumen.usuarioId === estudiante.usuarioId)
            .map(({ usuarioId: _usuarioId, ...resumen }) => resumen),
          ...investigaciones
            .filter((resumen) => resumen.usuarioId === estudiante.usuarioId)
            .map(({ usuarioId: _usuarioId, ...resumen }) => resumen),
        ].sort((a, b) => {
          const fechaA = new Date(a.fecha).getTime() || 0;
          const fechaB = new Date(b.fecha).getTime() || 0;
          return fechaB - fechaA;
        });

        return {
          ...estudiante,
          modalidades,
          serviciosModalidadNoDisponibles,
        };
      });
    } catch {
      throw new InternalServerErrorException(
        'No fue posible consultar los estudiantes asignados',
      );
    }
  }
}
