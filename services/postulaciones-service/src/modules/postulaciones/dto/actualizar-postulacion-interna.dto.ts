import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export const ESTADOS_POSTULACION = [
  'PENDIENTE',
  'EN_REVISION',
  'PRESELECCIONADO',
  'RECHAZADO',
  'SELECCIONADO',
] as const;

export type EstadoPostulacion = (typeof ESTADOS_POSTULACION)[number];

// La usa unicamente empresas-service (ruta interna), despues de validar que
// la empresa sea dueña de la oferta de esta postulacion.
export class ActualizarPostulacionInternaDto {
  @IsOptional()
  @IsIn(ESTADOS_POSTULACION)
  estado?: EstadoPostulacion;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  observacionesEmpresa?: string;
}
