import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';
import { RegistrarEventoDto } from './dto/registrar-evento.dto.js';
import { FiltrosEventosDto } from './dto/filtros-eventos.dto.js';

// Maximo de filas en la exportacion a CSV.
const LIMITE_EXPORTACION = 5000;

// Las fechas sin hora (AAAA-MM-DD) se interpretan en hora de Colombia.
function inicioDelDia(valor: string) {
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(valor) ? `${valor}T00:00:00-05:00` : valor);
}
function finDelDia(valor: string) {
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(valor) ? `${valor}T23:59:59.999-05:00` : valor);
}

function celdaCsv(valor: unknown) {
  const texto = valor === null || valor === undefined ? '' : String(valor);
  return /[";\n\r]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
}

const formatoFecha = new Intl.DateTimeFormat('es-CO', {
  timeZone: 'America/Bogota',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

@Injectable()
export class AuditoriaService {
  constructor(private readonly prisma: PrismaService) {}

  // --- Ruta interna: la llaman el gateway y auth-service ---
  async registrar(dto: RegistrarEventoDto) {
    await this.prisma.evento.create({ data: dto });
    return { ok: true };
  }

  // Igual que administracion-service: ademas del rol del JWT se confirma con
  // auth-service que la cuenta siga activa.
  private async asegurarSuperadminActivo(payload: JwtPayload) {
    if (payload?.rol !== 'SUPERADMIN') {
      throw new ForbiddenException(
        'Solo el super administrador puede consultar la auditoría',
      );
    }

    const base = process.env.AUTH_SERVICE_URL;
    if (!base) {
      throw new InternalServerErrorException(
        'Falta configurar AUTH_SERVICE_URL en auditoria-service',
      );
    }

    try {
      const { data } = await axios.get<{ rol: string; activo: boolean }>(
        `${base}/internal/usuarios/${payload.sub}/estado`,
        { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' } },
      );
      if (data.rol !== 'SUPERADMIN' || !data.activo) {
        throw new ForbiddenException('Tu cuenta de administrador está desactivada');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new ForbiddenException('Tu cuenta ya no existe');
      }
      throw new InternalServerErrorException(
        'No fue posible verificar la cuenta con auth-service',
      );
    }
  }

  private construirFiltro(filtros: FiltrosEventosDto) {
    const where: Record<string, unknown> = {};
    const usuario = filtros.usuario?.trim();
    const accion = filtros.accion?.trim();

    if (usuario) {
      where.OR = [
        { email: { contains: usuario, mode: 'insensitive' } },
        { usuarioId: usuario },
      ];
    }
    if (filtros.rol) where.rol = filtros.rol;
    if (accion) {
      where.AND = [
        {
          OR: [
            { accion: { contains: accion, mode: 'insensitive' } },
            { ruta: { contains: accion, mode: 'insensitive' } },
          ],
        },
      ];
    }
    if (filtros.resultado) where.exito = filtros.resultado === 'exito';
    if (filtros.desde || filtros.hasta) {
      where.fecha = {
        ...(filtros.desde && { gte: inicioDelDia(filtros.desde) }),
        ...(filtros.hasta && { lte: finDelDia(filtros.hasta) }),
      };
    }
    return where;
  }

  async listar(payload: JwtPayload, filtros: FiltrosEventosDto) {
    await this.asegurarSuperadminActivo(payload);

    const pagina = filtros.pagina ?? 1;
    const limite = filtros.limite ?? 50;
    const where = this.construirFiltro(filtros);

    const [eventos, total] = await Promise.all([
      this.prisma.evento.findMany({
        where,
        orderBy: { fecha: 'desc' },
        skip: (pagina - 1) * limite,
        take: limite,
      }),
      this.prisma.evento.count({ where }),
    ]);

    return { eventos, total, pagina, limite };
  }

  async exportarCsv(payload: JwtPayload, filtros: FiltrosEventosDto) {
    await this.asegurarSuperadminActivo(payload);

    const eventos = await this.prisma.evento.findMany({
      where: this.construirFiltro(filtros),
      orderBy: { fecha: 'desc' },
      take: LIMITE_EXPORTACION,
    });

    const encabezado = [
      'Fecha (hora Colombia)',
      'Correo',
      'Rol',
      'Acción',
      'Resultado',
      'Código HTTP',
      'Método',
      'Ruta',
      'Servicio',
      'IP',
      'Detalle',
    ];
    const filas = eventos.map((e) =>
      [
        formatoFecha.format(e.fecha),
        e.email,
        e.rol,
        e.accion,
        e.exito ? 'Exitoso' : 'Fallido',
        e.estado,
        e.metodo,
        e.ruta,
        e.servicio,
        e.ip,
        e.detalle,
      ]
        .map(celdaCsv)
        .join(';'),
    );

    // BOM + punto y coma: Excel en espanol lo abre con tildes y columnas.
    return '﻿' + [encabezado.join(';'), ...filas].join('\r\n');
  }
}
