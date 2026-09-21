import { PrismaService } from '../prisma/prisma.service.js';
export declare class OfertasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listarAbiertas(): Promise<({
        empresa: {
            nombreEmpresa: string;
            sector: string;
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
}
