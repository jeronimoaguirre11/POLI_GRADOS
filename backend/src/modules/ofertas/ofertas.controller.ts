import { Controller, Get, UseGuards } from '@nestjs/common';
import { OfertasService } from './ofertas.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@Controller('ofertas')
@UseGuards(JwtAuthGuard)
export class OfertasController {
  constructor(private readonly ofertasService: OfertasService) {}

  @Get()
  async listarAbiertas() {
    return this.ofertasService.listarAbiertas();
  }
}
