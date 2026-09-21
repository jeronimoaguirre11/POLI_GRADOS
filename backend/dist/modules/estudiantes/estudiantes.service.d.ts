import { PrismaService } from '../prisma/prisma.service.js';
import { ActualizarPerfilEstudianteDto } from './dto/actualizar-perfil-estudiante.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';
export declare class EstudiantesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private asegurarRolEstudiante;
    private obtenerEstudianteDelUsuario;
    obtenerPerfil(payload: JwtPayload): Promise<{
        codigo: string;
        programa: string;
        semestre: number | null;
    }>;
    actualizarPerfil(payload: JwtPayload, dto: ActualizarPerfilEstudianteDto): Promise<{
        id: string;
        usuarioId: string;
        codigo: string;
        programa: string;
        semestre: number | null;
    }>;
}
