import { IsOptional, IsString } from 'class-validator';

export class UpdateDocenteDto {
  @IsString()
  @IsOptional()
  programa?: string;

  @IsString()
  @IsOptional()
  especialidad?: string;
}