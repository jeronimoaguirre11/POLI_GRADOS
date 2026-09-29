import { promises as fs } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service.js';
import { ActualizarPostulacionInternaDto } from './dto/actualizar-postulacion-interna.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

const TIPOS_HOJA_VIDA_PERMITIDOS: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
};

const TIPOS_HOJA_VIDA: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx':
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const TAMANO_MAXIMO_HOJA_VIDA = 5 * 1024 * 1024; // 5MB

interface EstudianteInterno {
  id: string;
  usuarioId: string;
  codigo: string;
  programa: string;
  semestre: number | null;
}

interface OfertaInterna {
  id: string;
  estado: string;
  empresaId: string;
}

interface OfertaResumen {
  id: string;
  titulo: string;
  perfilBuscado: string;
  modalidadContratacion: string;
  ubicacion: string;
  empresa: { nombreEmpresa: string; sector: string };
}

@Injectable()
export class PostulacionesService {
  private readonly directorioHojasVida = join(
    process.cwd(),
    'uploads',
    'hojas-vida',
  );

  constructor(private readonly prisma: PrismaService) {}

  private asegurarRolEstudiante(payload: JwtPayload) {
    if (payload.rol !== 'ESTUDIANTE') {
      throw new ForbiddenException(
        'Solo las cuentas de estudiante pueden postularse',
      );
    }
  }

  private headersInternos() {
    return { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' };
  }

  private urlEmpresas(path: string) {
    return `${process.env.EMPRESAS_SERVICE_URL}${path}`;
  }

  private urlEstudiantes(path: string) {
    return `${process.env.ESTUDIANTES_SERVICE_URL}${path}`;
  }

  private urlDiplomado(path: string) {
    return `${process.env.DIPLOMADO_SERVICE_URL}${path}`;
  }

  // El perfil de Estudiante ya no vive en esta base de datos: se resuelve el
  // usuarioId del token contra estudiantes-service.
  private async obtenerEstudianteDelUsuario(
    usuarioId: string,
  ): Promise<EstudianteInterno> {
    try {
      const { data } = await axios.get(
        this.urlEstudiantes(`/internal/estudiantes/por-usuario/${usuarioId}`),
        { headers: this.headersInternos() },
      );
      return data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new NotFoundException(
          'Este usuario no tiene un perfil de estudiante asociado',
        );
      }
      throw error;
    }
  }

  private async obtenerOfertaParaValidar(
    ofertaId: string,
  ): Promise<OfertaInterna> {
    try {
      const { data } = await axios.get(
        this.urlEmpresas(`/internal/ofertas/${ofertaId}`),
        { headers: this.headersInternos() },
      );
      return data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new NotFoundException('Convocatoria no encontrada');
      }
      throw error;
    }
  }

  private async obtenerOfertasPorLote(ids: string[]): Promise<OfertaResumen[]> {
    const unicos = [...new Set(ids)].filter(Boolean);
    if (unicos.length === 0) return [];

    const { data } = await axios.get(
      this.urlEmpresas(`/internal/ofertas/lote?ids=${unicos.join(',')}`),
      { headers: this.headersInternos() },
    );
    return data;
  }

  // La hoja de vida es obligatoria: sin ella no se puede crear la postulacion.
  private async guardarHojaVida(archivo: any): Promise<string> {
    if (!archivo) {
      throw new BadRequestException(
        'Debes adjuntar tu hoja de vida para postularte',
      );
    }

    const extension = TIPOS_HOJA_VIDA_PERMITIDOS[archivo.mimetype];
    if (!extension) {
      throw new BadRequestException(
        'La hoja de vida debe ser un archivo PDF o Word (doc/docx)',
      );
    }
    if (archivo.size > TAMANO_MAXIMO_HOJA_VIDA) {
      throw new BadRequestException(
        'La hoja de vida no puede pesar mas de 5MB',
      );
    }

    await fs.mkdir(this.directorioHojasVida, { recursive: true });
    const nombreArchivo = `${randomUUID()}.${extension}`;
    await fs.writeFile(
      join(this.directorioHojasVida, nombreArchivo),
      archivo.buffer,
    );

    return `/uploads/hojas-vida/${nombreArchivo}`;
  }

  // helper nuevo
  private async obtenerUsuarioIdDeEstudiante(
    estudianteId: string,
  ): Promise<string | null> {
    try {
      const { data } = await axios.get(
        this.urlEstudiantes(`/internal/estudiantes/lote?ids=${estudianteId}`),
        { headers: this.headersInternos() },
      );
      return data[0]?.usuarioId ?? null;
    } catch {
      return null;
    }
  }

  async postularse(payload: JwtPayload, ofertaId: string, hojaVida: any) {
    this.asegurarRolEstudiante(payload);
    const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);
    const oferta = await this.obtenerOfertaParaValidar(ofertaId);

    if (oferta.estado !== 'ABIERTA') {
      throw new ConflictException('Esta convocatoria ya no esta abierta');
    }

    const hojaVidaUrl = await this.guardarHojaVida(hojaVida);

    try {
      const postulacion = await this.prisma.postulacion.create({
        data: {
          ofertaId,
          estudianteId: estudiante.id,
          hojaVidaUrl,
        },
        // La respuesta vuelve directamente al estudiante. La ruta fisica del
        // CV, las observaciones internas y los identificadores de otros
        // dominios no forman parte del contrato publico.
        select: {
          id: true,
          ofertaId: true,
          estado: true,
          fecha: true,
          updatedAt: true,
        },
      });

      return {
        id: postulacion.id,
        ofertaId: postulacion.ofertaId,
        estado: postulacion.estado,
        fecha: postulacion.fecha,
        updatedAt: postulacion.updatedAt,
      };
    } catch (error: any) {
      // Si la insercion falla, evita dejar hojas de vida huerfanas en disco.
      await fs.unlink(join(process.cwd(), hojaVidaUrl)).catch(() => {});

      // Violacion de la restriccion unica (ofertaId, estudianteId).
      if (error?.code === 'P2002') {
        throw new ConflictException('Ya te postulaste a esta convocatoria');
      }
      throw error;
    }
  }

  // Antes venia con `include: { oferta: { empresa: {...} } }`. Ahora Oferta
  // vive en empresas-service: se junta el `ofertaId` de cada postulacion y
  // se pide el lote una sola vez, mezclando el resultado en memoria.
  async listarMias(payload: JwtPayload) {
    this.asegurarRolEstudiante(payload);
    const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);

    const postulaciones = await this.prisma.postulacion.findMany({
      where: { estudianteId: estudiante.id },
      orderBy: { fecha: 'desc' },
      // Esta es una respuesta publica para el estudiante. Mantener una lista
      // positiva de campos evita filtrar notas internas o la ruta fisica del
      // archivo si el modelo Postulacion crece en el futuro.
      select: {
        id: true,
        ofertaId: true,
        estado: true,
        fecha: true,
        updatedAt: true,
      },
    });

    if (postulaciones.length === 0) return [];

    const ofertas = await this.obtenerOfertasPorLote(
      postulaciones.map((postulacion) => postulacion.ofertaId),
    );
    const ofertasPorId = new Map(ofertas.map((oferta) => [oferta.id, oferta]));

    return postulaciones.map((postulacion) => {
      const oferta = ofertasPorId.get(postulacion.ofertaId);

      return {
        id: postulacion.id,
        ofertaId: postulacion.ofertaId,
        estado: postulacion.estado,
        fecha: postulacion.fecha,
        updatedAt: postulacion.updatedAt,
        oferta: oferta
          ? {
              titulo: oferta.titulo,
              perfilBuscado: oferta.perfilBuscado,
              modalidadContratacion: oferta.modalidadContratacion,
              ubicacion: oferta.ubicacion,
              empresa: oferta.empresa,
            }
          : null,
      };
    });
  }

  async cancelarPostulacion(payload: JwtPayload, postulacionId: string) {
    this.asegurarRolEstudiante(payload);
    const estudiante = await this.obtenerEstudianteDelUsuario(payload.sub);

    const postulacion = await this.prisma.postulacion.findUnique({
      where: { id: postulacionId },
    });

    if (!postulacion || postulacion.estudianteId !== estudiante.id) {
      throw new NotFoundException('Postulacion no encontrada');
    }

    if (postulacion.estado === 'SELECCIONADO') {
      throw new ConflictException(
        'No puedes cancelar una postulacion despues de ser seleccionado',
      );
    }

    await this.prisma.postulacion.delete({ where: { id: postulacionId } });

    // Best-effort: si falla borrar el archivo del disco no es motivo para
    // fallar la operacion, la postulacion ya fue eliminada de la BD.
    fs.unlink(join(process.cwd(), postulacion.hojaVidaUrl)).catch(() => {});

    return { eliminado: true };
  }

  // --- Llamados por empresas-service y coordinadores-service (rutas internas) ---

  // Vista minima para coordinadores-service. Se mantiene separada de las
  // consultas empresariales para que el coordinador no reciba observaciones
  // privadas, rutas de archivos ni metadatos que no necesita.
  async listarParaCoordinador() {
    return this.prisma.postulacion.findMany({
      orderBy: { fecha: 'desc' },
      select: {
        id: true,
        ofertaId: true,
        estudianteId: true,
        estado: true,
        fecha: true,
      },
    });
  }

  // No expone hojaVidaUrl (es un detalle de disco de este servicio): solo
  // dice si existe, vía tieneHojaVida.
  async obtenerPorOferta(ofertaId: string) {
    const postulaciones = await this.prisma.postulacion.findMany({
      where: { ofertaId },
      orderBy: { fecha: 'desc' },
    });

    return postulaciones.map(({ hojaVidaUrl, ...postulacion }) => ({
      ...postulacion,
      tieneHojaVida: Boolean(hojaVidaUrl),
    }));
  }

  async obtenerConteoPorOfertas(ofertaIds: string[]) {
    if (ofertaIds.length === 0) return {};

    const grupos = await this.prisma.postulacion.groupBy({
      by: ['ofertaId'],
      where: { ofertaId: { in: ofertaIds } },
      _count: { _all: true },
    });

    return grupos.reduce<Record<string, number>>((acumulado, grupo) => {
      acumulado[grupo.ofertaId] = grupo._count._all;
      return acumulado;
    }, {});
  }

  async obtenerPorId(id: string) {
    return this.prisma.postulacion.findUnique({
      where: { id },
      select: {
        id: true,
        ofertaId: true,
        estudianteId: true,
        estado: true,
        observacionesEmpresa: true,
        fecha: true,
        updatedAt: true,
      },
    });
  }

  async actualizarInterna(id: string, dto: ActualizarPostulacionInternaDto) {
    if (dto.estado === 'SELECCIONADO') {
      const postulacion = await this.prisma.postulacion.findUnique({
        where: { id },
        select: { estudianteId: true },
      });

      if (!postulacion) {
        throw new NotFoundException('Postulacion no encontrada');
      }

      const usuarioId = await this.obtenerUsuarioIdDeEstudiante(
        postulacion.estudianteId,
      );

      if (usuarioId && (await this.estaComprometidoEnDiplomado(usuarioId))) {
        throw new ConflictException(
          'Este estudiante ya esta inscrito en un diplomado este semestre, no puede ser seleccionado para practicas.',
        );
      }
    }
    try {
      return await this.prisma.postulacion.update({
        where: { id },
        data: {
          ...(dto.estado !== undefined && { estado: dto.estado }),
          ...(dto.observacionesEmpresa !== undefined && {
            observacionesEmpresa: dto.observacionesEmpresa,
          }),
        },
        select: {
          id: true,
          estado: true,
          observacionesEmpresa: true,
          updatedAt: true,
        },
      });
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('Postulacion no encontrada');
      }
      throw error;
    }
  }

  // Empresas-service ya valido que la empresa sea dueña de la oferta antes de
  // llegar aqui; este metodo solo lee el archivo del disco y lo entrega en
  // base64 (son PDFs/Word <=5MB, no vale la pena montar un proxy de streams
  // solo para la llamada interna).
  async obtenerArchivo(id: string) {
    const postulacion = await this.prisma.postulacion.findUnique({
      where: { id },
      select: { hojaVidaUrl: true },
    });

    if (!postulacion) {
      throw new NotFoundException('Postulacion no encontrada');
    }

    const nombreGuardado = basename(postulacion.hojaVidaUrl);
    const extension = extname(nombreGuardado).toLowerCase();
    const mimeType = TIPOS_HOJA_VIDA[extension];

    if (!mimeType) {
      throw new NotFoundException('Hoja de vida no disponible');
    }

    try {
      const contenido = await fs.readFile(
        join(this.directorioHojasVida, nombreGuardado),
      );

      return {
        contenidoBase64: contenido.toString('base64'),
        mimeType,
        extension,
      };
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        throw new NotFoundException('Hoja de vida no disponible');
      }
      throw error;
    }
  }

  async obtenerCompromisoInterno(usuarioId: string) {
    let estudiante: EstudianteInterno;
    try {
      estudiante = await this.obtenerEstudianteDelUsuario(usuarioId);
    } catch (error) {
      // Sin perfil de estudiante no puede estar comprometido. Cualquier otro
      // error (por ejemplo estudiantes-service caido) se propaga a proposito.
      if (error instanceof NotFoundException) {
        return { comprometido: false, postulacionId: null };
      }
      throw error;
    }

    const postulacion = await this.prisma.postulacion.findFirst({
      where: { estudianteId: estudiante.id, estado: 'SELECCIONADO' },
      select: { id: true },
    });

    return {
      comprometido: Boolean(postulacion),
      postulacionId: postulacion?.id ?? null,
    };
  }

  private async estaComprometidoEnDiplomado(
    usuarioId: string,
  ): Promise<boolean> {
    try {
      const { data } = await axios.get(
        this.urlDiplomado(`/internal/estudiante/${usuarioId}/comprometido`),
        { headers: this.headersInternos() },
      );
      return data.comprometido === true;
    } catch {
      throw new ServiceUnavailableException(
        'No se pudo verificar el estado del estudiante en Diplomado. Intenta de nuevo en unos minutos.',
      );
    }
  }
}
