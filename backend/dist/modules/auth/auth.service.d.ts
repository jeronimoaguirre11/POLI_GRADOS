import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        email: string;
        nombre: string;
        rol: import("../../generated/prisma/enums.js").Rol;
        id: string;
        createdAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        usuario: {
            email: string;
            nombre: string;
            rol: import("../../generated/prisma/enums.js").Rol;
            id: string;
            createdAt: Date;
        };
        token: string;
    }>;
}
