import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CrearCuentaDto } from './crear-cuenta.dto.js';

export class CrearDocenteDto extends CrearCuentaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  identificacion: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  programa?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  especialidad?: string;
}
