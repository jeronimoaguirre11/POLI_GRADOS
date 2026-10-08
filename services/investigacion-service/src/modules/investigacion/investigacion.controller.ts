import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InvestigacionService } from './investigacion.service.js';
import { CrearInvestigacionDto } from './dto/crear-investigacion.dto.js';
import { EvaluarInvestigacionDto } from './dto/evaluar-investigacion.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('investigaciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvestigacionController {
  constructor(private readonly investigacionService: InvestigacionService) {}

  @Post()
  @Roles('ESTUDIANTE')
  async crear(@Req() request: any, @Body() dto: CrearInvestigacionDto) {
    return this.investigacionService.crear(request.user, dto);
  }

  @Get('mias')
  @Roles('ESTUDIANTE')
  async misInvestigaciones(@Req() request: any) {
    return this.investigacionService.misInvestigaciones(request.user);
  }

  @Get('pendientes')
  @Roles('COORDINADOR')
  async pendientes(@Req() request: any) {
    return this.investigacionService.listarPendientes(request.user);
  }

  @Get(':id')
  async obtenerUna(@Param('id') id: string) {
    return this.investigacionService.obtenerPorId(id);
  }

  @Delete(':id')
  @Roles('ESTUDIANTE')
  async cancelar(@Req() request: any, @Param('id') id: string) {
    return this.investigacionService.cancelar(request.user, id);
  }

  @Patch(':id')
  @Roles('COORDINADOR')
  async evaluar(
    @Req() request: any,
    @Param('id') id: string,
    @Body() dto: EvaluarInvestigacionDto,
  ) {
    return this.investigacionService.evaluar(request.user, id, dto);
  }
}
