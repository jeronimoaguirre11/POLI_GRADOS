import { Query, Resolver } from '@nestjs/graphql';
import { EstadoServicio } from './estado-servicio.model.js';

// [nombre del servicio, variable de entorno con su URL interna].
// Son las mismas variables que ya usa el gateway para el proxy REST.
const SERVICIOS: ReadonlyArray<readonly [string, string]> = [
  ['auth', 'AUTH_SERVICE_URL'],
  ['empresas', 'EMPRESAS_SERVICE_URL'],
  ['estudiantes', 'ESTUDIANTES_SERVICE_URL'],
  ['postulaciones', 'POSTULACIONES_SERVICE_URL'],
  ['coordinadores', 'COORDINADORES_SERVICE_URL'],
  ['diplomado', 'DIPLOMADO_SERVICE_URL'],
  ['investigacion', 'INVESTIGACION_SERVICE_URL'],
  ['docentes', 'DOCENTES_SERVICE_URL'],
  ['administracion', 'ADMINISTRACION_SERVICE_URL'],
  ['auditoria', 'AUDITORIA_SERVICE_URL'],
];

@Resolver()
export class EstadoResolver {
  @Query(() => [EstadoServicio], {
    description:
      'Consulta el /health de todos los microservicios en una sola peticion',
  })
  async estadoServicios(): Promise<EstadoServicio[]> {
    // Las 10 consultas salen en paralelo: GraphQL agrega varios servicios
    // detras de un unico endpoint.
    return Promise.all(
      SERVICIOS.map(([nombre, variable]) =>
        this.consultar(nombre, process.env[variable]),
      ),
    );
  }

  private async consultar(
    nombre: string,
    url: string | undefined,
  ): Promise<EstadoServicio> {
    if (!url) {
      return { nombre, ok: false, detalle: 'URL no configurada' };
    }
    try {
      const respuesta = await fetch(`${url}/health`, {
        signal: AbortSignal.timeout(3000),
      });
      return {
        nombre,
        ok: respuesta.ok,
        detalle: respuesta.ok ? undefined : `HTTP ${respuesta.status}`,
      };
    } catch (error) {
      return {
        nombre,
        ok: false,
        detalle: error instanceof Error ? error.message : 'sin respuesta',
      };
    }
  }
}
