import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InvestigacionService } from './investigacion.service.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

@Controller('internal')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly investigacionService: InvestigacionService) {}

  @Get('resumen-docente')
  async resumenParaDocente(@Query('usuarioIds') usuarioIds: string) {
    const ids = (usuarioIds ?? '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    return this.investigacionService.obtenerResumenParaDocente(ids);
  }

  @Get('estudiante/:estudianteId/comprometido')
  async comprometido(@Param('estudianteId') estudianteId: string) {
    return this.investigacionService.obtenerCompromisoInterno(estudianteId);
  }
}
