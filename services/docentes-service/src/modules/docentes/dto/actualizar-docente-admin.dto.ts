import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// Edicion que hace el super administrador (via administracion-service).
// Programa y especialidad vacios ("") se guardan como sin dato.
export class ActualizarDocenteAdminDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  identificacion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  programa?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  especialidad?: string;
}
