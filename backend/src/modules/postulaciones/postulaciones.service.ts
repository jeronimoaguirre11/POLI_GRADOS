import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

const TIPOS_HOJA_VIDA_PERMITIDOS: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
};

const TAMANO_MAXIMO_HOJA_VIDA = 5 * 1024 * 1024; // 5MB

@Injectable()
export class PostulacionesService {
  private readonly directorioHojasVida = join(
    process.cwd(),
    'uploads',
    'hojas-vida',
  );

  constructor(private readonly prisma: PrismaService) {}

  private asegurarRolEstudiante(payload: JwtPayload) {
    if (payload.rol !== 'ESTUDIANTE') {
      throw new ForbiddenException(
        'Solo las cuentas de estudiante pueden postularse',
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

  // La hoja de vida es obligatoria: sin ella no se puede crear la postulacion.
  private async guardarHojaVida(archivo: any): Promise<string> {
    if (!archivo) {
      throw new BadRequestException(
        'Debes adjuntar tu hoja de vida para postularte',
      );
    }

    const extension = TIPOS_HOJA_VIDA_PERMITIDOS[archivo.mimetype];
    if (!extension) {
      throw new BadRequestException(
        'La hoja de vida debe ser un archivo PDF o Word (doc/docx)',
      );
    }
    if (archivo.size > TAMANO_MAXIMO_HOJA_VIDA) {
      throw new BadRequestException(
        'La hoja de vida no puede pesar mas de 5MB',
      );
    }

    await fs.mkdir(this.directorioHojasVida, { recursive: true });
    const nombreArchivo = `${randomUUID()}.${extension}`;
    await fs.writeFile(
      join(this.directorioHojasVida, nombreArchivo),
      archivo.buffer,
    );

    return `/uploads/hojas-vida/${nombreArchivo}`;
  }

  async postularse(payload: JwtPayload, ofertaId: string, hojaVida: any) {
    this.asegurarRolEstudiante(payload);
    const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);

    const oferta = await this.prisma.oferta.findUnique({
      where: { id: ofertaId },
    });

    if (!oferta) {
      throw new NotFoundException('Convocatoria no encontrada');
    }

    if (oferta.estado !== 'ABIERTA') {
      throw new ConflictException('Esta convocatoria ya no esta abierta');
    }

    const hojaVidaUrl = await this.guardarHojaVida(hojaVida);

    try {
      return await this.prisma.postulacion.create({
        data: {
          ofertaId,
          estudianteId: estudiante.id,
          hojaVidaUrl,
        },
      });
    } catch (error: any) {
      // Si la insercion falla, evita dejar hojas de vida huerfanas en disco.
      await fs.unlink(join(process.cwd(), hojaVidaUrl)).catch(() => {});

      // Violacion de la restriccion unica (ofertaId, estudianteId).
      if (error?.code === 'P2002') {
        throw new ConflictException('Ya te postulaste a esta convocatoria');
      }
      throw error;
    }
  }

  async listarMias(payload: JwtPayload) {
    this.asegurarRolEstudiante(payload);
    const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);

    return this.prisma.postulacion.findMany({
      where: { estudianteId: estudiante.id },
      orderBy: { fecha: 'desc' },
      select: {
        id: true,
        ofertaId: true,
        estado: true,
        fecha: true,
        updatedAt: true,
        oferta: {
          select: {
            titulo: true,
            perfilBuscado: true,
            modalidadContratacion: true,
            ubicacion: true,
            empresa: { select: { nombreEmpresa: true, sector: true } },
          },
        },
      },
    });
  }

  async cancelarPostulacion(payload: JwtPayload, postulacionId: string) {
    this.asegurarRolEstudiante(payload);
    const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);

    const postulacion = await this.prisma.postulacion.findUnique({
      where: { id: postulacionId },
    });

    if (!postulacion || postulacion.estudianteId !== estudiante.id) {
      throw new NotFoundException('Postulacion no encontrada');
    }

    if (postulacion.estado === 'SELECCIONADO') {
      throw new ConflictException(
        'No puedes cancelar una postulacion despues de ser seleccionado',
      );
    }

    await this.prisma.postulacion.delete({ where: { id: postulacionId } });

    // Best-effort: si falla borrar el archivo del disco no es motivo para
    // fallar la operacion, la postulacion ya fue eliminada de la BD.
    fs.unlink(join(process.cwd(), postulacion.hojaVidaUrl)).catch(() => {});

    return { eliminado: true };
  }
}
