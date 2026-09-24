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
import { PASSWORD_MENSAJE, PASSWORD_REGEX } from './password.validation.js';

// Regla compartida con ActualizarPerfilDto y CrearCoordinadorDto para que
// todas las contraseñas creadas por el backend tengan la misma fortaleza.

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

  // El registro publico solo crea los dos tipos de cuenta de autoservicio.
  // Coordinadores y docentes requieren un canal administrativo interno.
  @IsIn(['ESTUDIANTE', 'EMPRESA'])
  rol: 'ESTUDIANTE' | 'EMPRESA';

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
