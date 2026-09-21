import { EstudiantesService } from './estudiantes.service.js';
import { ActualizarPerfilEstudianteDto } from './dto/actualizar-perfil-estudiante.dto.js';
export declare class EstudiantesController {
    private readonly estudiantesService;
    constructor(estudiantesService: EstudiantesService);
    obtenerPerfil(request: any): Promise<{
        codigo: string;
        programa: string;
        semestre: number | null;
    }>;
    actualizarPerfil(request: any, dto: ActualizarPerfilEstudianteDto): Promise<{
        id: string;
        usuarioId: string;
        codigo: string;
        programa: string;
        semestre: number | null;
    }>;
}
