import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InvestigacionService } from './investigacion.service.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

@Controller('internal')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly investigacionService: InvestigacionService) {}

  @Get('estudiante/:estudianteId/comprometido')
  async comprometido(@Param('estudianteId') estudianteId: string) {
    return this.investigacionService.obtenerCompromisoInterno(estudianteId);
  }
}
