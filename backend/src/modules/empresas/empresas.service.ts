import { promises as fs } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { ActualizarOfertaDto } from './dto/actualizar-oferta.dto.js';
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

const TIPOS_IMAGEN_PERMITIDOS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

const TAMANO_MAXIMO_IMAGEN = 3 * 1024 * 1024; // 3MB

const TIPOS_HOJA_VIDA: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx':
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

@Injectable()
export class EmpresasService {
  private readonly directorioImagenes = join(
    process.cwd(),
    'uploads',
    'ofertas',
  );
  private readonly directorioHojasVida = join(
    process.cwd(),
    'uploads',
    'hojas-vida',
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
  // que una empresa no pueda editar/eliminar convocatorias de otra.
  private async obtenerOfertaPropia(empresaId: string, ofertaId: string) {
    const oferta = await this.prisma.oferta.findUnique({
      where: { id: ofertaId },
    });

    if (!oferta || oferta.empresaId !== empresaId) {
      throw new NotFoundException('Convocatoria no encontrada');
    }

    return oferta;
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

    return `/uploads/ofertas/${nombreArchivo}`;
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

  async listarOfertas(payload: JwtPayload) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    return this.prisma.oferta.findMany({
      where: { empresaId: empresa.id },
      orderBy: { fechaPublicacion: 'desc' },
      include: {
        _count: { select: { postulaciones: true } },
      },
    });
  }

  async listarPostulantes(payload: JwtPayload, ofertaId: string) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
    await this.obtenerOfertaPropia(empresa.id, ofertaId);

    const postulaciones = await this.prisma.postulacion.findMany({
      where: { ofertaId },
      orderBy: { fecha: 'desc' },
      select: {
        id: true,
        estado: true,
        observacionesEmpresa: true,
        fecha: true,
        updatedAt: true,
        hojaVidaUrl: true,
        estudiante: {
          select: {
            codigo: true,
            programa: true,
            semestre: true,
            usuario: {
              select: { nombre: true, email: true },
            },
          },
        },
      },
    });

    return postulaciones.map(({ hojaVidaUrl, ...postulacion }) => ({
      ...postulacion,
      tieneHojaVida: Boolean(hojaVidaUrl),
    }));
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

    const postulacion = await this.prisma.postulacion.findUnique({
      where: { id: postulacionId },
      select: {
        id: true,
        oferta: { select: { empresaId: true } },
      },
    });

    if (!postulacion || postulacion.oferta.empresaId !== empresa.id) {
      throw new NotFoundException('Postulacion no encontrada');
    }

    return this.prisma.postulacion.update({
      where: { id: postulacionId },
      data: {
        ...(dto.estado !== undefined && { estado: dto.estado }),
        ...(dto.observacionesEmpresa !== undefined && {
          observacionesEmpresa: dto.observacionesEmpresa.trim() || null,
        }),
      },
      select: {
        id: true,
        estado: true,
        observacionesEmpresa: true,
        updatedAt: true,
      },
    });
  }

  async obtenerHojaVida(payload: JwtPayload, postulacionId: string) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);

    const postulacion = await this.prisma.postulacion.findUnique({
      where: { id: postulacionId },
      select: {
        hojaVidaUrl: true,
        oferta: { select: { empresaId: true } },
        estudiante: { select: { codigo: true } },
      },
    });

    if (!postulacion || postulacion.oferta.empresaId !== empresa.id) {
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
      const codigoSeguro = postulacion.estudiante.codigo.replace(
        /[^a-zA-Z0-9_-]/g,
        '-',
      );

      return {
        contenido,
        mimeType,
        nombreArchivo: `hoja-vida-${codigoSeguro}${extension}`,
      };
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        throw new NotFoundException('Hoja de vida no disponible');
      }
      throw error;
    }
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

  async eliminarOferta(payload: JwtPayload, ofertaId: string) {
    this.asegurarRolEmpresa(payload);
    const empresa = await this.obtenerEmpresaDelUsuario(payload.sub);
    await this.obtenerOfertaPropia(empresa.id, ofertaId);

    try {
      await this.prisma.oferta.delete({ where: { id: ofertaId } });
    } catch (error: any) {
      if (error?.code === 'P2003') {
        throw new ConflictException(
          'No se puede eliminar: esta convocatoria ya tiene postulaciones o practicas asociadas',
        );
      }
      throw error;
    }

    return { eliminado: true };
  }
}
