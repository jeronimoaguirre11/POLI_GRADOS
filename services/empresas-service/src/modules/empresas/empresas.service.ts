import { join } from 'node:path';
import { promises as fs } from 'node:fs';
import { randomUUID } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { ActualizarOfertaDto } from './dto/actualizar-oferta.dto.js';
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto.js';
import { ActualizarPerfilEmpresaDto } from './dto/actualizar-perfil-empresa.dto.js';
import { CrearEmpresaDto } from './dto/crear-empresa.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

const TIPOS_IMAGEN_PERMITIDOS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

const TAMANO_MAXIMO_IMAGEN = 3 * 1024 * 1024; // 3MB

interface PostulacionInterna {
  id: string;
  ofertaId: string;
  estudianteId: string;
  estado: string;
  observacionesEmpresa: string | null;
  fecha: string;
  updatedAt: string;
  tieneHojaVida?: boolean;
}

interface EstudianteInterno {
  id: string;
  usuarioId: string;
  codigo: string;
  programa: string;
  semestre: number | null;
}

interface UsuarioInterno {
  id: string;
  nombre: string;
  email: string;
}

@Injectable()
export class EmpresasService {
  private readonly directorioImagenes = join(
    process.cwd(),
    'uploads',
    'ofertas',
  );

  constructor(private readonly prisma: PrismaService) {}

  private asegurarRolEmpresa(payload: JwtPayload) {
    if (payload.rol !== 'EMPRESA') {
      throw new ForbiddenException(
        'Solo las cuentas de empresa pueden usar este recurso',
      );
    }
  }

  private async obtenerEmpresaDelUsuario(usuarioId: string) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { usuarioId },
    });

    if (!empresa) {
      throw new NotFoundException(
        'Este usuario no tiene un perfil de empresa asociado',
      );
    }

    return empresa;
  }

  // Verifica que la convocatoria exista y pertenezca a esta empresa, para
  // que una empresa no pueda editar/eliminar/gestionar convocatorias de otra.
  private async obtenerOfertaPropia(empresaId: string, ofertaId: string) {
    const oferta = await this.prisma.oferta.findUnique({
      where: { id: ofertaId },
    });

    if (!oferta || oferta.empresaId !== empresaId) {
      throw new NotFoundException('Convocatoria no encontrada');
    }

    return oferta;
  }

  private headersInternos() {
    return { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' };
  }

  private urlPostulaciones(path: string) {
    return `${process.env.POSTULACIONES_SERVICE_URL}${path}`;
  }

  private urlEstudiantes(path: string) {
    return `${process.env.ESTUDIANTES_SERVICE_URL}${path}`;
  }

  private urlAuth(path: string) {
    return `${process.env.AUTH_SERVICE_URL}${path}`;
  }

  // --- Llamadas a postulaciones-service (Postulacion vive alla ahora) ---

  private async obtenerPostulacionInterna(
    postulacionId: string,
  ): Promise<PostulacionInterna> {
    try {
      const { data } = await axios.get(
        this.urlPostulaciones(`/internal/${postulacionId}`),
        { headers: this.headersInternos() },
      );
      return data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new NotFoundException('Postulacion no encontrada');
      }
      throw error;
    }
  }

  private async listarPostulacionesDeOferta(
    ofertaId: string,
  ): Promise<PostulacionInterna[]> {
    const { data } = await axios.get(
      this.urlPostulaciones(`/internal/por-oferta/${ofertaId}`),
      { headers: this.headersInternos() },
    );
    return Array.isArray(data) ? data : [];
  }

  // --- Llamadas a estudiantes-service / auth-service (para armar nombre
  // y datos de cada postulante, ya que Estudiante y Usuario ya no viven en
  // esta base de datos) ---

  private async obtenerEstudiantesPorLote(
    ids: string[],
  ): Promise<EstudianteInterno[]> {
    const unicos = [...new Set(ids)].filter(Boolean);
    if (unicos.length === 0) return [];

    const { data } = await axios.get(
      this.urlEstudiantes(`/internal/estudiantes/lote?ids=${unicos.join(',')}`),
      { headers: this.headersInternos() },
    );
    return data;
  }

  private async obtenerUsuariosPorLote(
    ids: string[],
  ): Promise<UsuarioInterno[]> {
    const unicos = [...new Set(ids)].filter(Boolean);
    if (unicos.length === 0) return [];

    const { data } = await axios.get(
      this.urlAuth(`/internal/usuarios/lote?ids=${unicos.join(',')}`),
      { headers: this.headersInternos() },
    );
    return data;
  }

  // La foto es opcional: si no llega ningun archivo, simplemente no se guarda.
  private async guardarImagenOferta(imagen: any): Promise<string | null> {
    if (!imagen) return null;

    const extension = TIPOS_IMAGEN_PERMITIDOS[imagen.mimetype];
    if (!extension) {
      throw new BadRequestException(
        'La foto debe ser una imagen PNG, JPG o WEBP',
      );
    }
    if (imagen.size > TAMANO_MAXIMO_IMAGEN) {
      throw new BadRequestException('La foto no puede pesar mas de 3MB');
    }

    await fs.mkdir(this.directorioImagenes, { recursive: true });
    const nombreArchivo = `${randomUUID()}.${extension}`;
    await fs.writeFile(
      join(this.directorioImagenes, nombreArchivo),
      imagen.buffer,
    );

    // Prefijo /empresas/... a proposito: el proxy /empresas del gateway ya
    // cubre esta ruta sin agregar una regla nueva (ver main.ts).
    return `/empresas/uploads/ofertas/${nombreArchivo}`;
  }

  async obtenerPerfil(payload: JwtPayload) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    return {
      nombreEmpresa: empresa.nombreEmpresa,
      nit: empresa.nit,
      sector: empresa.sector,
    };
  }

  // El NIT no se puede editar aqui: es un identificador legal de la empresa.
  async actualizarPerfil(payload: JwtPayload, dto: ActualizarPerfilEmpresaDto) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    return this.prisma.empresa.update({
      where: { id: empresa.id },
      data: {
        ...(dto.nombreEmpresa !== undefined && {
          nombreEmpresa: dto.nombreEmpresa,
        }),
        ...(dto.sector !== undefined && { sector: dto.sector }),
      },
    });
  }

  async crearOferta(payload: JwtPayload, dto: CrearOfertaDto, imagen?: any) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
    const imagenUrl = await this.guardarImagenOferta(imagen);

    return this.prisma.oferta.create({
      data: {
        empresaId: empresa.id,
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        perfilBuscado: dto.perfilBuscado,
        modalidadContratacion: dto.modalidadContratacion,
        ubicacion: dto.ubicacion,
        funciones: dto.funciones,
        fechaInicioConvocatoria: dto.fechaInicioConvocatoria,
        fechaFinConvocatoria: dto.fechaFinConvocatoria,
        fechaInicioPractica: dto.fechaInicioPractica,
        duracionMeses: dto.duracionMeses,
        imagenUrl,
      },
    });
  }

  // El conteo de postulaciones por oferta ya no es un `_count` de Prisma
  // (Postulacion vive en otra base de datos): se le pregunta a
  // postulaciones-service, oferta por oferta, y se arma el mismo shape que
  // el frontend ya esperaba (`_count.postulaciones`).
  async listarOfertas(payload: JwtPayload) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    const ofertas = await this.prisma.oferta.findMany({
      where: { empresaId: empresa.id },
      orderBy: { fechaPublicacion: 'desc' },
    });

    if (ofertas.length === 0) return [];

    const ids = ofertas.map((oferta) => oferta.id);
    const { data: conteos } = await axios.get(
      this.urlPostulaciones(`/internal/conteo-por-ofertas?ofertaIds=${ids.join(',')}`),
      { headers: this.headersInternos() },
    );

    return ofertas.map((oferta) => ({
      ...oferta,
      _count: { postulaciones: conteos?.[oferta.id] ?? 0 },
    }));
  }

  // Antes era un solo `include` anidado (Postulacion -> Estudiante ->
  // Usuario). Ahora es un fan-out de 3 llamadas HTTP porque cada tabla vive
  // en una base de datos distinta.
  async listarPostulantes(payload: JwtPayload, ofertaId: string) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
    await this.obtenerOfertaPropia(empresa.id, ofertaId);

    const postulaciones = await this.listarPostulacionesDeOferta(ofertaId);
    if (postulaciones.length === 0) return [];

    const estudiantes = await this.obtenerEstudiantesPorLote(
      postulaciones.map((postulacion) => postulacion.estudianteId),
    );
    const usuarios = await this.obtenerUsuariosPorLote(
      estudiantes.map((estudiante) => estudiante.usuarioId),
    );

    const estudiantesPorId = new Map(
      estudiantes.map((estudiante) => [estudiante.id, estudiante]),
    );
    const usuariosPorId = new Map(
      usuarios.map((usuario) => [usuario.id, usuario]),
    );

    return postulaciones.map((postulacion) => {
      const estudiante = estudiantesPorId.get(postulacion.estudianteId);
      const usuario = estudiante
        ? usuariosPorId.get(estudiante.usuarioId)
        : undefined;

      return {
        id: postulacion.id,
        estado: postulacion.estado,
        observacionesEmpresa: postulacion.observacionesEmpresa,
        fecha: postulacion.fecha,
        updatedAt: postulacion.updatedAt,
        tieneHojaVida: Boolean(postulacion.tieneHojaVida),
        estudiante: {
          codigo: estudiante?.codigo ?? null,
          programa: estudiante?.programa ?? null,
          semestre: estudiante?.semestre ?? null,
          usuario: {
            nombre: usuario?.nombre ?? null,
            email: usuario?.email ?? null,
          },
        },
      };
    });
  }

  async actualizarPostulacion(
    payload: JwtPayload,
    postulacionId: string,
    dto: ActualizarPostulacionDto,
  ) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    if (dto.estado === undefined && dto.observacionesEmpresa === undefined) {
      throw new BadRequestException('Debes enviar un estado o una observacion');
    }

    const postulacion = await this.obtenerPostulacionInterna(postulacionId);
    // La postulacion solo se puede tocar si su oferta pertenece a esta empresa.
    await this.obtenerOfertaPropia(empresa.id, postulacion.ofertaId);

    const { data } = await axios.patch(
      this.urlPostulaciones(`/internal/${postulacionId}`),
      {
        ...(dto.estado !== undefined && { estado: dto.estado }),
        ...(dto.observacionesEmpresa !== undefined && {
          observacionesEmpresa: dto.observacionesEmpresa.trim() || null,
        }),
      },
      { headers: this.headersInternos() },
    );

    return data;
  }

  async obtenerHojaVida(payload: JwtPayload, postulacionId: string) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    const postulacion = await this.obtenerPostulacionInterna(postulacionId);
    await this.obtenerOfertaPropia(empresa.id, postulacion.ofertaId);

    const [estudiante] = await this.obtenerEstudiantesPorLote([
      postulacion.estudianteId,
    ]);

    let archivo: {
      contenidoBase64: string;
      mimeType: string;
      extension: string;
    };

    try {
      const respuesta = await axios.get(
        this.urlPostulaciones(`/internal/${postulacionId}/archivo`),
        { headers: this.headersInternos() },
      );
      archivo = respuesta.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        throw new NotFoundException('Hoja de vida no disponible');
      }
      throw error;
    }

    const codigoSeguro = (estudiante?.codigo ?? 'postulante').replace(
      /[^a-zA-Z0-9_-]/g,
      '-',
    );

    return {
      contenido: Buffer.from(archivo.contenidoBase64, 'base64'),
      mimeType: archivo.mimeType,
      nombreArchivo: `hoja-vida-${codigoSeguro}${archivo.extension}`,
    };
  }

  async actualizarOferta(
    payload: JwtPayload,
    ofertaId: string,
    dto: ActualizarOfertaDto,
    imagen?: any,
  ) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
    await this.obtenerOfertaPropia(empresa.id, ofertaId);

    // undefined = "no la toques"; solo se reemplaza si llega una foto nueva.
    const imagenUrl = imagen
      ? await this.guardarImagenOferta(imagen)
      : undefined;

    return this.prisma.oferta.update({
      where: { id: ofertaId },
      data: {
        ...(dto.titulo !== undefined && { titulo: dto.titulo }),
        ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
        ...(dto.perfilBuscado !== undefined && {
          perfilBuscado: dto.perfilBuscado,
        }),
        ...(dto.modalidadContratacion !== undefined && {
          modalidadContratacion: dto.modalidadContratacion,
        }),
        ...(dto.ubicacion !== undefined && { ubicacion: dto.ubicacion }),
        ...(dto.funciones !== undefined && { funciones: dto.funciones }),
        ...(dto.fechaInicioConvocatoria !== undefined && {
          fechaInicioConvocatoria: dto.fechaInicioConvocatoria,
        }),
        ...(dto.fechaFinConvocatoria !== undefined && {
          fechaFinConvocatoria: dto.fechaFinConvocatoria,
        }),
        ...(dto.fechaInicioPractica !== undefined && {
          fechaInicioPractica: dto.fechaInicioPractica,
        }),
        ...(dto.duracionMeses !== undefined && {
          duracionMeses: dto.duracionMeses,
        }),
        ...(imagenUrl !== undefined && { imagenUrl }),
      },
    });
  }

  // Ya no hay una FK de Postulacion -> Oferta en esta base de datos (viven en
  // bases distintas), asi que la validacion "no se puede eliminar si tiene
  // postulaciones" se hace a mano preguntandole a postulaciones-service.
  async eliminarOferta(payload: JwtPayload, ofertaId: string) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
    await this.obtenerOfertaPropia(empresa.id, ofertaId);

    const postulaciones = await this.listarPostulacionesDeOferta(ofertaId);
    if (postulaciones.length > 0) {
      throw new ConflictException(
        'No se puede eliminar: esta convocatoria ya tiene postulaciones asociadas',
      );
    }

    await this.prisma.oferta.delete({ where: { id: ofertaId } });

    return { eliminado: true };
  }

  // --- Llamado solo por auth-service (ruta interna) ---
  async crearPerfil(dto: CrearEmpresaDto) {
    const nitExistente = await this.prisma.empresa.findUnique({
      where: { nit: dto.nit },
    });
    if (nitExistente) {
      throw new ConflictException('Ya existe una empresa con ese NIT');
    }

    return this.prisma.empresa.create({
      data: {
        usuarioId: dto.usuarioId,
        nombreEmpresa: dto.nombreEmpresa,
        nit: dto.nit,
        sector: dto.sector,
      },
    });
  }
}
