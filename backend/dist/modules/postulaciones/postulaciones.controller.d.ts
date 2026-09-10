import { PostulacionesService } from './postulaciones.service.js';
import { CrearPostulacionDto } from './dto/crear-postulacion.dto.js';
export declare class PostulacionesController {
    private readonly postulacionesService;
    constructor(postulacionesService: PostulacionesService);
    postularse(request: any, dto: CrearPostulacionDto, hojaVida?: any): Promise<{
        id: string;
        hojaVidaUrl: string;
        estado: string;
        observacionesEmpresa: string | null;
        fecha: Date;
        updatedAt: Date;
        ofertaId: string;
        estudianteId: string;
    }>;
    listarMias(request: any): Promise<{
        id: string;
        estado: string;
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
        ofertaId: string;
    }[]>;
    cancelar(request: any, id: string): Promise<{
        eliminado: boolean;
    }>;
}
