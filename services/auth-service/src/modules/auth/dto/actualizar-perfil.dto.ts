import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// Misma regla que en RegisterDto: al menos una mayuscula y un numero.
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/;
const PASSWORD_MENSAJE =
  'La contraseña debe tener al menos una letra mayúscula y un número';

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
