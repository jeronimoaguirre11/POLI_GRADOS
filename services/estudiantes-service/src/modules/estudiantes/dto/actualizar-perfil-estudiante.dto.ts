import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PROGRAMAS } from './constantes.js';

export class ActualizarPerfilEstudianteDto {
  @IsOptional()
  @IsIn(PROGRAMAS)
  programa?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  semestre?: number;
}
