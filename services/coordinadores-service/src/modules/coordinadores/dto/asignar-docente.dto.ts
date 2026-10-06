import { IsUUID } from 'class-validator';

export class AsignarDocenteDto {
  @IsUUID()
  docenteId: string;

  @IsUUID()
  estudianteId: string;
}