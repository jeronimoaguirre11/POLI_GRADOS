import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PASSWORD_MENSAJE, PASSWORD_REGEX } from './validaciones.js';

// Datos comunes a todas las cuentas. Se usa tal cual para coordinadores y
// super administradores, y como base de los demas perfiles.
export class CrearCuentaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsEmail({}, { message: 'El correo no es válido' })
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, { message: 'La contraseña no puede tener más de 15 caracteres' })
  @Matches(PASSWORD_REGEX, { message: PASSWORD_MENSAJE })
  password: string;
}
