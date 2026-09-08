import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearOfertaDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  perfilBuscado!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
