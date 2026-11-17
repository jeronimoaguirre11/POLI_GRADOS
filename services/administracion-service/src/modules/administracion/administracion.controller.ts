import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { AdministracionService } from './administracion.service.js';
import { CrearCuentaDto } from './dto/crear-cuenta.dto.js';
import { CrearDocenteDto } from './dto/crear-docente.dto.js';
import { CrearEstudianteDto } from './dto/crear-estudiante.dto.js';
import { CrearEmpresaDto } from './dto/crear-empresa.dto.js';
import { CambiarEstadoDto } from './dto/cambiar-estado.dto.js';
import { RestablecerPasswordDto } from './dto/restablecer-password.dto.js';
import { ActualizarCuentaDto } from './dto/actualizar-cuenta.dto.js';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto.js';

// Expuesto por el gateway en /administracion. Cada metodo del servicio
// verifica que la cuenta sea SUPERADMIN y siga activa.
@Controller('administracion/usuarios')
@UseGuards(JwtAuthGuard)
export class AdministracionController {
  constructor(private readonly administracion: AdministracionService) {}

  @Get()
  listar(@Req() request: any) {
    return this.administracion.listarUsuarios(request.user);
  }

  @Post('coordinadores')
  crearCoordinador(@Req() request: any, @Body() dto: CrearCuentaDto) {
    return this.administracion.crearCoordinador(request.user, dto);
  }

  @Post('docentes')
  crearDocente(@Req() request: any, @Body() dto: CrearDocenteDto) {
    return this.administracion.crearDocente(request.user, dto);
  }

  @Post('estudiantes')
  crearEstudiante(@Req() request: any, @Body() dto: CrearEstudianteDto) {
    return this.administracion.crearEstudiante(request.user, dto);
  }

  @Post('empresas')
  crearEmpresa(@Req() request: any, @Body() dto: CrearEmpresaDto) {
    return this.administracion.crearEmpresa(request.user, dto);
  }

  @Get(':id/perfil')
  obtenerPerfil(@Req() request: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.administracion.obtenerPerfil(request.user, id);
  }

  @Patch(':id')
  actualizarCuenta(
    @Req() request: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActualizarCuentaDto,
  ) {
    return this.administracion.actualizarCuenta(request.user, id, dto);
  }

  @Patch(':id/perfil')
  actualizarPerfil(
    @Req() request: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActualizarPerfilDto,
  ) {
    return this.administracion.actualizarPerfil(request.user, id, dto);
  }

  @Patch(':id/password')
  restablecerPassword(
    @Req() request: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RestablecerPasswordDto,
  ) {
    return this.administracion.restablecerPassword(request.user, id, dto.password);
  }

  @Patch(':id/estado')
  cambiarEstado(
    @Req() request: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CambiarEstadoDto,
  ) {
    return this.administracion.cambiarEstado(request.user, id, dto.activo);
  }
}
