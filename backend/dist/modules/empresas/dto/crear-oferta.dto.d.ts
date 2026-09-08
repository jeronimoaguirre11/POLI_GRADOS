import type { PerfilBuscado, ModalidadContratacion } from '../../../generated/prisma/enums.js';
export declare class CrearOfertaDto {
    titulo: string;
    descripcion: string;
    perfilBuscado: PerfilBuscado;
    modalidadContratacion: ModalidadContratacion;
    ubicacion: string;
    funciones: string;
    fechaInicioConvocatoria: Date;
    fechaFinConvocatoria: Date;
    fechaInicioPractica: Date;
    duracionMeses: number;
}
