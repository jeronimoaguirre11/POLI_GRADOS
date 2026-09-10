import { StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { EmpresasService } from './empresas.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { ActualizarOfertaDto } from './dto/actualizar-oferta.dto.js';
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto.js';
export declare class EmpresasController {
    private readonly empresasService;
    constructor(empresasService: EmpresasService);
    obtenerPerfil(request: any): Promise<{
        nombreEmpresa: string;
        nit: string;
        sector: string;
    }>;
    crearOferta(request: any, dto: CrearOfertaDto, imagen?: any): Promise<{
        id: string;
        estado: string;
        empresaId: string;
        titulo: string;
        descripcion: string;
        perfilBuscado: import("../../generated/prisma/enums.js").PerfilBuscado;
        modalidadContratacion: import("../../generated/prisma/enums.js").ModalidadContratacion;
        ubicacion: string;
        funciones: string;
        fechaInicioConvocatoria: Date;
        fechaFinConvocatoria: Date;
        fechaInicioPractica: Date;
        duracionMeses: number;
        imagenUrl: string | null;
        fechaPublicacion: Date;
    }>;
    listarOfertas(request: any): Promise<({
        _count: {
            postulaciones: number;
        };
    } & {
        id: string;
        estado: string;
        empresaId: string;
        titulo: string;
        descripcion: string;
        perfilBuscado: import("../../generated/prisma/enums.js").PerfilBuscado;
        modalidadContratacion: import("../../generated/prisma/enums.js").ModalidadContratacion;
        ubicacion: string;
        funciones: string;
        fechaInicioConvocatoria: Date;
        fechaFinConvocatoria: Date;
        fechaInicioPractica: Date;
        duracionMeses: number;
        imagenUrl: string | null;
        fechaPublicacion: Date;
    })[]>;
    listarPostulantes(request: any, ofertaId: string): Promise<{
        tieneHojaVida: boolean;
        id: string;
        estado: string;
        observacionesEmpresa: string | null;
        fecha: Date;
        updatedAt: Date;
        estudiante: {
            codigo: string;
            programa: string;
            semestre: number | null;
            usuario: {
                email: string;
                nombre: string;
            };
        };
    }[]>;
    actualizarPostulacion(request: any, postulacionId: string, dto: ActualizarPostulacionDto): Promise<{
        id: string;
        estado: string;
        observacionesEmpresa: string | null;
        updatedAt: Date;
    }>;
    descargarHojaVida(request: any, postulacionId: string, response: Response): Promise<StreamableFile>;
    actualizarOferta(request: any, id: string, dto: ActualizarOfertaDto, imagen?: any): Promise<{
        id: string;
        estado: string;
        empresaId: string;
        titulo: string;
        descripcion: string;
        perfilBuscado: import("../../generated/prisma/enums.js").PerfilBuscado;
        modalidadContratacion: import("../../generated/prisma/enums.js").ModalidadContratacion;
        ubicacion: string;
        funciones: string;
        fechaInicioConvocatoria: Date;
        fechaFinConvocatoria: Date;
        fechaInicioPractica: Date;
        duracionMeses: number;
        imagenUrl: string | null;
        fechaPublicacion: Date;
    }>;
    eliminarOferta(request: any, id: string): Promise<{
        eliminado: boolean;
    }>;
}
