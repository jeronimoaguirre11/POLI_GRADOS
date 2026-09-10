import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EmpresasService } from './empresas.service.js';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

const EMPRESA: JwtPayload = {
  sub: 'usuario-empresa',
  email: 'empresa@example.com',
  rol: 'EMPRESA',
};

const ESTUDIANTE: JwtPayload = {
  sub: 'usuario-estudiante',
  email: 'estudiante@example.com',
  rol: 'ESTUDIANTE',
};

describe('EmpresasService - gestion de postulantes', () => {
  const prisma = {
    empresa: { findUnique: vi.fn() },
    oferta: { findUnique: vi.fn(), findMany: vi.fn() },
    postulacion: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  };
  let service: EmpresasService;

  beforeEach(() => {
    vi.clearAllMocks();
    prisma.empresa.findUnique.mockResolvedValue({ id: 'empresa-1' });
    service = new EmpresasService(prisma as never);
  });

  it('lista unicamente postulantes de una oferta propia sin exponer la ruta del archivo', async () => {
    prisma.oferta.findUnique.mockResolvedValue({
      id: 'oferta-1',
      empresaId: 'empresa-1',
    });
    prisma.postulacion.findMany.mockResolvedValue([
      {
        id: 'postulacion-1',
        estado: 'PENDIENTE',
        observacionesEmpresa: null,
        fecha: new Date('2026-09-10'),
        updatedAt: new Date('2026-09-10'),
        hojaVidaUrl: '/uploads/hojas-vida/archivo.pdf',
        estudiante: {
          codigo: '2026001',
          programa: 'INGENIERO_AGROPECUARIO',
          semestre: 8,
          usuario: {
            nombre: 'Ana Perez',
            email: 'ana@example.com',
          },
        },
      },
    ]);

    const resultado = await service.listarPostulantes(EMPRESA, 'oferta-1');

    expect(resultado).toHaveLength(1);
    expect(resultado[0]).toMatchObject({
      id: 'postulacion-1',
      tieneHojaVida: true,
    });
    expect(resultado[0]).not.toHaveProperty('hojaVidaUrl');
    expect(prisma.postulacion.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { ofertaId: 'oferta-1' } }),
    );
  });

  it('impide consultar postulantes de una oferta de otra empresa', async () => {
    prisma.oferta.findUnique.mockResolvedValue({
      id: 'oferta-ajena',
      empresaId: 'empresa-2',
    });

    await expect(
      service.listarPostulantes(EMPRESA, 'oferta-ajena'),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.postulacion.findMany).not.toHaveBeenCalled();
  });

  it('actualiza estado y observaciones de una postulacion propia', async () => {
    prisma.postulacion.findUnique.mockResolvedValue({
      id: 'postulacion-1',
      oferta: { empresaId: 'empresa-1' },
    });
    prisma.postulacion.update.mockResolvedValue({
      id: 'postulacion-1',
      estado: 'EN_REVISION',
      observacionesEmpresa: 'Buen perfil',
      updatedAt: new Date('2026-09-10'),
    });

    await service.actualizarPostulacion(EMPRESA, 'postulacion-1', {
      estado: 'EN_REVISION',
      observacionesEmpresa: '  Buen perfil  ',
    });

    expect(prisma.postulacion.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'postulacion-1' },
        data: {
          estado: 'EN_REVISION',
          observacionesEmpresa: 'Buen perfil',
        },
      }),
    );
  });

  it('impide actualizar una postulacion de otra empresa', async () => {
    prisma.postulacion.findUnique.mockResolvedValue({
      id: 'postulacion-ajena',
      oferta: { empresaId: 'empresa-2' },
    });

    await expect(
      service.actualizarPostulacion(EMPRESA, 'postulacion-ajena', {
        estado: 'RECHAZADO',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.postulacion.update).not.toHaveBeenCalled();
  });

  it('rechaza una actualizacion vacia', async () => {
    await expect(
      service.actualizarPostulacion(EMPRESA, 'postulacion-1', {}),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.postulacion.findUnique).not.toHaveBeenCalled();
  });

  it('impide que un estudiante use las funciones empresariales', async () => {
    await expect(
      service.listarPostulantes(ESTUDIANTE, 'oferta-1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
    await expect(
      service.obtenerHojaVida(ESTUDIANTE, 'postulacion-1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });
});
