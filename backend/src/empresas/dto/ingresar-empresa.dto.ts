import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class IngresarEmpresaDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;
}
