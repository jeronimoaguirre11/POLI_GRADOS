import assert from 'node:assert/strict';
import test from 'node:test';
import { OfertasService } from '../dist/modules/ofertas/ofertas.service.js';

test('el reporte solo consulta convocatorias abiertas y vigentes', async () => {
  let consulta = null;
  const prisma = {
    oferta: {
      findMany: async (opciones) => {
        consulta = opciones;
        return [];
      },
    },
  };
  const service = new OfertasService(prisma);

  const resultado = await service.listarActivasParaReporte();

  assert.deepEqual(resultado, []);
  assert.equal(consulta.where.estado, 'ABIERTA');
  assert.ok(consulta.where.fechaInicioConvocatoria.lte instanceof Date);
  assert.ok(consulta.where.fechaFinConvocatoria.gte instanceof Date);
  assert.equal(
    consulta.where.fechaInicioConvocatoria.lte,
    consulta.where.fechaFinConvocatoria.gte,
  );
  assert.deepEqual(consulta.orderBy, [
    { fechaFinConvocatoria: 'asc' },
    { fechaPublicacion: 'desc' },
  ]);
  assert.equal(consulta.select.descripcion, undefined);
  assert.equal(consulta.select.funciones, undefined);
  assert.equal(consulta.select.imagenUrl, undefined);
});
