import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { IngresarEmpresaDto } from './dto/ingresar-empresa.dto.js';
import { EmpresasService } from './empresas.service.js';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post('ingresar')
  ingresar(@Body() dto: IngresarEmpresaDto) {
    return this.empresasService.ingresar(dto);
  }

  @Post(':empresaId/ofertas')
  crearOferta(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Body() dto: CrearOfertaDto,
  ) {
    return this.empresasService.crearOferta(empresaId, dto);
  }

  @Get(':empresaId/ofertas')
  listarOfertas(@Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.empresasService.listarOfertas(empresaId);
  }
}
