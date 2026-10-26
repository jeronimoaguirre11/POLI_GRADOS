import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';
import { AuditoriaService } from './auditoria.service.js';
import { RegistrarEventoDto } from './dto/registrar-evento.dto.js';

// Solo la llaman el gateway (cada accion que modifica datos) y auth-service
// (inicios de sesion). El gateway nunca reenvia rutas /internal.
@Controller('internal/eventos')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly auditoria: AuditoriaService) {}

  @Post()
  @HttpCode(201)
  registrar(@Body() dto: RegistrarEventoDto) {
    return this.auditoria.registrar(dto);
  }
}
