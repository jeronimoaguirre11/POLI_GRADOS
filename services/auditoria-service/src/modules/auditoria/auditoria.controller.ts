import { Controller, Get, Header, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { AuditoriaService } from './auditoria.service.js';
import { FiltrosEventosDto } from './dto/filtros-eventos.dto.js';

// Expuesto por el gateway en /auditoria. Solo el super administrador activo.
@Controller('auditoria')
@UseGuards(JwtAuthGuard)
export class AuditoriaController {
  constructor(private readonly auditoria: AuditoriaService) {}

  @Get('eventos')
  listar(@Req() request: any, @Query() filtros: FiltrosEventosDto) {
    return this.auditoria.listar(request.user, filtros);
  }

  @Get('eventos.csv')
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="auditoria-poli-grados.csv"')
  exportar(@Req() request: any, @Query() filtros: FiltrosEventosDto) {
    return this.auditoria.exportarCsv(request.user, filtros);
  }
}
