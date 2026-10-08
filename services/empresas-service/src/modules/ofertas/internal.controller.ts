import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OfertasService } from './ofertas.service.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

// Rutas que SOLO llaman otros microservicios (el gateway nunca reenvia nada
// bajo /internal). Las usa postulaciones-service: "lote" para armar "mis
// postulaciones" del estudiante, ":id" para validar una convocatoria antes
// de crear una postulacion nueva.
@Controller('internal/ofertas')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly ofertasService: OfertasService) {}

  @Get('activas-reporte')
  async listarActivasParaReporte() {
    return this.ofertasService.listarActivasParaReporte();
  }

  @Get('lote')
  async obtenerPorLote(@Query('ids') ids: string) {
    const listaIds = (ids ?? '').split(',').filter(Boolean);
    return this.ofertasService.obtenerPorLote(listaIds);
  }

  @Get(':id')
  async obtenerUna(@Param('id') id: string) {
    const oferta = await this.ofertasService.obtenerParaValidacion(id);
    if (!oferta) {
      throw new NotFoundException('Convocatoria no encontrada');
    }
    return oferta;
  }
}
