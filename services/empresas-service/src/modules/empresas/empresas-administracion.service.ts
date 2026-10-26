import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ActualizarEmpresaAdminDto } from './dto/actualizar-empresa-admin.dto.js';

const SELECCION = {
  usuarioId: true,
  nombreEmpresa: true,
  nit: true,
  sector: true,
} as const;

// Operaciones que usa el super administrador (via administracion-service,
// por rutas internas) sobre el perfil de una empresa.
@Injectable()
export class EmpresasAdministracionService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerPorUsuario(usuarioId: string) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { usuarioId },
      select: SELECCION,
    });
    if (!empresa) {
      throw new NotFoundException(
        'Este usuario no tiene un perfil de empresa asociado',
      );
    }
    return empresa;
  }

  async actualizarPorUsuario(usuarioId: string, dto: ActualizarEmpresaAdminDto) {
    const empresa = await this.obtenerPorUsuario(usuarioId);

    if (dto.nit !== undefined && dto.nit !== empresa.nit) {
      const otra = await this.prisma.empresa.findUnique({
        where: { nit: dto.nit },
      });
      if (otra) {
        throw new ConflictException('Ya existe una empresa con ese NIT');
      }
    }

    return this.prisma.empresa.update({
      where: { usuarioId },
      data: {
        ...(dto.nombreEmpresa !== undefined && {
          nombreEmpresa: dto.nombreEmpresa,
        }),
        ...(dto.nit !== undefined && { nit: dto.nit }),
        ...(dto.sector !== undefined && { sector: dto.sector }),
      },
      select: SELECCION,
    });
  }
}
