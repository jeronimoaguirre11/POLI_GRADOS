import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// Datos del perfil que el super administrador puede editar. Cada rol usa solo
// algunos campos (ver CAMPOS_PERFIL en administracion.service.ts):
//   ESTUDIANTE: codigo, programa, semestre
//   DOCENTE:    identificacion, programa, especialidad
//   EMPRESA:    nombreEmpresa, nit, sector
export class ActualizarPerfilDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  programa?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  semestre?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  identificacion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  especialidad?: string;

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
