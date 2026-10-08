import assert from 'node:assert/strict';
import test from 'node:test';
import { PostulacionesService } from '../dist/modules/postulaciones/postulaciones.service.js';

test('postularse tampoco devuelve la ruta del CV ni identificadores internos', async () => {
  let consultaRealizada;
  const fecha = new Date('2026-09-24T15:00:00.000Z');
  const updatedAt = new Date('2026-09-24T16:00:00.000Z');
  const prisma = {
    postulacion: {
      create: async (consulta) => {
        consultaRealizada = consulta;
        return {
          id: 'postulacion-1',
          ofertaId: 'oferta-1',
          estudianteId: 'estudiante-1',
          hojaVidaUrl: '/uploads/hojas-vida/cv-privado.pdf',
          estado: 'PENDIENTE',
          observacionesEmpresa: null,
          fecha,
          updatedAt,
        };
      },
    },
  };

  const service = new PostulacionesService(prisma);
  service.obtenerEstudianteDelUsuario = async () => ({
    id: 'estudiante-1',
  });
  service.obtenerOfertaParaValidar = async () => ({
    id: 'oferta-1',
    estado: 'ABIERTA',
  });
  service.guardarHojaVida = async () => '/uploads/hojas-vida/cv-privado.pdf';

  const resultado = await service.postularse(
    { sub: 'usuario-1', rol: 'ESTUDIANTE' },
    'oferta-1',
    { mimetype: 'application/pdf' },
  );

  assert.deepEqual(consultaRealizada.select, {
    id: true,
    ofertaId: true,
    estado: true,
    fecha: true,
    updatedAt: true,
  });
  assert.deepEqual(resultado, {
    id: 'postulacion-1',
    ofertaId: 'oferta-1',
    estado: 'PENDIENTE',
    fecha,
    updatedAt,
  });
  assert.equal('observacionesEmpresa' in resultado, false);
  assert.equal('hojaVidaUrl' in resultado, false);
  assert.equal('estudianteId' in resultado, false);
});

test('listarMias no selecciona ni devuelve informacion privada de la empresa o del CV', async () => {
  let consultaRealizada;
  const fecha = new Date('2026-09-24T15:00:00.000Z');
  const updatedAt = new Date('2026-09-24T16:00:00.000Z');

  const prisma = {
    postulacion: {
      findMany: async (consulta) => {
        consultaRealizada = consulta;

        // El doble incluye deliberadamente todos los campos sensibles. Asi la
        // prueba tambien protege el mapeo de salida si un adaptador o mock no
        // respeta el `select` de Prisma.
        return [
          {
            id: 'postulacion-1',
            ofertaId: 'oferta-1',
            estudianteId: 'estudiante-1',
            hojaVidaUrl: '/uploads/hojas-vida/cv-privado.pdf',
            estado: 'EN_REVISION',
            observacionesEmpresa: 'Nota privada para seleccionadores',
            fecha,
            updatedAt,
          },
        ];
      },
    },
  };

  const service = new PostulacionesService(prisma);
  service.obtenerEstudianteDelUsuario = async () => ({
    id: 'estudiante-1',
    usuarioId: 'usuario-1',
    codigo: '20260001',
    programa: 'Ingenieria de Sistemas',
    semestre: 8,
  });
  service.obtenerOfertasPorLote = async () => [
    {
      id: 'oferta-1',
      titulo: 'Practicante de desarrollo',
      perfilBuscado: 'Estudiante de sistemas',
      modalidadContratacion: 'PRACTICA',
      ubicacion: 'Bogota',
      empresa: { nombreEmpresa: 'Empresa Demo', sector: 'Tecnologia' },
    },
  ];

  const resultado = await service.listarMias({
    sub: 'usuario-1',
    rol: 'ESTUDIANTE',
  });

  assert.deepEqual(consultaRealizada.select, {
    id: true,
    ofertaId: true,
    estado: true,
    fecha: true,
    updatedAt: true,
  });

  assert.deepEqual(resultado, [
    {
      id: 'postulacion-1',
      ofertaId: 'oferta-1',
      estado: 'EN_REVISION',
      fecha,
      updatedAt,
      oferta: {
        titulo: 'Practicante de desarrollo',
        perfilBuscado: 'Estudiante de sistemas',
        modalidadContratacion: 'PRACTICA',
        ubicacion: 'Bogota',
        empresa: { nombreEmpresa: 'Empresa Demo', sector: 'Tecnologia' },
      },
    },
  ]);

  assert.equal('observacionesEmpresa' in resultado[0], false);
  assert.equal('hojaVidaUrl' in resultado[0], false);
  assert.equal('estudianteId' in resultado[0], false);
});

test('listarParaCoordinador usa una proyeccion sin observaciones ni datos del CV', async () => {
  let consultaRealizada;
  const filas = [{ id: 'postulacion-1' }];
  const prisma = {
    postulacion: {
      findMany: async (consulta) => {
        consultaRealizada = consulta;
        return filas;
      },
    },
  };

  const service = new PostulacionesService(prisma);
  const resultado = await service.listarParaCoordinador();

  assert.deepEqual(consultaRealizada, {
    orderBy: { fecha: 'desc' },
    select: {
      id: true,
      ofertaId: true,
      estudianteId: true,
      estado: true,
      fecha: true,
    },
  });
  assert.equal(consultaRealizada.select.observacionesEmpresa, undefined);
  assert.equal(consultaRealizada.select.hojaVidaUrl, undefined);
  assert.equal(consultaRealizada.select.updatedAt, undefined);
  assert.equal(resultado, filas);
});
