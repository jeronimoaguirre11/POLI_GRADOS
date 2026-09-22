import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// Solo la usa auth-service (ruta interna), justo despues de crear el
// Usuario, para crear el perfil de Estudiante asociado.
export class CrearEstudianteDto {
  @IsString()
  @IsNotEmpty()
  usuarioId: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  programa: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  semestre?: number;
}
