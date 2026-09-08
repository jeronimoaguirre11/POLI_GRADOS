import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        nombre: string;
        rol: import("../../generated/prisma/enums.js").Rol;
        createdAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        usuario: {
            id: string;
            email: string;
            nombre: string;
            rol: import("../../generated/prisma/enums.js").Rol;
            createdAt: Date;
        };
        token: string;
    }>;
}
