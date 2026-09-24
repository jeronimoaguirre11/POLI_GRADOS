import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostulacionesService } from './postulaciones.service.js';
import { ActualizarPostulacionInternaDto } from './dto/actualizar-postulacion-interna.dto.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

// Rutas que SOLO llaman otros microservicios (el gateway nunca reenvia nada
// bajo /internal). Las usa empresas-service para listar/gestionar
// postulantes y descargar hojas de vida sin tocar esta base de datos
// directamente.
//
// OJO con el orden: las rutas literales ('conteo-por-ofertas', 'por-oferta/:x')
// van ANTES que ':id', si no Express intentaria matchear "conteo-por-ofertas"
// como si fuera un id.
@Controller('internal')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly postulacionesService: PostulacionesService) {}

  @Get('conteo-por-ofertas')
  async conteoPorOfertas(@Query('ofertaIds') ofertaIds: string) {
    const ids = (ofertaIds ?? '').split(',').filter(Boolean);
    return this.postulacionesService.obtenerConteoPorOfertas(ids);
  }

  @Get('postulaciones')
  async listarParaCoordinador() {
    return this.postulacionesService.listarParaCoordinador();
  }

  @Get('por-oferta/:ofertaId')
  async porOferta(@Param('ofertaId') ofertaId: string) {
    return this.postulacionesService.obtenerPorOferta(ofertaId);
  }

  @Get(':id/archivo')
  async archivo(@Param('id') id: string) {
    return this.postulacionesService.obtenerArchivo(id);
  }

  @Get(':id')
  async obtenerUna(@Param('id') id: string) {
    const postulacion = await this.postulacionesService.obtenerPorId(id);
    if (!postulacion) {
      throw new NotFoundException('Postulacion no encontrada');
    }
    return postulacion;
  }

  @Patch(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() dto: ActualizarPostulacionInternaDto,
  ) {
    return this.postulacionesService.actualizarInterna(id, dto);
  }
}
