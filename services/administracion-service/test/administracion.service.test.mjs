import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import axios from 'axios';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AdministracionService } from '../dist/modules/administracion/administracion.service.js';
import { CrearEstudianteDto } from '../dist/modules/administracion/dto/crear-estudiante.dto.js';
import { CrearCuentaDto } from '../dist/modules/administracion/dto/crear-cuenta.dto.js';

process.env.INTERNAL_API_KEY = 'clave-interna-prueba';
process.env.AUTH_SERVICE_URL = 'http://auth';

const ADMIN = { sub: 'admin-1', email: 'admin@prueba.com', rol: 'SUPERADMIN' };
const original = { get: axios.get, post: axios.post, patch: axios.patch };

afterEach(() => Object.assign(axios, original));

// Simula auth-service. "estado" es lo que responde la verificacion de la
// cuenta del administrador en cada peticion.
function simularAuth({ estado = { rol: 'SUPERADMIN', activo: true }, usuarios = [] } = {}) {
  const llamadas = [];
  axios.get = async (url, config) => {
    assert.equal(config.headers['x-internal-key'], 'clave-interna-prueba');
    llamadas.push(['GET', url]);
    if (url === `http://auth/internal/usuarios/${ADMIN.sub}/estado`) return { data: estado };
    if (url === 'http://auth/internal/usuarios/administracion') return { data: usuarios };
    throw new Error(`URL inesperada ${url}`);
  };
  axios.post = async (url, body, config) => {
    assert.equal(config.headers['x-internal-key'], 'clave-interna-prueba');
    llamadas.push(['POST', url, body]);
    return { data: { id: 'nuevo', ...body, password: undefined } };
  };
  axios.patch = async (url, body, config) => {
    assert.equal(config.headers['x-internal-key'], 'clave-interna-prueba');
    llamadas.push(['PATCH', url, body]);
    return { data: { id: 'x', ...body } };
  };
  return llamadas;
}

test('rechaza a quien no es SUPERADMIN sin llamar a auth-service', async () => {
  const llamadas = simularAuth();
  const service = new AdministracionService();

  for (const rol of ['COORDINADOR', 'DOCENTE', 'ESTUDIANTE', 'EMPRESA']) {
    await assert.rejects(
      service.listarUsuarios({ ...ADMIN, rol }),
      (error) => error.getStatus() === 403,
    );
  }
  assert.equal(llamadas.length, 0);
});

test('un super administrador desactivado pierde el acceso aunque su JWT siga vigente', async () => {
  simularAuth({ estado: { rol: 'SUPERADMIN', activo: false } });
  const service = new AdministracionService();

  await assert.rejects(
    service.crearCoordinador(ADMIN, { nombre: 'C', email: 'c@p.com', password: 'Clave1234' }),
    (error) => error.getStatus() === 403,
  );
});

test('lista usuarios con resumen por rol y estado', async () => {
  simularAuth({
    usuarios: [
      { id: '1', rol: 'SUPERADMIN', activo: true },
      { id: '2', rol: 'ESTUDIANTE', activo: true },
      { id: '3', rol: 'ESTUDIANTE', activo: false },
      { id: '4', rol: 'DOCENTE', activo: true },
    ],
  });
  const service = new AdministracionService();

  const { usuarios, resumen } = await service.listarUsuarios(ADMIN);

  assert.equal(usuarios.length, 4);
  assert.deepEqual(resumen, {
    total: 4,
    activos: 3,
    inactivos: 1,
    porRol: { SUPERADMIN: 1, COORDINADOR: 0, DOCENTE: 1, ESTUDIANTE: 2, EMPRESA: 0 },
  });
});

test('cada tipo de cuenta va a su ruta interna y el rol lo fija el servidor', async () => {
  const llamadas = simularAuth();
  const service = new AdministracionService();
  const base = { nombre: 'N', email: 'n@p.com', password: 'Clave1234' };

  await service.crearCoordinador(ADMIN, base);
  await service.crearAdministrador(ADMIN, base);
  await service.crearDocente(ADMIN, { ...base, identificacion: '123' });
  await service.crearEstudiante(ADMIN, { ...base, codigo: '2026', programa: 'INGENIERO_AGROPECUARIO', rol: 'SUPERADMIN' });
  await service.crearEmpresa(ADMIN, { ...base, nombreEmpresa: 'E', nit: '9', sector: 'Agro' });

  const posts = llamadas.filter(([m]) => m === 'POST');
  assert.deepEqual(
    posts.map(([, url]) => url),
    [
      'http://auth/internal/usuarios/coordinador',
      'http://auth/internal/usuarios/superadmin',
      'http://auth/internal/usuarios/docente',
      'http://auth/internal/usuarios/registro',
      'http://auth/internal/usuarios/registro',
    ],
  );
  assert.equal(posts[3][2].rol, 'ESTUDIANTE');
  assert.equal(posts[4][2].rol, 'EMPRESA');
});

test('reenvia el status y mensaje de auth-service (correo duplicado)', async () => {
  simularAuth();
  axios.post = async () => {
    const error = new Error('409');
    error.isAxiosError = true;
    error.response = { status: 409, data: { message: 'Ya existe un usuario con ese email' } };
    throw error;
  };
  const service = new AdministracionService();

  await assert.rejects(
    service.crearCoordinador(ADMIN, { nombre: 'C', email: 'c@p.com', password: 'Clave1234' }),
    (error) => error.getStatus() === 409 && error.message === 'Ya existe un usuario con ese email',
  );
});

test('el administrador no puede desactivarse a si mismo', async () => {
  const llamadas = simularAuth();
  const service = new AdministracionService();

  await assert.rejects(
    service.cambiarEstado(ADMIN, ADMIN.sub, false),
    (error) => error.getStatus() === 400,
  );
  assert.equal(llamadas.some(([m]) => m === 'PATCH'), false);

  const resultado = await service.cambiarEstado(ADMIN, 'otro-id', false);
  assert.equal(resultado.activo, false);
});

test('los DTO aplican la politica de contrasena y la lista de programas', async () => {
  const debil = plainToInstance(CrearCuentaDto, { nombre: 'A', email: 'a@p.com', password: 'clave' });
  assert.equal((await validate(debil)).some((e) => e.property === 'password'), true);

  const programaMalo = plainToInstance(CrearEstudianteDto, {
    nombre: 'A',
    email: 'a@p.com',
    password: 'Clave1234',
    codigo: '1',
    programa: 'MEDICINA',
  });
  assert.equal((await validate(programaMalo)).some((e) => e.property === 'programa'), true);
});
