import assert from 'node:assert/strict'
import test from 'node:test'
import axios from 'axios'
import { DocentesService } from '../dist/modules/docentes/docentes.service.js'

const payloadDocente = {
  sub: 'usuario-docente-1',
  email: 'docente@prueba.edu.co',
  rol: 'DOCENTE',
}

function crearPrisma() {
  return {
    docente: {
      findUnique: async () => ({
        id: 'docente-1',
        usuarioId: payloadDocente.sub,
      }),
    },
    asignacionDocente: {
      findMany: async () => [
        { id: 'asignacion-1', docenteId: 'docente-1', estudianteId: 'est-1' },
      ],
    },
  }
}

function configurarEntorno() {
  process.env.ESTUDIANTES_SERVICE_URL = 'http://estudiantes'
  process.env.POSTULACIONES_SERVICE_URL = 'http://postulaciones'
  process.env.DIPLOMADO_SERVICE_URL = 'http://diplomado'
  process.env.INVESTIGACION_SERVICE_URL = 'http://investigacion'
  process.env.INTERNAL_API_KEY = 'clave-interna-prueba'
}

function estudianteBase() {
  return {
    id: 'est-1',
    usuarioId: 'usuario-est-1',
    codigo: '2026001',
    programa: 'INGENIERIA_SISTEMAS',
    semestre: 9,
  }
}

test('reune practicas, diplomado e investigacion del estudiante asignado', async () => {
  configurarEntorno()
  const getOriginal = axios.get

  axios.get = async (url, opciones) => {
    assert.equal(opciones.headers['x-internal-key'], 'clave-interna-prueba')

    if (url === 'http://estudiantes/internal/estudiantes/lote') {
      assert.equal(opciones.params.ids, 'est-1')
      return { data: [estudianteBase()] }
    }
    if (url === 'http://postulaciones/internal/resumen-docente') {
      assert.equal(opciones.params.estudianteIds, 'est-1')
      return {
        data: [
          {
            estudianteId: 'est-1',
            tipo: 'PRACTICAS',
            estado: 'SELECCIONADO',
            titulo: 'Desarrollo web',
            detalle: 'Empresa Prueba',
            fecha: '2026-10-08T10:00:00.000Z',
          },
        ],
      }
    }
    if (url === 'http://diplomado/internal/resumen-docente') {
      assert.equal(opciones.params.usuarioIds, 'usuario-est-1')
      return {
        data: [
          {
            usuarioId: 'usuario-est-1',
            tipo: 'DIPLOMADO',
            estado: 'INSCRITO',
            titulo: 'Analitica de datos',
            detalle: '120 horas',
            fecha: '2026-10-07T10:00:00.000Z',
          },
        ],
      }
    }
    if (url === 'http://investigacion/internal/resumen-docente') {
      assert.equal(opciones.params.usuarioIds, 'usuario-est-1')
      return {
        data: [
          {
            usuarioId: 'usuario-est-1',
            tipo: 'INVESTIGACION',
            estado: 'PENDIENTE',
            titulo: 'IA aplicada a educacion',
            detalle: 'Educacion',
            fecha: '2026-10-06T10:00:00.000Z',
          },
        ],
      }
    }

    throw new Error(`URL inesperada: ${url}`)
  }

  try {
    const servicio = new DocentesService(crearPrisma())
    const estudiantes = await servicio.obtenerMisEstudiantes(payloadDocente)

    assert.equal(estudiantes.length, 1)
    assert.deepEqual(
      estudiantes[0].modalidades.map((modalidad) => modalidad.tipo),
      ['PRACTICAS', 'DIPLOMADO', 'INVESTIGACION'],
    )
    assert.deepEqual(estudiantes[0].serviciosModalidadNoDisponibles, [])
    assert.equal(estudiantes[0].modalidades[0].detalle, 'Empresa Prueba')
    assert.equal('estudianteId' in estudiantes[0].modalidades[0], false)
  } finally {
    axios.get = getOriginal
  }
})

test('conserva los datos disponibles y avisa cuando falla un modulo', async () => {
  configurarEntorno()
  const getOriginal = axios.get

  axios.get = async (url) => {
    if (url === 'http://estudiantes/internal/estudiantes/lote') {
      return { data: [estudianteBase()] }
    }
    if (url === 'http://postulaciones/internal/resumen-docente') {
      throw new Error('postulaciones no disponible')
    }
    if (url === 'http://diplomado/internal/resumen-docente') {
      return {
        data: [
          {
            usuarioId: 'usuario-est-1',
            tipo: 'DIPLOMADO',
            estado: 'INSCRITO',
            titulo: 'Gestion de proyectos',
            detalle: '80 horas',
            fecha: '2026-10-08T10:00:00.000Z',
          },
        ],
      }
    }
    if (url === 'http://investigacion/internal/resumen-docente') {
      return { data: [] }
    }

    throw new Error(`URL inesperada: ${url}`)
  }

  try {
    const servicio = new DocentesService(crearPrisma())
    const estudiantes = await servicio.obtenerMisEstudiantes(payloadDocente)

    assert.deepEqual(
      estudiantes[0].modalidades.map((modalidad) => modalidad.tipo),
      ['DIPLOMADO'],
    )
    assert.deepEqual(estudiantes[0].serviciosModalidadNoDisponibles, [
      'PRACTICAS',
    ])
  } finally {
    axios.get = getOriginal
  }
})

test('reasigna un estudiante sin crear una asignacion duplicada', async () => {
  const operaciones = []
  const prisma = {
    docente: {
      findUnique: async ({ where }) =>
        where.id === 'docente-nuevo' ? { id: 'docente-nuevo' } : null,
    },
    asignacionDocente: {
      findUnique: async () => ({
        id: 'asignacion-1',
        docenteId: 'docente-anterior',
        estudianteId: 'estudiante-1',
      }),
      update: async (operacion) => {
        operaciones.push(operacion)
        return { id: 'asignacion-1', ...operacion.data }
      },
    },
  }

  const servicio = new DocentesService(prisma)
  const resultado = await servicio.reasignarEstudiante(
    'docente-nuevo',
    'estudiante-1',
  )

  assert.equal(operaciones.length, 1)
  assert.deepEqual(operaciones[0].where, { estudianteId: 'estudiante-1' })
  assert.equal(operaciones[0].data.docenteId, 'docente-nuevo')
  assert.ok(operaciones[0].data.fechaAsignacion instanceof Date)
  assert.equal(resultado.docenteId, 'docente-nuevo')
})

test('retira una asignacion existente por estudiante', async () => {
  let eliminado = null
  const asignacion = {
    id: 'asignacion-1',
    docenteId: 'docente-1',
    estudianteId: 'estudiante-1',
  }
  const prisma = {
    asignacionDocente: {
      findUnique: async () => asignacion,
      delete: async (operacion) => {
        eliminado = operacion
        return asignacion
      },
    },
  }

  const servicio = new DocentesService(prisma)
  const resultado = await servicio.retirarAsignacion('estudiante-1')

  assert.deepEqual(eliminado, { where: { estudianteId: 'estudiante-1' } })
  assert.deepEqual(resultado, asignacion)
})
