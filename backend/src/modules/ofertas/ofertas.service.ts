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
}
