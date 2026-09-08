var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let EmpresasService = class EmpresasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ingresar(dto) {
        return this.prisma.empresa.upsert({
            where: { email: dto.email },
            update: { nombre: dto.nombre },
            create: { email: dto.email, nombre: dto.nombre },
        });
    }
    async crearOferta(empresaId, dto) {
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
    async listarOfertas(empresaId) {
        await this.obtenerEmpresaOFallar(empresaId);
        return this.prisma.ofertaPractica.findMany({
            where: { empresaId },
            orderBy: { creadoEn: 'desc' },
        });
    }
    async obtenerEmpresaOFallar(empresaId) {
        const empresa = await this.prisma.empresa.findUnique({
            where: { id: empresaId },
        });
        if (!empresa)
            throw new NotFoundException('Empresa no encontrada');
        return empresa;
    }
};
EmpresasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], EmpresasService);
export { EmpresasService };
//# sourceMappingURL=empresas.service.js.map