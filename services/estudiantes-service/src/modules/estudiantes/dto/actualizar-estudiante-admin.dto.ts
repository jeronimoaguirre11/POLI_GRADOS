import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PROGRAMAS } from './constantes.js';

// Edicion que hace el super administrador (via administracion-service). A
// diferencia del perfil propio, tambien permite corregir el codigo.
export class ActualizarEstudianteAdminDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo?: string;

  @IsOptional()
  @IsIn(PROGRAMAS, { message: 'Selecciona un programa válido' })
  programa?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  semestre?: number;
}
