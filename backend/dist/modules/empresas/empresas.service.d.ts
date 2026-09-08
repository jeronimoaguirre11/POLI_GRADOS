import { PrismaService } from '../prisma/prisma.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { ActualizarOfertaDto } from './dto/actualizar-oferta.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';
export declare class EmpresasService {
    private readonly prisma;
    private readonly directorioImagenes;
    constructor(prisma: PrismaService);
    private asegurarRolEmpresa;
    private obtenerEmpresaDelUsuario;
    private obtenerOfertaPropia;
    private guardarImagenOferta;
    obtenerPerfil(payload: JwtPayload): Promise<{
        nombreEmpresa: string;
        nit: string;
        sector: string;
    }>;
    crearOferta(payload: JwtPayload, dto: CrearOfertaDto, imagen?: any): Promise<{
        id: string;
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
        empresaId: string;
        imagenUrl: string | null;
        estado: string;
        fechaPublicacion: Date;
    }>;
    listarOfertas(payload: JwtPayload): Promise<{
        id: string;
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
        empresaId: string;
        imagenUrl: string | null;
        estado: string;
        fechaPublicacion: Date;
    }[]>;
    actualizarOferta(payload: JwtPayload, ofertaId: string, dto: ActualizarOfertaDto, imagen?: any): Promise<{
        id: string;
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
        empresaId: string;
        imagenUrl: string | null;
        estado: string;
        fechaPublicacion: Date;
    }>;
    eliminarOferta(payload: JwtPayload, ofertaId: string): Promise<{
        eliminado: boolean;
    }>;
}
