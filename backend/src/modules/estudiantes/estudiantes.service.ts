import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ActualizarPerfilEstudianteDto } from './dto/actualizar-perfil-estudiante.dto.js';
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

  async actualizarPerfil(payload: JwtPayload, dto: ActualizarPerfilEstudianteDto) {
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
}
