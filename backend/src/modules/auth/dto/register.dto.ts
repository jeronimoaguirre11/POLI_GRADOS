import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsIn(['ESTUDIANTE', 'EMPRESA', 'COORDINADOR', 'DOCENTE'])
  rol: 'ESTUDIANTE' | 'EMPRESA' | 'COORDINADOR' | 'DOCENTE';

  // Requeridos solo cuando rol === 'EMPRESA': se usan para crear el perfil
  // de Empresa asociado al Usuario (ver AuthService.register).
  @IsOptional()
  @IsString()
  nombreEmpresa?: string;

  @IsOptional()
  @IsString()
  nit?: string;

  @IsOptional()
  @IsString()
  sector?: string;
}
