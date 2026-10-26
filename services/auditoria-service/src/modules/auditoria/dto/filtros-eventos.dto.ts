import {
  IsIn,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FiltrosEventosDto {
  // Busca en correo o id del usuario
  @IsOptional()
  @IsString()
  @MaxLength(100)
  usuario?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  rol?: string;

  // Busca en el texto de la accion o en la ruta
  @IsOptional()
  @IsString()
  @MaxLength(100)
  accion?: string;

  @IsOptional()
  @IsIn(['exito', 'error'])
  resultado?: 'exito' | 'error';

  @IsOptional()
  @IsISO8601()
  desde?: string;

  @IsOptional()
  @IsISO8601()
  hasta?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pagina?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  limite?: number;
}
