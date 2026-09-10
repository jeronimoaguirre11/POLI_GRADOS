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
        hojaVidaUrl: string;
        estado: string;
        observacionesEmpresa: string | null;
        fecha: Date;
        updatedAt: Date;
        ofertaId: string;
        estudianteId: string;
    }>;
    listarMias(payload: JwtPayload): Promise<{
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
    cancelarPostulacion(payload: JwtPayload, postulacionId: string): Promise<{
        eliminado: boolean;
    }>;
}
