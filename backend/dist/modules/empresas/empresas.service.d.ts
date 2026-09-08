import { PrismaService } from '../prisma/prisma.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import type { JwtPayload } from './guards/jwt-auth.guard.js';
export declare class EmpresasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private asegurarRolEmpresa;
    private obtenerEmpresaDelUsuario;
    crearOferta(payload: JwtPayload, dto: CrearOfertaDto): Promise<any>;
    listarOfertas(payload: JwtPayload): Promise<any>;
}
