import {
  BadGatewayException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Args, Context, ID, Query, Resolver } from '@nestjs/graphql';
import { Oferta } from './oferta.model.js';

// Lo que graphql-api.module.ts deja disponible en cada consulta.
interface ContextoGraphql {
  req: { headers: Record<string, string | string[] | undefined> };
}

@Resolver(() => Oferta)
export class OfertasResolver {
  @Query(() => [Oferta], {
    description: 'Lista las ofertas de práctica (requiere sesión iniciada)',
  })
  ofertas(@Context() contexto: ContextoGraphql): Promise<Oferta[]> {
    return this.pedirOfertas(contexto);
  }

  @Query(() => Oferta, {
    nullable: true,
    description: 'Busca una oferta por su id (null si no existe)',
  })
  async oferta(
    @Args('id', { type: () => ID }) id: string,
    @Context() contexto: ContextoGraphql,
  ): Promise<Oferta | null> {
    // empresas-service solo expone el listado; se filtra aqui.
    const ofertas = await this.pedirOfertas(contexto);
    return ofertas.find((oferta) => oferta.id === id) ?? null;
  }

  // Llama a empresas-service reenviando la sesion del usuario: el servicio
  // sigue validando el token, GraphQL no duplica esa logica.
  private async pedirOfertas(contexto: ContextoGraphql): Promise<Oferta[]> {
    const base = process.env.EMPRESAS_SERVICE_URL;
    if (!base) {
      throw new ServiceUnavailableException(
        'EMPRESAS_SERVICE_URL no esta configurada',
      );
    }

    const { cookie, authorization } = contexto.req.headers;
    const cabeceras: Record<string, string> = {};
    if (typeof cookie === 'string') cabeceras.cookie = cookie;
    if (typeof authorization === 'string') {
      cabeceras.authorization = authorization;
    }

    let respuesta: Response;
    try {
      respuesta = await fetch(`${base}/ofertas`, {
        headers: cabeceras,
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      throw new ServiceUnavailableException('empresas-service no responde');
    }

    if (respuesta.status === 401 || respuesta.status === 403) {
      throw new UnauthorizedException('Sesion no valida o no proporcionada');
    }
    if (!respuesta.ok) {
      throw new BadGatewayException(
        `empresas-service respondio HTTP ${respuesta.status}`,
      );
    }
    return (await respuesta.json()) as Oferta[];
  }
}
