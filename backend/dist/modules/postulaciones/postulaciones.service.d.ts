import { PrismaService } from '../prisma/prisma.service.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';
export declare class PostulacionesService {
    private readonly prisma;
    private readonly directorioHojasVida;
    constructor(prisma: PrismaService);
    private asegurarRolEstudiante;
    private obtenerEstudianteDelUsuario;
    private guardarHojaVida;
    postularse(payload: JwtPayload, ofertaId: string, hojaVida: any): Promise<{
        id: string;
        estudianteId: string;
        estado: string;
        ofertaId: string;
        hojaVidaUrl: string;
        observacionesEmpresa: string | null;
        fecha: Date;
        updatedAt: Date;
    }>;
    listarMias(payload: JwtPayload): Promise<{
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
    cancelarPostulacion(payload: JwtPayload, postulacionId: string): Promise<{
        eliminado: boolean;
    }>;
}
