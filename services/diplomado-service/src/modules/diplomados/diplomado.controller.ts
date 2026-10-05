// src/modules/diplomado/diplomado.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DiplomadoService } from './diplomado.service.js';
import { CrearDiplomadoDto } from './dto/crear-diplomado.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('diplomados')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DiplomadoController {
  constructor(private readonly diplomadoService: DiplomadoService) {}

  @Post()
  @Roles('COORDINADOR')
  async crear(@Req() request: any, @Body() dto: CrearDiplomadoDto) {
    return this.diplomadoService.crear(request.user, dto);
  }

  @Get()
  async listar() {
    return this.diplomadoService.listar();
  }

  @Get('mias')
  async misInscripciones(@Req() request: any) {
    return this.diplomadoService.obtenerMisInscripciones(request.user);
  }

  @Get(':id')
  async obtenerUno(@Param('id') id: string) {
    return this.diplomadoService.obtenerPorId(id);
  }

  @Post(':id/inscripciones')
  @Roles('ESTUDIANTE')
  async inscribirse(@Req() request: any, @Param('id') id: string) {
    return this.diplomadoService.inscribirse(request.user, id);
  }

  @Delete(':id/inscripciones')
  @Roles('ESTUDIANTE')
  async cancelar(@Req() request: any, @Param('id') id: string) {
    return this.diplomadoService.cancelarInscripcion(request.user, id);
  }
}
