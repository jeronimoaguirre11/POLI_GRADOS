import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import type { JwtPayload } from './guards/jwt-auth.guard.js';

@Injectable()
export class EmpresasService {
  constructor(private readonly prisma: PrismaService) {}

  private asegurarRolEmpresa(payload: JwtPayload) {
    if (payload.rol !== 'EMPRESA') {
      throw new ForbiddenException(
        'Solo las cuentas de empresa pueden usar este recurso',
      );
    }
  }

  private async obtenerEmpresaDelUsuario(usuarioId: string) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { usuarioId },
    });

    if (!empresa) {
      throw new NotFoundException(
        'Este usuario no tiene un perfil de empresa asociado',
      );
    }

    return empresa;
  }

  async crearOferta(payload: JwtPayload, dto: CrearOfertaDto) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    return this.prisma.oferta.create({
      data: {
        empresaId: empresa.id,
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        perfilBuscado: dto.perfilBuscado,
      },
    });
  }

  async listarOfertas(payload: JwtPayload) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    return this.prisma.oferta.findMany({
      where: { empresaId: empresa.id },
      orderBy: { fechaPublicacion: 'desc' },
    });
  }
}
