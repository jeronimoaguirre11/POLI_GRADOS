import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import axios from 'axios';
import { AuditoriaService } from '../dist/modules/auditoria/auditoria.service.js';

process.env.AUTH_SERVICE_URL = 'http://auth';
process.env.INTERNAL_API_KEY = 'clave';

const ADMIN = { sub: 'admin-1', email: 'admin@p.com', rol: 'SUPERADMIN' };
const getOriginal = axios.get;
afterEach(() => {
  axios.get = getOriginal;
});

function authActivo(activo = true) {
  axios.get = async (url, config) => {
    assert.equal(url, 'http://auth/internal/usuarios/admin-1/estado');
    assert.equal(config.headers['x-internal-key'], 'clave');
    return { data: { rol: 'SUPERADMIN', activo } };
  };
}

function prismaFalso(eventos = []) {
  const consultas = [];
  return {
    consultas,
    evento: {
      create: async ({ data }) => {
        consultas.push(['create', data]);
        return data;
      },
      findMany: async (args) => {
        consultas.push(['findMany', args]);
        return eventos;
      },
      count: async (args) => {
        consultas.push(['count', args]);
        return eventos.length;
      },
    },
  };
}

test('registra un evento tal cual llega', async () => {
  const prisma = prismaFalso();
  const service = new AuditoriaService(prisma);
  const evento = { accion: 'Crear coordinador', metodo: 'POST', ruta: '/x', servicio: 'administracion', estado: 201, exito: true };

  await service.registrar(evento);
  assert.deepEqual(prisma.consultas[0], ['create', evento]);
});

test('solo el super administrador activo consulta la auditoria', async () => {
  const service = new AuditoriaService(prismaFalso());

  await assert.rejects(
    service.listar({ ...ADMIN, rol: 'COORDINADOR' }, {}),
    (error) => error.getStatus() === 403,
  );

  authActivo(false);
  await assert.rejects(service.listar(ADMIN, {}), (error) => error.getStatus() === 403);
});

test('aplica filtros, paginacion y fechas en hora de Colombia', async () => {
  authActivo();
  const prisma = prismaFalso([{ id: '1' }]);
  const service = new AuditoriaService(prisma);

  const resultado = await service.listar(ADMIN, {
    usuario: 'ana@',
    rol: 'DOCENTE',
    accion: 'contraseña',
    resultado: 'error',
    desde: '2026-10-01',
    hasta: '2026-10-26',
    pagina: 3,
    limite: 20,
  });

  const [, args] = prisma.consultas.find(([tipo]) => tipo === 'findMany');
  assert.equal(args.skip, 40);
  assert.equal(args.take, 20);
  assert.equal(args.where.rol, 'DOCENTE');
  assert.equal(args.where.exito, false);
  assert.equal(args.where.fecha.gte.toISOString(), '2026-10-01T05:00:00.000Z');
  assert.equal(args.where.fecha.lte.toISOString(), '2026-10-27T04:59:59.999Z');
  assert.deepEqual(resultado, { eventos: [{ id: '1' }], total: 1, pagina: 3, limite: 20 });
});

test('exporta CSV para Excel (BOM, punto y coma y comillas)', async () => {
  authActivo();
  const service = new AuditoriaService(
    prismaFalso([
      {
        fecha: new Date('2026-10-26T15:00:00Z'),
        email: 'ana@p.com',
        rol: 'ESTUDIANTE',
        accion: 'Postularse; convocatoria',
        exito: false,
        estado: 409,
        metodo: 'POST',
        ruta: '/postulaciones',
        servicio: 'postulaciones',
        ip: '1.2.3.4',
        detalle: null,
      },
    ]),
  );

  const csv = await service.exportarCsv(ADMIN, {});
  const [encabezado, fila] = csv.split('\r\n');
  assert.equal(csv.charCodeAt(0), 0xfeff);
  assert.match(encabezado, /Fecha \(hora Colombia\);Correo;Rol;Acción/);
  assert.match(fila, /ana@p\.com;ESTUDIANTE;"Postularse; convocatoria";Fallido;409/);
  assert.match(fila, /^26\/10\/2026,? 10:00:00/);
});
