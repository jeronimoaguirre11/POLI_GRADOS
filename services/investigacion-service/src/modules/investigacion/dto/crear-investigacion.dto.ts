import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CrearInvestigacionDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsInt()
  @Min(1)
  duracionMeses!: number;

  @IsString()
  @IsNotEmpty()
  metodologia!: string;

  @IsString()
  @IsNotEmpty()
  objetivos!: string;

  @IsString()
  @IsNotEmpty()
  sector!: string;

  @IsString()
  @IsNotEmpty()
  resumen!: string;
}
