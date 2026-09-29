import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DiplomadoService } from './diplomado.service.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

// Rutas que SOLO llaman otros microservicios (postulaciones-service, y mas
// adelante investigacion-service), nunca el gateway ni un frontend.
@Controller('internal')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly diplomadoService: DiplomadoService) {}

  @Get('estudiante/:estudianteId/comprometido')
  async comprometido(@Param('estudianteId') estudianteId: string) {
    return this.diplomadoService.obtenerCompromisoInterno(estudianteId);
  }
}
