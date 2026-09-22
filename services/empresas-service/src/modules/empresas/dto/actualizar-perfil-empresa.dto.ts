import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarPerfilEmpresaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombreEmpresa?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sector?: string;
}
