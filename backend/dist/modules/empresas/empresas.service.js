var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
const TIPOS_IMAGEN_PERMITIDOS = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
};
const TAMANO_MAXIMO_IMAGEN = 3 * 1024 * 1024;
let EmpresasService = class EmpresasService {
    prisma;
    directorioImagenes = join(process.cwd(), 'uploads', 'ofertas');
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
    async obtenerOfertaPropia(empresaId, ofertaId) {
        const oferta = await this.prisma.oferta.findUnique({
            where: { id: ofertaId },
        });
        if (!oferta || oferta.empresaId !== empresaId) {
            throw new NotFoundException('Convocatoria no encontrada');
        }
        return oferta;
    }
    async guardarImagenOferta(imagen) {
        if (!imagen)
            return null;
        const extension = TIPOS_IMAGEN_PERMITIDOS[imagen.mimetype];
        if (!extension) {
            throw new BadRequestException('La foto debe ser una imagen PNG, JPG o WEBP');
        }
        if (imagen.size > TAMANO_MAXIMO_IMAGEN) {
            throw new BadRequestException('La foto no puede pesar mas de 3MB');
        }
        await fs.mkdir(this.directorioImagenes, { recursive: true });
        const nombreArchivo = `${randomUUID()}.${extension}`;
        await fs.writeFile(join(this.directorioImagenes, nombreArchivo), imagen.buffer);
        return `/uploads/ofertas/${nombreArchivo}`;
    }
    async obtenerPerfil(payload) {
        this.asegurarRolEmpresa(payload);
        const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
        return {
            nombreEmpresa: empresa.nombreEmpresa,
            nit: empresa.nit,
            sector: empresa.sector,
        };
    }
    async crearOferta(payload, dto, imagen) {
        this.asegurarRolEmpresa(payload);
        const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
        const imagenUrl = await this.guardarImagenOferta(imagen);
        return this.prisma.oferta.create({
            data: {
                empresaId: empresa.id,
                titulo: dto.titulo,
                descripcion: dto.descripcion,
                perfilBuscado: dto.perfilBuscado,
                modalidadContratacion: dto.modalidadContratacion,
                ubicacion: dto.ubicacion,
                funciones: dto.funciones,
                fechaInicioConvocatoria: dto.fechaInicioConvocatoria,
                fechaFinConvocatoria: dto.fechaFinConvocatoria,
                fechaInicioPractica: dto.fechaInicioPractica,
                duracionMeses: dto.duracionMeses,
                imagenUrl,
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
    async actualizarOferta(payload, ofertaId, dto, imagen) {
        this.asegurarRolEmpresa(payload);
        const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
        await this.obtenerOfertaPropia(empresa.id, ofertaId);
        const imagenUrl = imagen
            ? await this.guardarImagenOferta(imagen)
            : undefined;
        return this.prisma.oferta.update({
            where: { id: ofertaId },
            data: {
                ...(dto.titulo !== undefined && { titulo: dto.titulo }),
                ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
                ...(dto.perfilBuscado !== undefined && {
                    perfilBuscado: dto.perfilBuscado,
                }),
                ...(dto.modalidadContratacion !== undefined && {
                    modalidadContratacion: dto.modalidadContratacion,
                }),
                ...(dto.ubicacion !== undefined && { ubicacion: dto.ubicacion }),
                ...(dto.funciones !== undefined && { funciones: dto.funciones }),
                ...(dto.fechaInicioConvocatoria !== undefined && {
                    fechaInicioConvocatoria: dto.fechaInicioConvocatoria,
                }),
                ...(dto.fechaFinConvocatoria !== undefined && {
                    fechaFinConvocatoria: dto.fechaFinConvocatoria,
                }),
                ...(dto.fechaInicioPractica !== undefined && {
                    fechaInicioPractica: dto.fechaInicioPractica,
                }),
                ...(dto.duracionMeses !== undefined && {
                    duracionMeses: dto.duracionMeses,
                }),
                ...(imagenUrl !== undefined && { imagenUrl }),
            },
        });
    }
    async eliminarOferta(payload, ofertaId) {
        this.asegurarRolEmpresa(payload);
        const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
        await this.obtenerOfertaPropia(empresa.id, ofertaId);
        try {
            await this.prisma.oferta.delete({ where: { id: ofertaId } });
        }
        catch (error) {
            if (error?.code === 'P2003') {
                throw new ConflictException('No se puede eliminar: esta convocatoria ya tiene postulaciones o practicas asociadas');
            }
            throw error;
        }
        return { eliminado: true };
    }
};
EmpresasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], EmpresasService);
export { EmpresasService };
//# sourceMappingURL=empresas.service.js.map