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
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmpresasService } from './empresas.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { ActualizarOfertaDto } from './dto/actualizar-oferta.dto.js';
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
let EmpresasController = class EmpresasController {
    empresasService;
    constructor(empresasService) {
        this.empresasService = empresasService;
    }
    async obtenerPerfil(request) {
        return this.empresasService.obtenerPerfil(request.user);
    }
    async crearOferta(request, dto, imagen) {
        return this.empresasService.crearOferta(request.user, dto, imagen);
    }
    async listarOfertas(request) {
        return this.empresasService.listarOfertas(request.user);
    }
    async listarPostulantes(request, ofertaId) {
        return this.empresasService.listarPostulantes(request.user, ofertaId);
    }
    async actualizarPostulacion(request, postulacionId, dto) {
        return this.empresasService.actualizarPostulacion(request.user, postulacionId, dto);
    }
    async descargarHojaVida(request, postulacionId, response) {
        const archivo = await this.empresasService.obtenerHojaVida(request.user, postulacionId);
        response.set({
            'Content-Type': archivo.mimeType,
            'Content-Disposition': `attachment; filename="${archivo.nombreArchivo}"`,
            'Cache-Control': 'private, no-store',
        });
        return new StreamableFile(archivo.contenido);
    }
    async actualizarOferta(request, id, dto, imagen) {
        return this.empresasService.actualizarOferta(request.user, id, dto, imagen);
    }
    async eliminarOferta(request, id) {
        return this.empresasService.eliminarOferta(request.user, id);
    }
};
__decorate([
    Get('perfil'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "obtenerPerfil", null);
__decorate([
    Post('ofertas'),
    UseInterceptors(FileInterceptor('imagen')),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CrearOfertaDto, Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "crearOferta", null);
__decorate([
    Get('ofertas'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "listarOfertas", null);
__decorate([
    Get('ofertas/:id/postulaciones'),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "listarPostulantes", null);
__decorate([
    Patch('postulaciones/:id'),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ActualizarPostulacionDto]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "actualizarPostulacion", null);
__decorate([
    Get('postulaciones/:id/hoja-vida'),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "descargarHojaVida", null);
__decorate([
    Patch('ofertas/:id'),
    UseInterceptors(FileInterceptor('imagen')),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __param(3, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ActualizarOfertaDto, Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "actualizarOferta", null);
__decorate([
    Delete('ofertas/:id'),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "eliminarOferta", null);
EmpresasController = __decorate([
    Controller('empresas'),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [EmpresasService])
], EmpresasController);
export { EmpresasController };
//# sourceMappingURL=empresas.controller.js.map