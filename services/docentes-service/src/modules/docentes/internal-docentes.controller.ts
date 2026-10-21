import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';
import { DocentesService } from './docentes.service.js';
import { CreateDocenteDto } from './dto/create-docente.dto.js';
import { AsignarEstudianteDto } from './dto/asignar-estudiante.dto.js';

@Controller('internal/docentes')
@UseGuards(InternalAuthGuard)
export class InternalDocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  crear(@Body() dto: CreateDocenteDto) {
    return this.docentesService.crear(dto);
  }

  @Get()
  listar() {
    return this.docentesService.listar();
  }

  @Post('asignaciones')
  asignarEstudiante(@Body() dto: AsignarEstudianteDto) {
    return this.docentesService.asignarEstudiante(
      dto.docenteId,
      dto.estudianteId,
    );
  }

  @Put('asignaciones')
  reasignarEstudiante(@Body() dto: AsignarEstudianteDto) {
    return this.docentesService.reasignarEstudiante(
      dto.docenteId,
      dto.estudianteId,
    );
  }

  @Delete('asignaciones/:estudianteId')
  retirarAsignacion(
    @Param('estudianteId', new ParseUUIDPipe()) estudianteId: string,
  ) {
    return this.docentesService.retirarAsignacion(estudianteId);
  }

  @Get('asignaciones')
  listarAsignaciones() {
    return this.docentesService.listarAsignaciones();
  }

  @Get(':docenteId/asignaciones')
  listarEstudiantesAsignados(@Param('docenteId') docenteId: string) {
    return this.docentesService.listarEstudiantesAsignados(docenteId);
  }
}
