import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Datos básicos de la empresa que publica la oferta',
})
export class EmpresaResumen {
  @Field(() => String)
  nombreEmpresa!: string;

  @Field(() => String, { nullable: true })
  sector?: string | null;
}

@ObjectType({ description: 'Oferta de práctica publicada por una empresa' })
export class Oferta {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  empresaId!: string;

  @Field(() => String)
  titulo!: string;

  @Field(() => String, { nullable: true })
  descripcion?: string | null;

  @Field(() => String, { nullable: true })
  perfilBuscado?: string | null;

  @Field(() => String, { nullable: true })
  modalidadContratacion?: string | null;

  @Field(() => String, { nullable: true })
  ubicacion?: string | null;

  @Field(() => String, { nullable: true })
  funciones?: string | null;

  // Las fechas llegan como texto ISO (2026-11-27T00:00:00.000Z).
  @Field(() => String, { nullable: true })
  fechaInicioConvocatoria?: string | null;

  @Field(() => String, { nullable: true })
  fechaFinConvocatoria?: string | null;

  @Field(() => String, { nullable: true })
  fechaInicioPractica?: string | null;

  @Field(() => Int, { nullable: true })
  duracionMeses?: number | null;

  @Field(() => String, { nullable: true })
  imagenUrl?: string | null;

  @Field(() => String)
  estado!: string;

  @Field(() => String, { nullable: true })
  fechaPublicacion?: string | null;

  @Field(() => EmpresaResumen, { nullable: true })
  empresa?: EmpresaResumen | null;
}
