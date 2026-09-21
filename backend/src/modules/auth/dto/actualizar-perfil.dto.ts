import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class ActualizarPerfilDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  // Solo se exige si se envia email o password nuevo (se valida en el service).
  @IsOptional()
  @IsString()
  passwordActual?: string;
}
