import { IsDate, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import type {
  PerfilBuscado,
  ModalidadContratacion,
} from '../../../generated/prisma/enums.js';
import { PERFILES_BUSCADOS, MODALIDADES_CONTRATACION } from './constantes.js';

// Igual que CrearOfertaDto pero con todo opcional: el formulario de edicion
// solo manda los campos que cambiaron (o todos de nuevo, no importa).
export class ActualizarOfertaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsIn(PERFILES_BUSCADOS)
  perfilBuscado?: PerfilBuscado;

  @IsOptional()
  @IsIn(MODALIDADES_CONTRATACION)
  modalidadContratacion?: ModalidadContratacion;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
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
