import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  async crearDocente(@Req() request: any, @Body() dto: CrearDocenteDto) {
    return this.coordinadoresService.crearDocente(request.user, dto);
  }

  @Get('docentes')
  async listarDocentes(@Req() request: any) {
    return this.coordinadoresService.listarDocentes(request.user);
  }

  @Post('asignaciones-docentes')
  async asignarDocente(@Req() request: any, @Body() dto: AsignarDocenteDto) {
    return this.coordinadoresService.asignarDocente(request.user, dto);
  }

  @Put('asignaciones-docentes')
  async reasignarDocente(@Req() request: any, @Body() dto: AsignarDocenteDto) {
    return this.coordinadoresService.reasignarDocente(request.user, dto);
  }

  @Delete('asignaciones-docentes/:estudianteId')
  async retirarAsignacion(
    @Req() request: any,
    @Param('estudianteId', new ParseUUIDPipe()) estudianteId: string,
  ) {
    return this.coordinadoresService.retirarAsignacion(
      request.user,
      estudianteId,
    );
  }
}
