import { EmpresasService } from './empresas.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { ActualizarOfertaDto } from './dto/actualizar-oferta.dto.js';
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
    listarOfertas(request: any): Promise<{
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
    actualizarOferta(request: any, id: string, dto: ActualizarOfertaDto, imagen?: any): Promise<{
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
    eliminarOferta(request: any, id: string): Promise<{
        eliminado: boolean;
    }>;
}
