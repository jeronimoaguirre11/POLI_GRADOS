import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CrearDocenteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  identificacion: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  programa?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  especialidad?: string;
}