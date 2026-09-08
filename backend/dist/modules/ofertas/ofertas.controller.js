var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get, UseGuards } from '@nestjs/common';
import { OfertasService } from './ofertas.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
let OfertasController = class OfertasController {
    ofertasService;
    constructor(ofertasService) {
        this.ofertasService = ofertasService;
    }
    async listarAbiertas() {
        return this.ofertasService.listarAbiertas();
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OfertasController.prototype, "listarAbiertas", null);
OfertasController = __decorate([
    Controller('ofertas'),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [OfertasService])
], OfertasController);
export { OfertasController };
//# sourceMappingURL=ofertas.controller.js.map