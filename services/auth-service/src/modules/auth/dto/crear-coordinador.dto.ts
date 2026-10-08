import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PASSWORD_MENSAJE, PASSWORD_REGEX } from './password.validation.js';

export class CrearCoordinadorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15)
  @Matches(PASSWORD_REGEX, { message: PASSWORD_MENSAJE })
  password: string;
}
