import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CoordinadoresService } from './coordinadores.service.js';

@Controller('coordinadores')
@UseGuards(JwtAuthGuard)
export class CoordinadoresController {
  constructor(private readonly coordinadoresService: CoordinadoresService) {}

  @Get('panel')
  async obtenerPanel(@Req() request: any) {
    return this.coordinadoresService.obtenerPanel(request.user);
  }
}
