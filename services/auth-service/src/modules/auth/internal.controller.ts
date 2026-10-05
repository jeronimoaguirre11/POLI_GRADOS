import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { InternalAuthGuard } from '../../common/guards/internal-auth.guard.js';
import { AuthService } from './auth.service.js';
import { CrearCoordinadorDto } from './dto/crear-coordinador.dto.js';

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
