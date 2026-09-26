// src/modules/diplomado/dto/crear-diplomado.dto.ts
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CrearDiplomadoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsDateString()
  fechaInicio!: string;

  @IsInt()
  @Min(1)
  duracionHoras!: number;

  @IsInt()
  @Min(1)
  cuposTotales!: number;
}
