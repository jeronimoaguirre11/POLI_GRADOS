import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service.js';
import { CrearEmpresaDto } from './dto/crear-empresa.dto.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

// Rutas que SOLO llaman otros microservicios (el gateway nunca reenvia nada
// bajo /internal). Auth-service la usa al registrar una cuenta EMPRESA.
@Controller('internal/empresas')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  async crear(@Body() dto: CrearEmpresaDto) {
    return this.empresasService.crearPerfil(dto);
  }
}
