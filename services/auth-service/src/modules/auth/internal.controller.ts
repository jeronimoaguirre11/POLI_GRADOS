import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';
import { AuthService } from './auth.service.js';
import { CrearCoordinadorDto } from './dto/crear-coordinador.dto.js';
import { CrearDocenteDto } from './dto/crear-docente.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { CambiarEstadoCuentaDto } from './dto/cambiar-estado-cuenta.dto.js';

// Rutas que SOLO llaman otros microservicios (nunca el gateway ni un
// frontend). El gateway no reenvia nada bajo /internal, y ademas este guard
// exige el header x-internal-key como segunda capa de seguridad.
@Controller('internal/usuarios')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  // Aprovisionamiento administrativo. Esta ruta no pasa por el gateway y el
  // rol COORDINADOR se asigna dentro del servicio, no desde el body.
  @Post('coordinador')
  async crearCoordinador(@Body() dto: CrearCoordinadorDto) {
    return this.authService.crearCoordinador(dto);
  }

  @Post('docente')
  async crearDocente(@Body() dto: CrearDocenteDto) {
    return this.authService.crearDocente(dto);
  }

  // ---- Rutas usadas por administracion-service (super administrador) ----

  // Crea un estudiante o una empresa con su perfil, igual que el registro
  // publico, pero devuelve el usuario creado para mostrarlo en el panel.
  @Post('registro')
  async registrar(@Body() dto: RegisterDto) {
    return this.authService.registrarDesdeAdministracion(dto);
  }

  @Get('administracion')
  async listarParaAdministracion() {
    return this.authService.listarParaAdministracion();
  }

  // administracion-service la consulta en cada peticion para que un super
  // administrador desactivado pierda el acceso de inmediato, sin esperar a
  // que venza su JWT.
  @Get(':id/estado')
  async obtenerEstado(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.obtenerEstadoCuenta(id);
  }

  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CambiarEstadoCuentaDto,
  ) {
    return this.authService.cambiarEstadoCuenta(id, dto.activo);
  }

  // La usa coordinadores-service para asociar los perfiles distribuidos con
  // el nombre y correo del Usuario, sin exponer nunca el password.
  @Get()
  async listarTodos() {
    return this.prisma.usuario.findMany({
      select: { id: true, nombre: true, email: true, rol: true },
      orderBy: [{ nombre: 'asc' }, { email: 'asc' }],
    });
  }

  // La usa empresas-service para armar nombre/correo de cada postulante en
  // listarPostulantes (ver empresas-service).
  @Get('lote')
  async obtenerPorLote(@Query('ids') ids: string) {
    const listaIds = (ids ?? '').split(',').filter(Boolean);

    if (listaIds.length === 0) return [];

    return this.prisma.usuario.findMany({
      where: { id: { in: listaIds } },
      select: { id: true, nombre: true, email: true },
    });
  }
}
