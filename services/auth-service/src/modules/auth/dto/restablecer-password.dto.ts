import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_MENSAJE, PASSWORD_REGEX } from './password.validation.js';

// Contrasena nueva que el super administrador asigna a otra cuenta. Misma
// politica que el registro: 8-15 caracteres, una mayuscula y un numero.
export class RestablecerPasswordDto {
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15)
  @Matches(PASSWORD_REGEX, { message: PASSWORD_MENSAJE })
  password: string;
}
