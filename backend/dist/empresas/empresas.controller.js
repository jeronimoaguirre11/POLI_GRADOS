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
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { IngresarEmpresaDto } from './dto/ingresar-empresa.dto.js';
import { EmpresasService } from './empresas.service.js';
let EmpresasController = class EmpresasController {
    empresasService;
    constructor(empresasService) {
        this.empresasService = empresasService;
    }
    ingresar(dto) {
        return this.empresasService.ingresar(dto);
    }
    crearOferta(empresaId, dto) {
        return this.empresasService.crearOferta(empresaId, dto);
    }
    listarOfertas(empresaId) {
        return this.empresasService.listarOfertas(empresaId);
    }
};
__decorate([
    Post('ingresar'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [IngresarEmpresaDto]),
    __metadata("design:returntype", void 0)
], EmpresasController.prototype, "ingresar", null);
__decorate([
    Post(':empresaId/ofertas'),
    __param(0, Param('empresaId', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CrearOfertaDto]),
    __metadata("design:returntype", void 0)
], EmpresasController.prototype, "crearOferta", null);
__decorate([
    Get(':empresaId/ofertas'),
    __param(0, Param('empresaId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpresasController.prototype, "listarOfertas", null);
EmpresasController = __decorate([
    Controller('empresas'),
    __metadata("design:paramtypes", [EmpresasService])
], EmpresasController);
export { EmpresasController };
//# sourceMappingURL=empresas.controller.js.map