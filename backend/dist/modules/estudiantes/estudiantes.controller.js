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
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service.js';
import { ActualizarPerfilEstudianteDto } from './dto/actualizar-perfil-estudiante.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
let EstudiantesController = class EstudiantesController {
    estudiantesService;
    constructor(estudiantesService) {
        this.estudiantesService = estudiantesService;
    }
    async obtenerPerfil(request) {
        return this.estudiantesService.obtenerPerfil(request.user);
    }
    async actualizarPerfil(request, dto) {
        return this.estudiantesService.actualizarPerfil(request.user, dto);
    }
};
__decorate([
    Get('perfil'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "obtenerPerfil", null);
__decorate([
    Patch('perfil'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ActualizarPerfilEstudianteDto]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "actualizarPerfil", null);
EstudiantesController = __decorate([
    Controller('estudiantes'),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [EstudiantesService])
], EstudiantesController);
export { EstudiantesController };
//# sourceMappingURL=estudiantes.controller.js.map