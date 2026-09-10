import { OfertasService } from './ofertas.service.js';
export declare class OfertasController {
    private readonly ofertasService;
    constructor(ofertasService: OfertasService);
    listarAbiertas(): Promise<({
        empresa: {
            nombreEmpresa: string;
            sector: string;
        };
    } & {
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
        estado: string;
        empresaId: string;
        imagenUrl: string | null;
        fechaPublicacion: Date;
    })[]>;
}
