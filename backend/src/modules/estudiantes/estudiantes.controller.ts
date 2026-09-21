import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service.js';
import { ActualizarPerfilEstudianteDto } from './dto/actualizar-perfil-estudiante.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@Controller('estudiantes')
@UseGuards(JwtAuthGuard)
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get('perfil')
  async obtenerPerfil(@Req() request: any) {
    return this.estudiantesService.obtenerPerfil(request.user);
  }

  @Patch('perfil')
  async actualizarPerfil(@Req() request: any, @Body() dto: ActualizarPerfilEstudianteDto) {
    return this.estudiantesService.actualizarPerfil(request.user, dto);
  }
}
