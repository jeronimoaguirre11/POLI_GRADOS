import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { MODALIDADES_CONTRATACION, PERFILES_BUSCADOS } from './constantes.js';

export class ActualizarOfertaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  titulo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsIn(PERFILES_BUSCADOS)
  perfilBuscado?: (typeof PERFILES_BUSCADOS)[number];

  @IsOptional()
  @IsIn(MODALIDADES_CONTRATACION)
  modalidadContratacion?: (typeof MODALIDADES_CONTRATACION)[number];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  funciones?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaInicioConvocatoria?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaFinConvocatoria?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaInicioPractica?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(4)
  @Max(6)
  duracionMeses?: number;
}
