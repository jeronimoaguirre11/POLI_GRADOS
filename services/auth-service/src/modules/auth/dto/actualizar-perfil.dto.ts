import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PASSWORD_MENSAJE, PASSWORD_REGEX } from './password.validation.js';

// Misma regla compartida que en RegisterDto: mayuscula, numero y 8-15 chars.

export class ActualizarPerfilDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nombre?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15)
  @Matches(PASSWORD_REGEX, { message: PASSWORD_MENSAJE })
  password?: string;

  // Solo se exige si se envia email o password nuevo (se valida en el service).
  @IsOptional()
  @IsString()
  passwordActual?: string;
}
