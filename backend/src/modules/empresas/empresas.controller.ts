import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('empresas')
@UseGuards(JwtAuthGuard)
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post('ofertas')
  async crearOferta(@Req() request: any, @Body() dto: CrearOfertaDto) {
    return this.empresasService.crearOferta(request.user, dto);
  }

  @Get('ofertas')
  async listarOfertas(@Req() request: any) {
    return this.empresasService.listarOfertas(request.user);
  }
}
