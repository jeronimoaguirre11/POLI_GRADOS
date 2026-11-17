import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// Edicion que hace el super administrador (via administracion-service). A
// diferencia del perfil propio de la empresa, tambien permite corregir el NIT.
export class ActualizarEmpresaAdminDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombreEmpresa?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  nit?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  sector?: string;
}
