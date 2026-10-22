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
import { CrearCuentaDto } from './crear-cuenta.dto.js';
import { PROGRAMAS } from './validaciones.js';

export class CrearEstudianteDto extends CrearCuentaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo: string;

  @IsIn(PROGRAMAS, { message: 'Selecciona un programa válido' })
  programa: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  semestre?: number;
}
