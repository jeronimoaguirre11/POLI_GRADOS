import { IsDate, IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import type {
  PerfilBuscado,
  ModalidadContratacion,
} from '../../../generated/prisma/enums.js';
import { PERFILES_BUSCADOS, MODALIDADES_CONTRATACION } from './constantes.js';

export class CrearOfertaDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsIn(PERFILES_BUSCADOS)
  perfilBuscado!: PerfilBuscado;

  @IsIn(MODALIDADES_CONTRATACION)
  modalidadContratacion!: ModalidadContratacion;

  @IsString()
  @IsNotEmpty()
  ubicacion!: string;

  @IsString()
  @IsNotEmpty()
  funciones!: string;

  // Los <input type="date"> del formulario mandan solo "2026-09-08" (sin
  // hora). @Type(() => Date) lo convierte a un Date real antes de que
  // Prisma lo reciba, porque exige una fecha-hora ISO completa.
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
