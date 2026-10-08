import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AsignarEstudianteDto {
  @IsUUID()
  docenteId: string;

  @IsString()
  @IsNotEmpty()
  estudianteId: string;
}