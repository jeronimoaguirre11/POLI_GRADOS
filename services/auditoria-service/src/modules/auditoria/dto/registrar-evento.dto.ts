import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// Evento que envian el gateway y auth-service por la ruta interna.
export class RegistrarEventoDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  usuarioId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  rol?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  accion: string;

  @IsString()
  @MaxLength(10)
  metodo: string;

  @IsString()
  @MaxLength(300)
  ruta: string;

  @IsString()
  @MaxLength(40)
  servicio: string;

  @IsInt()
  estado: number;

  @IsBoolean()
  exito: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  ip?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  detalle?: string;
}
