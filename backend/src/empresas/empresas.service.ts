import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { IngresarEmpresaDto } from './dto/ingresar-empresa.dto.js';

@Injectable()
export class EmpresasService {
  constructor(private readonly prisma: PrismaService) {}

  // Placeholder de autenticacion: mientras no exista el modulo de Auth con
  // JWT, identificamos a la empresa solo por su email (upsert: si no existe
  // la crea, si existe la actualiza). Cuando el Auth real este listo, este
  // metodo se reemplaza por el login de verdad sin tocar el resto del modulo.
  ingresar(dto: IngresarEmpresaDto) {
    return this.prisma.empresa.upsert({
      where: { email: dto.email },
      update: { nombre: dto.nombre },
      create: { email: dto.email, nombre: dto.nombre },
    });
  }

  async crearOferta(empresaId: number, dto: CrearOfertaDto) {
    await this.obtenerEmpresaOFallar(empresaId);
    return this.prisma.ofertaPractica.create({
      data: {
        empresaId,
        titulo: dto.titulo,
        perfilBuscado: dto.perfilBuscado,
        descripcion: dto.descripcion,
      },
    });
  }

  async listarOfertas(empresaId: number) {
    await this.obtenerEmpresaOFallar(empresaId);
    return this.prisma.ofertaPractica.findMany({
      where: { empresaId },
      orderBy: { creadoEn: 'desc' },
    });
  }

  private async obtenerEmpresaOFallar(empresaId: number) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
    });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');
    return empresa;
  }
}
