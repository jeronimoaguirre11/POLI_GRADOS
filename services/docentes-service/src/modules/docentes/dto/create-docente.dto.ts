import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDocenteDto {
  @IsUUID()
  @IsNotEmpty()
  usuarioId: string;

  @IsString()
  @IsNotEmpty()
  identificacion: string;

  @IsString()
  @IsOptional()
  programa?: string;

  @IsString()
  @IsOptional()
  especialidad?: string;
}