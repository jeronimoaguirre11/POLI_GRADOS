import { IsBoolean } from 'class-validator';

export class CambiarEstadoCuentaDto {
  @IsBoolean()
  activo: boolean;
}
