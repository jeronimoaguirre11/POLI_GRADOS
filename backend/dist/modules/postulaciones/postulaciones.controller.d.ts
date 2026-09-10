import { PostulacionesService } from './postulaciones.service.js';
import { CrearPostulacionDto } from './dto/crear-postulacion.dto.js';
export declare class PostulacionesController {
    private readonly postulacionesService;
    constructor(postulacionesService: PostulacionesService);
    postularse(request: any, dto: CrearPostulacionDto, hojaVida?: any): Promise<{
        id: string;
        estudianteId: string;
        estado: string;
        ofertaId: string;
        hojaVidaUrl: string;
        observacionesEmpresa: string | null;
        fecha: Date;
        updatedAt: Date;
    }>;
    listarMias(request: any): Promise<{
        id: string;
        estado: string;
        ofertaId: string;
        fecha: Date;
        updatedAt: Date;
        oferta: {
            titulo: string;
            perfilBuscado: import("../../generated/prisma/enums.js").PerfilBuscado;
            modalidadContratacion: import("../../generated/prisma/enums.js").ModalidadContratacion;
            ubicacion: string;
            empresa: {
                nombreEmpresa: string;
                sector: string;
            };
        };
    }[]>;
    cancelar(request: any, id: string): Promise<{
        eliminado: boolean;
    }>;
}
