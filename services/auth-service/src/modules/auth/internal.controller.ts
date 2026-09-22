import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

// Rutas que SOLO llaman otros microservicios (nunca el gateway ni un
// frontend). El gateway no reenvia nada bajo /internal, y ademas este guard
// exige el header x-internal-key como segunda capa de seguridad.
@Controller('internal/usuarios')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly prisma: PrismaService) {}

  // La usa empresas-service para armar nombre/correo de cada postulante en
  // listarPostulantes (ver empresas-service).
  @Get('lote')
  async obtenerPorLote(@Query('ids') ids: string) {
    const listaIds = (ids ?? '').split(',').filter(Boolean);

    if (listaIds.length === 0) return [];

    return this.prisma.usuario.findMany({
      where: { id: { in: listaIds } },
      select: { id: true, nombre: true, email: true },
    });
  }
}
