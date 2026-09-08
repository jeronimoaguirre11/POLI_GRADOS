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
const TIPOS_HOJA_VIDA_PERMITIDOS = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};
const TAMANO_MAXIMO_HOJA_VIDA = 5 * 1024 * 1024;
let PostulacionesService = class PostulacionesService {
    prisma;
    directorioHojasVida = join(process.cwd(), 'uploads', 'hojas-vida');
    constructor(prisma) {
        this.prisma = prisma;
    }
    asegurarRolEstudiante(payload) {
        if (payload.rol !== 'ESTUDIANTE') {
            throw new ForbiddenException('Solo las cuentas de estudiante pueden postularse');
        }
    }
    async obtenerEstudianteDelUsuario(usuarioId) {
        const estudiante = await this.prisma.estudiante.findUnique({
            where: { usuarioId },
        });
        if (!estudiante) {
            throw new NotFoundException('Este usuario no tiene un perfil de estudiante asociado');
        }
        return estudiante;
    }
    async guardarHojaVida(archivo) {
        if (!archivo) {
            throw new BadRequestException('Debes adjuntar tu hoja de vida para postularte');
        }
        const extension = TIPOS_HOJA_VIDA_PERMITIDOS[archivo.mimetype];
        if (!extension) {
            throw new BadRequestException('La hoja de vida debe ser un archivo PDF o Word (doc/docx)');
        }
        if (archivo.size > TAMANO_MAXIMO_HOJA_VIDA) {
            throw new BadRequestException('La hoja de vida no puede pesar mas de 5MB');
        }
        await fs.mkdir(this.directorioHojasVida, { recursive: true });
        const nombreArchivo = `${randomUUID()}.${extension}`;
        await fs.writeFile(join(this.directorioHojasVida, nombreArchivo), archivo.buffer);
        return `/uploads/hojas-vida/${nombreArchivo}`;
    }
    async postularse(payload, ofertaId, hojaVida) {
        this.asegurarRolEstudiante(payload);
        const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);
        const oferta = await this.prisma.oferta.findUnique({
            where: { id: ofertaId },
        });
        if (!oferta) {
            throw new NotFoundException('Convocatoria no encontrada');
        }
        if (oferta.estado !== 'ABIERTA') {
            throw new ConflictException('Esta convocatoria ya no esta abierta');
        }
        const hojaVidaUrl = await this.guardarHojaVida(hojaVida);
        try {
            return await this.prisma.postulacion.create({
                data: {
                    ofertaId,
                    estudianteId: estudiante.id,
                    hojaVidaUrl,
                },
            });
        }
        catch (error) {
            if (error?.code === 'P2002') {
                throw new ConflictException('Ya te postulaste a esta convocatoria');
            }
            throw error;
        }
    }
    async listarMias(payload) {
        this.asegurarRolEstudiante(payload);
        const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);
        return this.prisma.postulacion.findMany({
            where: { estudianteId: estudiante.id },
            orderBy: { fecha: 'desc' },
            include: {
                oferta: {
                    include: {
                        empresa: { select: { nombreEmpresa: true, sector: true } },
                    },
                },
            },
        });
    }
    async cancelarPostulacion(payload, postulacionId) {
        this.asegurarRolEstudiante(payload);
        const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);
        const postulacion = await this.prisma.postulacion.findUnique({
            where: { id: postulacionId },
        });
        if (!postulacion || postulacion.estudianteId !== estudiante.id) {
            throw new NotFoundException('Postulacion no encontrada');
        }
        await this.prisma.postulacion.delete({ where: { id: postulacionId } });
        fs.unlink(join(process.cwd(), postulacion.hojaVidaUrl)).catch(() => { });
        return { eliminado: true };
    }
};
PostulacionesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PostulacionesService);
export { PostulacionesService };
//# sourceMappingURL=postulaciones.service.js.map