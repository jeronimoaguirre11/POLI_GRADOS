import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DocentesService } from './docentes.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@Controller('docentes')
@UseGuards(JwtAuthGuard)
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Get('me')
  async obtenerMiPerfil(@Req() request: any) {
    return this.docentesService.obtenerMiPerfil(request.user);
  }

  @Get('me/estudiantes')
  async obtenerMisEstudiantes(@Req() request: any) {
    return this.docentesService.obtenerMisEstudiantes(request.user);
  }
}