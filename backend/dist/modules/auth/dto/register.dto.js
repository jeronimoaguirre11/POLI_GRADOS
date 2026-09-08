var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength, } from 'class-validator';
import { Type } from 'class-transformer';
export class RegisterDto {
    email;
    password;
    nombre;
    rol;
    nombreEmpresa;
    nit;
    sector;
    codigo;
    programa;
    semestre;
}
__decorate([
    IsEmail(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    IsString(),
    MinLength(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "nombre", void 0);
__decorate([
    IsIn(['ESTUDIANTE', 'EMPRESA', 'COORDINADOR', 'DOCENTE']),
    __metadata("design:type", String)
], RegisterDto.prototype, "rol", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "nombreEmpresa", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "nit", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "sector", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "codigo", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "programa", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], RegisterDto.prototype, "semestre", void 0);
//# sourceMappingURL=register.dto.js.map