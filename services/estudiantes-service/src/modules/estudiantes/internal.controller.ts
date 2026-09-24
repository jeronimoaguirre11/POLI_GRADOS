import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service.js';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';

// Rutas que SOLO llaman otros microservicios (el gateway nunca reenvia nada
// bajo /internal). Auth-service la usa al registrar una cuenta ESTUDIANTE;
// empresas-service la usa para armar el perfil de cada postulante;
// postulaciones-service la usa para resolver el usuarioId del token al
// Estudiante.id que necesita guardar en una postulacion nueva.
@Controller('internal/estudiantes')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  async crear(@Body() dto: CrearEstudianteDto) {
    return this.estudiantesService.crearPerfil(dto);
  }

  // Inventario seguro que usa coordinadores-service para construir su panel.
  // Solo contiene datos academicos; nombre y correo se resuelven en auth.
  @Get()
  async listarTodos() {
    return this.estudiantesService.listarTodos();
  }

  @Get('lote')
  async obtenerPorLote(@Query('ids') ids: string) {
    const listaIds = (ids ?? '').split(',').filter(Boolean);
    return this.estudiantesService.obtenerPorLote(listaIds);
  }

  // --- Llamado solo por postulaciones-service (postularse) ---
  @Get('por-usuario/:usuarioId')
  async obtenerPorUsuario(@Param('usuarioId') usuarioId: string) {
    const estudiante =
      await this.estudiantesService.obtenerPorUsuario(usuarioId);
    if (!estudiante) {
      throw new NotFoundException(
        'Este usuario no tiene un perfil de estudiante asociado',
      );
    }
    return estudiante;
  }
}
