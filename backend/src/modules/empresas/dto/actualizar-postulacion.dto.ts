import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export const ESTADOS_POSTULACION = [
  'PENDIENTE',
  'EN_REVISION',
  'PRESELECCIONADO',
  'RECHAZADO',
  'SELECCIONADO',
] as const;

export type EstadoPostulacion = (typeof ESTADOS_POSTULACION)[number];

export class ActualizarPostulacionDto {
  @IsOptional()
  @IsIn(ESTADOS_POSTULACION)
  estado?: EstadoPostulacion;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  observacionesEmpresa?: string;
}
