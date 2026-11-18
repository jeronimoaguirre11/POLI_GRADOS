import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Estado de salud de un microservicio' })
export class EstadoServicio {
  @Field(() => String)
  nombre!: string;

  @Field(() => Boolean)
  ok!: boolean;

  @Field(() => String, { nullable: true })
  detalle?: string;
}
