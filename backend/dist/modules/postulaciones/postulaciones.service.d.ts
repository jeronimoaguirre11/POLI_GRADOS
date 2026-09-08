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
        estado: string;
        hojaVidaUrl: string;
        fecha: Date;
        ofertaId: string;
        estudianteId: string;
    }>;
    listarMias(payload: JwtPayload): Promise<({
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
    cancelarPostulacion(payload: JwtPayload, postulacionId: string): Promise<{
        eliminado: boolean;
    }>;
}
