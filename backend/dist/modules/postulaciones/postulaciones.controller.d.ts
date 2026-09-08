import { PostulacionesService } from './postulaciones.service.js';
import { CrearPostulacionDto } from './dto/crear-postulacion.dto.js';
export declare class PostulacionesController {
    private readonly postulacionesService;
    constructor(postulacionesService: PostulacionesService);
    postularse(request: any, dto: CrearPostulacionDto, hojaVida?: any): Promise<{
        id: string;
        estado: string;
        hojaVidaUrl: string;
        fecha: Date;
        ofertaId: string;
        estudianteId: string;
    }>;
    listarMias(request: any): Promise<({
        oferta: {
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
            empresaId: string;
            imagenUrl: string | null;
            estado: string;
            fechaPublicacion: Date;
        };
    } & {
        id: string;
        estado: string;
        hojaVidaUrl: string;
        fecha: Date;
        ofertaId: string;
        estudianteId: string;
    })[]>;
    cancelar(request: any, id: string): Promise<{
        eliminado: boolean;
    }>;
}
