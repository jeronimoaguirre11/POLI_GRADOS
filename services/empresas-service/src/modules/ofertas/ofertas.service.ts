import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class OfertasService {
  constructor(private readonly prisma: PrismaService) {}

  // Lista publica (para cualquier usuario autenticado, tipicamente
  // estudiantes) de las convocatorias abiertas de todas las empresas.
  async listarAbiertas() {
    return this.prisma.oferta.findMany({
      where: { estado: 'ABIERTA' },
      orderBy: { fechaPublicacion: 'desc' },
      include: {
        empresa: {
          select: { nombreEmpresa: true, sector: true },
        },
      },
    });
  }

  // Vista administrativa usada por coordinadores-service para construir el
  // reporte institucional. Selecciona solo los campos que deben aparecer en
  // el PDF y evita transferir imagenes, funciones o descripciones extensas.
  async listarActivasParaReporte() {
    const ahora = new Date();

    return this.prisma.oferta.findMany({
      where: {
        estado: 'ABIERTA',
        fechaInicioConvocatoria: { lte: ahora },
        fechaFinConvocatoria: { gte: ahora },
      },
      orderBy: [{ fechaFinConvocatoria: 'asc' }, { fechaPublicacion: 'desc' }],
      select: {
        id: true,
        titulo: true,
        perfilBuscado: true,
        modalidadContratacion: true,
        ubicacion: true,
        fechaInicioConvocatoria: true,
        fechaFinConvocatoria: true,
        fechaInicioPractica: true,
        duracionMeses: true,
        estado: true,
        fechaPublicacion: true,
        empresa: {
          select: {
            nombreEmpresa: true,
            nit: true,
            sector: true,
          },
        },
      },
    });
  }

  // --- Llamado solo por postulaciones-service (rutas internas) ---

  // La usa `postularse` para validar que la convocatoria exista y este
  // ABIERTA antes de crear la postulacion.
  async obtenerParaValidacion(id: string) {
    return this.prisma.oferta.findUnique({
      where: { id },
      select: { id: true, estado: true, empresaId: true },
    });
  }

  // La usa `listarMias` para armar titulo/empresa de cada postulacion del
  // estudiante sin tocar directamente esta base de datos.
  async obtenerPorLote(ids: string[]) {
    if (ids.length === 0) return [];

    return this.prisma.oferta.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        titulo: true,
        perfilBuscado: true,
        modalidadContratacion: true,
        ubicacion: true,
        empresa: { select: { nombreEmpresa: true, sector: true } },
      },
    });
  }
}
