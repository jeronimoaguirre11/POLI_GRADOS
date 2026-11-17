import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_MENSAJE, PASSWORD_REGEX } from './validaciones.js';

export class RestablecerPasswordDto {
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, { message: 'La contraseña no puede tener más de 15 caracteres' })
  @Matches(PASSWORD_REGEX, { message: PASSWORD_MENSAJE })
  password: string;
}
