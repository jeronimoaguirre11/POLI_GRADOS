import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { IngresarEmpresaDto } from './dto/ingresar-empresa.dto.js';
import { EmpresasService } from './empresas.service.js';
export declare class EmpresasController {
    private readonly empresasService;
    constructor(empresasService: EmpresasService);
    ingresar(dto: IngresarEmpresaDto): import("../generated/prisma/models.js").Prisma__EmpresaClient<{
        email: string;
        nombre: string;
        id: number;
        nit: string | null;
        sector: string | null;
        creadoEn: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    crearOferta(empresaId: number, dto: CrearOfertaDto): Promise<{
        titulo: string;
        perfilBuscado: string;
        descripcion: string | null;
        id: number;
        creadoEn: Date;
        estado: import("../generated/prisma/enums.js").EstadoOferta;
        empresaId: number;
    }>;
    listarOfertas(empresaId: number): Promise<{
        titulo: string;
        perfilBuscado: string;
        descripcion: string | null;
        id: number;
        creadoEn: Date;
        estado: import("../generated/prisma/enums.js").EstadoOferta;
        empresaId: number;
    }[]>;
}
