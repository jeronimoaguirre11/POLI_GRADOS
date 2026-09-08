var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
let EmpresasController = class EmpresasController {
    empresasService;
    constructor(empresasService) {
        this.empresasService = empresasService;
    }
    async crearOferta(request, dto) {
        return this.empresasService.crearOferta(request.user, dto);
    }
    async listarOfertas(request) {
        return this.empresasService.listarOfertas(request.user);
    }
};
__decorate([
    Post('ofertas'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CrearOfertaDto]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "crearOferta", null);
__decorate([
    Get('ofertas'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "listarOfertas", null);
EmpresasController = __decorate([
    Controller('empresas'),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [EmpresasService])
], EmpresasController);
export { EmpresasController };
//# sourceMappingURL=empresas.controller.js.map