import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { MODALIDADES_CONTRATACION, PERFILES_BUSCADOS } from './constantes.js';

export class CrearOfertaDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsIn(PERFILES_BUSCADOS)
  perfilBuscado!: (typeof PERFILES_BUSCADOS)[number];

  @IsIn(MODALIDADES_CONTRATACION)
  modalidadContratacion!: (typeof MODALIDADES_CONTRATACION)[number];

  @IsString()
  @IsNotEmpty()
  ubicacion!: string;

  @IsString()
  @IsNotEmpty()
  funciones!: string;

  @Type(() => Date)
  @IsDate()
  fechaInicioConvocatoria!: Date;

  @Type(() => Date)
  @IsDate()
  fechaFinConvocatoria!: Date;

  @Type(() => Date)
  @IsDate()
  fechaInicioPractica!: Date;

  @Type(() => Number)
  @IsInt()
  @Min(4)
  @Max(6)
  duracionMeses!: number;
}
