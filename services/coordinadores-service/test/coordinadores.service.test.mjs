import assert from 'node:assert/strict';
import test from 'node:test';
import axios from 'axios';
import { CoordinadoresService } from '../dist/modules/coordinadores/coordinadores.service.js';

const configurarEntorno = () => {
  process.env.INTERNAL_API_KEY = 'clave-interna-prueba';
  process.env.AUTH_SERVICE_URL = 'http://auth';
  process.env.EMPRESAS_SERVICE_URL = 'http://empresas';
  process.env.ESTUDIANTES_SERVICE_URL = 'http://estudiantes';
  process.env.POSTULACIONES_SERVICE_URL = 'http://postulaciones';
  process.env.DOCENTES_SERVICE_URL = 'http://docentes';
};

test('rechaza usuarios que no tienen rol COORDINADOR', async () => {
  configurarEntorno();
  const service = new CoordinadoresService();

  await assert.rejects(
    service.obtenerPanel({
      sub: 'usuario-1',
      email: 'estudiante@prueba.com',
      rol: 'ESTUDIANTE',
    }),
    (error) => error?.getStatus?.() === 403,
  );
});

test('arma el panel ordenado y no filtra observaciones ni datos del CV', async () => {
  configurarEntorno();
  const service = new CoordinadoresService();
  const getOriginal = axios.get;

  axios.get = async (url, config = {}) => {
    assert.equal(config.headers['x-internal-key'], 'clave-interna-prueba');

    if (url === 'http://auth/internal/usuarios') {
      return {
        data: [
          {
            id: 'usuario-2',
            nombre: 'Zoe Ruiz',
            email: 'zoe@prueba.com',
            rol: 'ESTUDIANTE',
          },
          {
            id: 'usuario-1',
            nombre: 'Ana López',
            email: 'ana@prueba.com',
            rol: 'ESTUDIANTE',
          },
          {
            id: 'empresa-1',
            nombre: 'Empresa Uno',
            email: 'empresa@prueba.com',
            rol: 'EMPRESA',
          },
        ],
      };
    }

    if (url === 'http://estudiantes/internal/estudiantes') {
      return {
        data: [
          {
            id: 'estudiante-2',
            usuarioId: 'usuario-2',
            codigo: '002',
            programa: 'Ingeniería',
            semestre: 8,
          },
          {
            id: 'estudiante-1',
            usuarioId: 'usuario-1',
            codigo: '001',
            programa: 'Sistemas',
            semestre: 9,
          },
        ],
      };
    }

    if (url === 'http://postulaciones/internal/postulaciones') {
      return {
        data: [
          {
            id: 'postulacion-antigua',
            ofertaId: 'oferta-1',
            estudianteId: 'estudiante-1',
            estado: 'PENDIENTE',
            fecha: '2026-08-01T10:00:00.000Z',
            observacionesEmpresa: 'dato que nunca debe salir',
            hojaVidaUrl: '/uploads/privado.pdf',
          },
          {
            id: 'postulacion-reciente',
            ofertaId: 'oferta-2',
            estudianteId: 'estudiante-1',
            estado: 'EN_REVISION',
            fecha: '2026-09-01T10:00:00.000Z',
            observacionesEmpresa: 'otra nota privada',
          },
        ],
      };
    }

    if (url === 'http://empresas/internal/ofertas/lote') {
      assert.equal(config.params.ids, 'oferta-1,oferta-2');
      return {
        data: [
          {
            id: 'oferta-1',
            titulo: 'Practicante de calidad',
            empresa: { nombreEmpresa: 'Acme', sector: 'Tecnología' },
          },
          {
            id: 'oferta-2',
            titulo: 'Practicante de desarrollo',
            empresa: { nombreEmpresa: 'Beta', sector: 'Software' },
          },
        ],
      };
    }

    throw new Error(`URL inesperada en prueba: ${url}`);
  };

  try {
    const panel = await service.obtenerPanel({
      sub: 'coordinador-1',
      email: 'coordinador@prueba.com',
      rol: 'COORDINADOR',
    });

    assert.deepEqual(panel.resumen, {
      totalEstudiantes: 2,
      conPostulaciones: 1,
      sinPostulaciones: 1,
      conteosPorEstado: { EN_REVISION: 1, PENDIENTE: 1 },
    });
    assert.deepEqual(
      panel.estudiantes.map((estudiante) => estudiante.nombre),
      ['Ana López', 'Zoe Ruiz'],
    );
    assert.deepEqual(
      panel.estudiantes[0].postulaciones.map((postulacion) => postulacion.id),
      ['postulacion-reciente', 'postulacion-antigua'],
    );
    assert.equal(
      panel.estudiantes[0].postulaciones[0].oferta.empresa.nombreEmpresa,
      'Beta',
    );

    const respuestaSerializada = JSON.stringify(panel);
    assert.equal(respuestaSerializada.includes('observacionesEmpresa'), false);
    assert.equal(respuestaSerializada.includes('hojaVidaUrl'), false);
    assert.equal(respuestaSerializada.includes('updatedAt'), false);
  } finally {
    axios.get = getOriginal;
  }
});

test('lista docentes con sus estudiantes y las asignaciones disponibles', async () => {
  configurarEntorno();
  const service = new CoordinadoresService();
  const getOriginal = axios.get;

  axios.get = async (url, config = {}) => {
    assert.equal(config.headers['x-internal-key'], 'clave-interna-prueba');

    if (url === 'http://auth/internal/usuarios') {
      return {
        data: [
          {
            id: 'usuario-docente',
            nombre: 'Carlos Docente',
            email: 'carlos@prueba.com',
            rol: 'DOCENTE',
          },
          {
            id: 'usuario-estudiante-1',
            nombre: 'Ana Estudiante',
            email: 'ana@prueba.com',
            rol: 'ESTUDIANTE',
          },
          {
            id: 'usuario-estudiante-2',
            nombre: 'Zoe Estudiante',
            email: 'zoe@prueba.com',
            rol: 'ESTUDIANTE',
          },
        ],
      };
    }

    if (url === 'http://estudiantes/internal/estudiantes') {
      return {
        data: [
          {
            id: 'estudiante-1',
            usuarioId: 'usuario-estudiante-1',
            codigo: '001',
            programa: 'INGENIERO_AGROPECUARIO',
            semestre: 9,
          },
          {
            id: 'estudiante-2',
            usuarioId: 'usuario-estudiante-2',
            codigo: '002',
            programa: 'TECNOLOGIA_AGROPECUARIA',
            semestre: 7,
          },
        ],
      };
    }

    if (url === 'http://docentes/internal/docentes') {
      return {
        data: [
          {
            id: 'docente-1',
            usuarioId: 'usuario-docente',
            identificacion: '12345',
            programa: 'INGENIERO_AGROPECUARIO',
            especialidad: 'Suelos',
          },
        ],
      };
    }

    if (url === 'http://docentes/internal/docentes/asignaciones') {
      return {
        data: [
          {
            id: 'asignacion-1',
            docenteId: 'docente-1',
            estudianteId: 'estudiante-1',
            fechaAsignacion: '2026-10-08T10:00:00.000Z',
          },
        ],
      };
    }

    throw new Error(`URL inesperada en prueba: ${url}`);
  };

  try {
    const gestion = await service.listarDocentes({
      sub: 'coordinador-1',
      email: 'coordinador@prueba.com',
      rol: 'COORDINADOR',
    });

    assert.deepEqual(gestion.resumen, {
      totalDocentes: 1,
      estudiantesAsignados: 1,
      estudiantesSinAsignar: 1,
    });
    assert.equal(gestion.docentes[0].nombre, 'Carlos Docente');
    assert.equal(gestion.docentes[0].estudiantes[0].nombre, 'Ana Estudiante');
    assert.equal(gestion.estudiantes[0].docente.nombre, 'Carlos Docente');
    assert.equal(gestion.estudiantes[1].docente, null);
    assert.equal(JSON.stringify(gestion).includes('password'), false);
  } finally {
    axios.get = getOriginal;
  }
});
