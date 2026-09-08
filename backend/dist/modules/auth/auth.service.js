var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existente = await this.prisma.usuario.findUnique({
            where: { email: dto.email },
        });
        if (existente) {
            throw new ConflictException('Ya existe un usuario con ese email');
        }
        if (dto.rol === 'EMPRESA' && (!dto.nombreEmpresa || !dto.nit || !dto.sector)) {
            throw new BadRequestException('Para registrar una cuenta de empresa se requiere nombreEmpresa, nit y sector');
        }
        const passwordHasheada = await bcrypt.hash(dto.password, 10);
        const usuario = await this.prisma.$transaction(async (tx) => {
            const nuevoUsuario = await tx.usuario.create({
                data: {
                    email: dto.email,
                    password: passwordHasheada,
                    nombre: dto.nombre,
                    rol: dto.rol,
                },
            });
            if (dto.rol === 'EMPRESA') {
                await tx.empresa.create({
                    data: {
                        usuarioId: nuevoUsuario.id,
                        nombreEmpresa: dto.nombreEmpresa,
                        nit: dto.nit,
                        sector: dto.sector,
                    },
                });
            }
            return nuevoUsuario;
        });
        const { password, ...usuarioSinPassword } = usuario;
        return usuarioSinPassword;
    }
    async login(dto) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: dto.email },
        });
        if (!usuario) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const passwordValida = await bcrypt.compare(dto.password, usuario.password);
        if (!passwordValida) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
        const token = await this.jwtService.signAsync(payload);
        const { password: _, ...usuarioSinPassword } = usuario;
        return { usuario: usuarioSinPassword, token };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map