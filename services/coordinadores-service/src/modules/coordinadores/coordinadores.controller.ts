import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CoordinadoresService } from './coordinadores.service.js';
import { CrearDocenteDto } from './dto/crear-docente.dto.js';
import { AsignarDocenteDto } from './dto/asignar-docente.dto.js';

@Controller('coordinadores')
@UseGuards(JwtAuthGuard)
export class CoordinadoresController {
  constructor(private readonly coordinadoresService: CoordinadoresService) {}

  @Get('panel')
  async obtenerPanel(@Req() request: any) {
    return this.coordinadoresService.obtenerPanel(request.user);
  }

  @Post('docentes')
  async crearDocente(
    @Req() request: any,
    @Body() dto: CrearDocenteDto,
  ) {
    return this.coordinadoresService.crearDocente(request.user, dto);
  }

  @Post('asignaciones-docentes')
  async asignarDocente(
    @Req() request: any,
    @Body() dto: AsignarDocenteDto,
  ) {
    return this.coordinadoresService.asignarDocente(
      request.user,
      dto,
    );
  }
}