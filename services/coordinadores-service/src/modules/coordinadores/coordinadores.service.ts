import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';
import { CrearDocenteDto } from './dto/crear-docente.dto.js';

interface UsuarioInterno {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface EstudianteInterno {
  id: string;
  usuarioId: string;
  codigo: string;
  programa: string;
  semestre: number | null;
}

interface PostulacionInterna {
  id: string;
  ofertaId: string;
  estudianteId: string;
  estado: string;
  fecha: string;
}

interface OfertaInterna {
  id: string;
  titulo: string;
  empresa: {
    nombreEmpresa: string;
    sector: string;
  };
}

@Injectable()
export class CoordinadoresService {
  private asegurarRolCoordinador(payload: JwtPayload) {
    if (payload.rol !== 'COORDINADOR') {
      throw new ForbiddenException(
        'Solo las cuentas de coordinador pueden consultar este panel',
      );
    }
  }

  private headersInternos() {
    return { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' };
  }

  private urlServicio(nombre: string) {
    const valor = process.env[nombre];
    if (!valor) {
      throw new InternalServerErrorException(
        `Falta configurar ${nombre} en coordinadores-service`,
      );
    }
    return valor.replace(/\/$/, '');
  }

  private async obtenerOfertasPorLote(ids: string[]) {
    const idsUnicos = [...new Set(ids)].filter(Boolean);
    if (idsUnicos.length === 0) return [];

    // Evita URLs excesivamente largas cuando el sistema acumule muchas
    // convocatorias, manteniendo el endpoint de lote que ya existe.
    const tamanoLote = 100;
    const solicitudes: Array<Promise<OfertaInterna[]>> = [];

    for (let indice = 0; indice < idsUnicos.length; indice += tamanoLote) {
      const lote = idsUnicos.slice(indice, indice + tamanoLote);
      solicitudes.push(
        axios
          .get<OfertaInterna[]>(
            `${this.urlServicio('EMPRESAS_SERVICE_URL')}/internal/ofertas/lote`,
            {
              headers: this.headersInternos(),
              params: { ids: lote.join(',') },
            },
          )
          .then((respuesta) => respuesta.data),
      );
    }

    return (await Promise.all(solicitudes)).flat();
  }

  async obtenerPanel(payload: JwtPayload) {
    this.asegurarRolCoordinador(payload);

    // Las tres fuentes son independientes, por eso se consultan en paralelo.
    // Cada endpoint interno usa seleccion positiva y omite credenciales,
    // observaciones empresariales y rutas de hojas de vida.
    const [respuestaUsuarios, respuestaEstudiantes, respuestaPostulaciones] =
      await Promise.all([
        axios.get<UsuarioInterno[]>(
          `${this.urlServicio('AUTH_SERVICE_URL')}/internal/usuarios`,
          { headers: this.headersInternos() },
        ),
        axios.get<EstudianteInterno[]>(
          `${this.urlServicio('ESTUDIANTES_SERVICE_URL')}/internal/estudiantes`,
          { headers: this.headersInternos() },
        ),
        axios.get<PostulacionInterna[]>(
          `${this.urlServicio('POSTULACIONES_SERVICE_URL')}/internal/postulaciones`,
          { headers: this.headersInternos() },
        ),
      ]);

    const usuariosPorId = new Map(
      respuestaUsuarios.data
        .filter((usuario) => usuario.rol === 'ESTUDIANTE')
        .map((usuario) => [usuario.id, usuario]),
    );
    const postulaciones = respuestaPostulaciones.data;
    const ofertas = await this.obtenerOfertasPorLote(
      postulaciones.map((postulacion) => postulacion.ofertaId),
    );
    const ofertasPorId = new Map(ofertas.map((oferta) => [oferta.id, oferta]));

    const postulacionesPorEstudiante = new Map<string, PostulacionInterna[]>();
    for (const postulacion of postulaciones) {
      const acumuladas =
        postulacionesPorEstudiante.get(postulacion.estudianteId) ?? [];
      acumuladas.push(postulacion);
      postulacionesPorEstudiante.set(postulacion.estudianteId, acumuladas);
    }

    const estudiantes = respuestaEstudiantes.data
      .map((estudiante) => {
        const usuario = usuariosPorId.get(estudiante.usuarioId);
        const postulacionesDelEstudiante = (
          postulacionesPorEstudiante.get(estudiante.id) ?? []
        )
          .sort(
            (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
          )
          .map((postulacion) => {
            const oferta = ofertasPorId.get(postulacion.ofertaId);

            return {
              id: postulacion.id,
              estado: postulacion.estado,
              fecha: postulacion.fecha,
              oferta: oferta
                ? {
                    id: oferta.id,
                    titulo: oferta.titulo,
                    empresa: {
                      nombreEmpresa: oferta.empresa.nombreEmpresa,
                      sector: oferta.empresa.sector,
                    },
                  }
                : null,
            };
          });

        return {
          id: estudiante.id,
          usuarioId: estudiante.usuarioId,
          nombre: usuario?.nombre ?? 'Usuario no disponible',
          email: usuario?.email ?? '',
          codigo: estudiante.codigo,
          programa: estudiante.programa,
          semestre: estudiante.semestre,
          postulaciones: postulacionesDelEstudiante,
        };
      })
      .sort(
        (a, b) =>
          a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }) ||
          a.codigo.localeCompare(b.codigo, 'es', { sensitivity: 'base' }),
      );

    const paresPorEstado = [
      ...postulaciones.reduce((conteos, postulacion) => {
        conteos.set(
          postulacion.estado,
          (conteos.get(postulacion.estado) ?? 0) + 1,
        );
        return conteos;
      }, new Map<string, number>()),
    ];
    const conteosPorEstado = Object.fromEntries(
      paresPorEstado.sort(([estadoA], [estadoB]) =>
        estadoA.localeCompare(estadoB),
      ),
    );
    const conPostulaciones = estudiantes.filter(
      (estudiante) => estudiante.postulaciones.length > 0,
    ).length;

    return {
      resumen: {
        totalEstudiantes: estudiantes.length,
        conPostulaciones,
        sinPostulaciones: estudiantes.length - conPostulaciones,
        conteosPorEstado,
      },
      estudiantes,
    };
  }

  async crearDocente(payload: JwtPayload, dto: CrearDocenteDto) {
    this.asegurarRolCoordinador(payload);

    const respuesta = await axios.post(
      `${this.urlServicio('AUTH_SERVICE_URL')}/internal/usuarios/docente`,
      dto,
      {
        headers: this.headersInternos(),
      },
    );

    return respuesta.data;
  }
}
