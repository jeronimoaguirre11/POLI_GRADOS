var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let EmpresasService = class EmpresasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    asegurarRolEmpresa(payload) {
        if (payload.rol !== 'EMPRESA') {
            throw new ForbiddenException('Solo las cuentas de empresa pueden usar este recurso');
        }
    }
    async obtenerEmpresaDelUsuario(usuarioId) {
        const empresa = await this.prisma.empresa.findUnique({
            where: { usuarioId },
        });
        if (!empresa) {
            throw new NotFoundException('Este usuario no tiene un perfil de empresa asociado');
        }
        return empresa;
    }
    async crearOferta(payload, dto) {
        this.asegurarRolEmpresa(payload);
        const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
        return this.prisma.oferta.create({
            data: {
                empresaId: empresa.id,
                titulo: dto.titulo,
                descripcion: dto.descripcion,
                perfilBuscado: dto.perfilBuscado,
            },
        });
    }
    async listarOfertas(payload) {
        this.asegurarRolEmpresa(payload);
        const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
        return this.prisma.oferta.findMany({
            where: { empresaId: empresa.id },
            orderBy: { fechaPublicacion: 'desc' },
        });
    }
};
EmpresasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], EmpresasService);
export { EmpresasService };
//# sourceMappingURL=empresas.service.js.map