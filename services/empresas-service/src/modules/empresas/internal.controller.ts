import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmpresasService } from './empresas.service.js';
import { EmpresasAdministracionService } from './empresas-administracion.service.js';
import { CrearEmpresaDto } from './dto/crear-empresa.dto.js';
import { ActualizarEmpresaAdminDto } from './dto/actualizar-empresa-admin.dto.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

// Rutas que SOLO llaman otros microservicios (el gateway nunca reenvia nada
// bajo /internal). Auth-service la usa al registrar una cuenta EMPRESA, y
// administracion-service para que el super administrador vea y edite el
// perfil de una empresa.
@Controller('internal/empresas')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(
    private readonly empresasService: EmpresasService,
    private readonly administracion: EmpresasAdministracionService,
  ) {}

  @Post()
  async crear(@Body() dto: CrearEmpresaDto) {
    return this.empresasService.crearPerfil(dto);
  }

  @Get('por-usuario/:usuarioId')
  async obtenerPorUsuario(@Param('usuarioId') usuarioId: string) {
    return this.administracion.obtenerPorUsuario(usuarioId);
  }

  @Patch('por-usuario/:usuarioId')
  async actualizarPorUsuario(
    @Param('usuarioId') usuarioId: string,
    @Body() dto: ActualizarEmpresaAdminDto,
  ) {
    return this.administracion.actualizarPorUsuario(usuarioId, dto);
  }
}
