import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  // Requeridos solo cuando rol === 'ESTUDIANTE': se usan para crear el
  // perfil de Estudiante asociado al Usuario (ver AuthService.register).
  @IsOptional()
  @IsString()
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
