import { PrismaService } from '../prisma/prisma.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { ActualizarOfertaDto } from './dto/actualizar-oferta.dto.js';
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';
export declare class EmpresasService {
    private readonly prisma;
    private readonly directorioImagenes;
    private readonly directorioHojasVida;
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
    listarOfertas(payload: JwtPayload): Promise<({
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
    listarPostulantes(payload: JwtPayload, ofertaId: string): Promise<{
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
    actualizarPostulacion(payload: JwtPayload, postulacionId: string, dto: ActualizarPostulacionDto): Promise<{
        id: string;
        estado: string;
        observacionesEmpresa: string | null;
        updatedAt: Date;
    }>;
    obtenerHojaVida(payload: JwtPayload, postulacionId: string): Promise<{
        contenido: NonSharedBuffer;
        mimeType: string;
        nombreArchivo: string;
    }>;
    actualizarOferta(payload: JwtPayload, ofertaId: string, dto: ActualizarOfertaDto, imagen?: any): Promise<{
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
    eliminarOferta(payload: JwtPayload, ofertaId: string): Promise<{
        eliminado: boolean;
    }>;
}
