var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDate, IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PERFILES_BUSCADOS, MODALIDADES_CONTRATACION } from './constantes.js';
export class CrearOfertaDto {
    titulo;
    descripcion;
    perfilBuscado;
    modalidadContratacion;
    ubicacion;
    funciones;
    fechaInicioConvocatoria;
    fechaFinConvocatoria;
    fechaInicioPractica;
    duracionMeses;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CrearOfertaDto.prototype, "titulo", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CrearOfertaDto.prototype, "descripcion", void 0);
__decorate([
    IsIn(PERFILES_BUSCADOS),
    __metadata("design:type", String)
], CrearOfertaDto.prototype, "perfilBuscado", void 0);
__decorate([
    IsIn(MODALIDADES_CONTRATACION),
    __metadata("design:type", String)
], CrearOfertaDto.prototype, "modalidadContratacion", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CrearOfertaDto.prototype, "ubicacion", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CrearOfertaDto.prototype, "funciones", void 0);
__decorate([
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], CrearOfertaDto.prototype, "fechaInicioConvocatoria", void 0);
__decorate([
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], CrearOfertaDto.prototype, "fechaFinConvocatoria", void 0);
__decorate([
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], CrearOfertaDto.prototype, "fechaInicioPractica", void 0);
__decorate([
    Type(() => Number),
    IsInt(),
    Min(4),
    Max(6),
    __metadata("design:type", Number)
], CrearOfertaDto.prototype, "duracionMeses", void 0);
//# sourceMappingURL=crear-oferta.dto.js.map