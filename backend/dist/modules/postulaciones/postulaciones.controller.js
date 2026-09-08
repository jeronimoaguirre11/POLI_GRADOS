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
import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostulacionesService } from './postulaciones.service.js';
import { CrearPostulacionDto } from './dto/crear-postulacion.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
let PostulacionesController = class PostulacionesController {
    postulacionesService;
    constructor(postulacionesService) {
        this.postulacionesService = postulacionesService;
    }
    async postularse(request, dto, hojaVida) {
        return this.postulacionesService.postularse(request.user, dto.ofertaId, hojaVida);
    }
    async listarMias(request) {
        return this.postulacionesService.listarMias(request.user);
    }
    async cancelar(request, id) {
        return this.postulacionesService.cancelarPostulacion(request.user, id);
    }
};
__decorate([
    Post(),
    UseInterceptors(FileInterceptor('hojaVida')),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CrearPostulacionDto, Object]),
    __metadata("design:returntype", Promise)
], PostulacionesController.prototype, "postularse", null);
__decorate([
    Get('mias'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostulacionesController.prototype, "listarMias", null);
__decorate([
    Delete(':id'),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostulacionesController.prototype, "cancelar", null);
PostulacionesController = __decorate([
    Controller('postulaciones'),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [PostulacionesService])
], PostulacionesController);
export { PostulacionesController };
//# sourceMappingURL=postulaciones.controller.js.map