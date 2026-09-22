import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

// Al menos una mayuscula y un numero. Se repite igual en
// ActualizarPerfilDto y en el formulario de registro/editar-perfil del
// frontend, para que la regla sea la misma en todos lados.
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/;
const PASSWORD_MENSAJE =
  'La contraseña debe tener al menos una letra mayúscula y un número';

export class RegisterDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15)
  @Matches(PASSWORD_REGEX, { message: PASSWORD_MENSAJE })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsIn(['ESTUDIANTE', 'EMPRESA', 'COORDINADOR', 'DOCENTE'])
  rol: 'ESTUDIANTE' | 'EMPRESA' | 'COORDINADOR' | 'DOCENTE';

  // Requeridos solo cuando rol === 'EMPRESA': se envian a empresas-service
  // para crear el perfil de Empresa asociado (ver AuthService.register).
  @IsOptional()
  @IsString()
  @MaxLength(150)
  nombreEmpresa?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  nit?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  sector?: string;

  // Requeridos solo cuando rol === 'ESTUDIANTE': se envian a
  // estudiantes-service para crear el perfil de Estudiante asociado.
  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigo?: string;

  @IsOptional()
  @IsString()
  programa?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  semestre?: number;
}
