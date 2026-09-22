import { IsNotEmpty, IsString } from 'class-validator';

// La usa unicamente auth-service (ruta interna), al registrar una cuenta
// con rol EMPRESA.
export class CrearEmpresaDto {
  @IsString()
  @IsNotEmpty()
  usuarioId!: string;

  @IsString()
  @IsNotEmpty()
  nombreEmpresa!: string;

  @IsString()
  @IsNotEmpty()
  nit!: string;

  @IsString()
  @IsNotEmpty()
  sector!: string;
}
