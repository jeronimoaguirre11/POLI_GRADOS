import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CrearCuentaDto } from './crear-cuenta.dto.js';

export class CrearEmpresaDto extends CrearCuentaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombreEmpresa: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  nit: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  sector: string;
}
