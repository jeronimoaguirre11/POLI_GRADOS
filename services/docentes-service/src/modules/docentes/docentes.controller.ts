import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DocentesService } from './docentes.service.js';
import { CreateDocenteDto } from './dto/create-docente.dto.js';
import { UpdateDocenteDto } from './dto/update-docente.dto.js';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  crear(@Body() dto: CreateDocenteDto) {
    return this.docentesService.crear(dto);
  }

  @Get()
  listar() {
    return this.docentesService.listar();
  }

  @Get('usuario/:usuarioId')
  obtenerPorUsuarioId(@Param('usuarioId') usuarioId: string) {
    return this.docentesService.obtenerPorUsuarioId(usuarioId);
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.docentesService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() dto: UpdateDocenteDto,
  ) {
    return this.docentesService.actualizar(id, dto);
  }
}