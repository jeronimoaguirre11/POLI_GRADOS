import { IsIn } from 'class-validator';

export class EvaluarInvestigacionDto {
  @IsIn(['APROBADA', 'RECHAZADA'])
  estado!: 'APROBADA' | 'RECHAZADA';
}
