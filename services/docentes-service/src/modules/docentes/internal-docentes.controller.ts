import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';
import { DocentesService } from './docentes.service.js';
import { CreateDocenteDto } from './dto/create-docente.dto.js';

@Controller('internal/docentes')
@UseGuards(InternalAuthGuard)
export class InternalDocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  crear(@Body() dto: CreateDocenteDto) {
    return this.docentesService.crear(dto);
  }
}