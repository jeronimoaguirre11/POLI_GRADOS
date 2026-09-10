import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
