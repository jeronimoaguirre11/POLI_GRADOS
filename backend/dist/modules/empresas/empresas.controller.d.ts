import { EmpresasService } from './empresas.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
export declare class EmpresasController {
    private readonly empresasService;
    constructor(empresasService: EmpresasService);
    crearOferta(request: any, dto: CrearOfertaDto): Promise<any>;
    listarOfertas(request: any): Promise<any>;
}
