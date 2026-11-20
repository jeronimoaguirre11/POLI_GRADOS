import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { EstadoResolver } from './estado.resolver.js';
import { OfertasResolver } from './ofertas.resolver.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Esquema "code-first": se genera en memoria a partir de los
      // decoradores, sin escribir archivos .graphql.
      autoSchemaFile: true,
      path: '/graphql',
      // Util en desarrollo y para la demo. Desactivar en produccion real.
      introspection: true,
      // No revelar rutas internas del servidor en los mensajes de error.
      includeStacktraceInErrorResponses: false,
      // Deja la peticion HTTP disponible en los resolvers para reenviar la
      // cookie de sesion a los microservicios.
      context: ({ req }: { req: unknown }) => ({ req }),
    }),
  ],
  providers: [EstadoResolver, OfertasResolver],
})
export class GraphqlApiModule {}
