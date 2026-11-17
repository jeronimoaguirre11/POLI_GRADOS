import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class ActualizarCuentaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede quedar vacío' })
  @MaxLength(50)
  nombre?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo no es válido' })
  @MaxLength(50)
  email?: string;
}
