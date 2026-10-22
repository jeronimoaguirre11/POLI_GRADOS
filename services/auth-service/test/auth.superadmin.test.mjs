import assert from 'node:assert/strict';
import test from 'node:test';
import bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import {
  AuthService,
  MENSAJE_CUENTA_DESACTIVADA,
} from '../dist/modules/auth/auth.service.js';
import { RegisterDto } from '../dist/modules/auth/dto/register.dto.js';
import { CambiarEstadoCuentaDto } from '../dist/modules/auth/dto/cambiar-estado-cuenta.dto.js';

const jwtFalso = { signAsync: async (payload) => `token-${payload.rol}` };

test('el registro publico rechaza el rol SUPERADMIN', async () => {
  const dto = Object.assign(new RegisterDto(), {
    nombre: 'Intruso',
    email: 'intruso@prueba.com',
    password: 'Clave123',
    rol: 'SUPERADMIN',
  });

  const errores = await validate(dto);
  assert.equal(errores.some((e) => e.property === 'rol'), true);
});

test('cambiar estado exige un booleano', async () => {
  const dto = Object.assign(new CambiarEstadoCuentaDto(), { activo: 'si' });
  const errores = await validate(dto);
  assert.equal(errores.some((e) => e.property === 'activo'), true);
});

test('crearSuperadmin fija el rol y no devuelve el password', async () => {
  let datos;
  const prisma = {
    usuario: {
      findUnique: async () => null,
      create: async ({ data }) => {
        datos = data;
        return { id: 'sa-2', createdAt: new Date(), ...data };
      },
    },
  };
  const service = new AuthService(prisma, jwtFalso);

  const resultado = await service.crearSuperadmin({
    nombre: 'Otra administradora',
    email: 'admin2@prueba.com',
    password: 'Segura123',
  });

  assert.equal(datos.rol, 'SUPERADMIN');
  assert.equal('password' in resultado, false);
});

test('una cuenta desactivada no puede iniciar sesion', async () => {
  const password = await bcrypt.hash('Segura123', 4);
  const prisma = {
    usuario: {
      findUnique: async () => ({
        id: 'u1',
        email: 'u@prueba.com',
        rol: 'ESTUDIANTE',
        password,
        activo: false,
      }),
    },
  };
  const service = new AuthService(prisma, jwtFalso);

  await assert.rejects(
    service.login({ email: 'u@prueba.com', password: 'Segura123' }),
    (error) => error.getStatus() === 401 && error.message === MENSAJE_CUENTA_DESACTIVADA,
  );
});

test('con contrasena incorrecta no se revela si la cuenta esta desactivada', async () => {
  const password = await bcrypt.hash('Segura123', 4);
  const prisma = {
    usuario: {
      findUnique: async () => ({ id: 'u1', password, activo: false }),
    },
  };
  const service = new AuthService(prisma, jwtFalso);

  await assert.rejects(
    service.login({ email: 'u@prueba.com', password: 'Otra1234' }),
    (error) => error.message === 'Credenciales invalidas',
  );
});

test('/auth/me rechaza una cuenta desactivada', async () => {
  const prisma = {
    usuario: {
      findUnique: async () => ({
        nombre: 'U',
        email: 'u@prueba.com',
        rol: 'DOCENTE',
        activo: false,
      }),
    },
  };
  const service = new AuthService(prisma, jwtFalso);

  await assert.rejects(
    service.obtenerPerfil({ sub: 'u1' }),
    (error) => error.getStatus() === 401,
  );
});

test('/auth/me no expone el campo activo', async () => {
  const prisma = {
    usuario: {
      findUnique: async () => ({
        nombre: 'U',
        email: 'u@prueba.com',
        rol: 'DOCENTE',
        activo: true,
      }),
    },
  };
  const service = new AuthService(prisma, jwtFalso);

  const perfil = await service.obtenerPerfil({ sub: 'u1' });
  assert.deepEqual(perfil, { nombre: 'U', email: 'u@prueba.com', rol: 'DOCENTE' });
});

test('no se puede desactivar al unico super administrador activo', async () => {
  let actualizado = false;
  const prisma = {
    usuario: {
      findUnique: async () => ({ id: 'sa', rol: 'SUPERADMIN', activo: true }),
      count: async () => 1,
      update: async () => {
        actualizado = true;
      },
    },
  };
  const service = new AuthService(prisma, jwtFalso);

  await assert.rejects(
    service.cambiarEstadoCuenta('sa', false),
    (error) => error.getStatus() === 409,
  );
  assert.equal(actualizado, false);
});

test('se puede desactivar un super administrador si queda otro activo', async () => {
  const prisma = {
    usuario: {
      findUnique: async () => ({ id: 'sa', rol: 'SUPERADMIN', activo: true }),
      count: async () => 2,
      update: async ({ data }) => ({ id: 'sa', rol: 'SUPERADMIN', ...data }),
    },
  };
  const service = new AuthService(prisma, jwtFalso);

  const resultado = await service.cambiarEstadoCuenta('sa', false);
  assert.equal(resultado.activo, false);
});

test('cambiar estado de un usuario inexistente responde 404', async () => {
  const prisma = { usuario: { findUnique: async () => null } };
  const service = new AuthService(prisma, jwtFalso);

  await assert.rejects(
    service.cambiarEstadoCuenta('nadie', false),
    (error) => error.getStatus() === 404,
  );
});

test('el super administrador inicial se crea una sola vez', async () => {
  const creados = [];
  let total = 0;
  const prisma = {
    usuario: {
      count: async () => total,
      findUnique: async () => null,
      create: async ({ data }) => {
        creados.push(data);
        total += 1;
        return data;
      },
    },
  };
  const service = new AuthService(prisma, jwtFalso);
  const entorno = {
    SUPERADMIN_EMAIL: 'admin@prueba.com',
    SUPERADMIN_PASSWORD: 'Admin12345',
  };

  const primero = await service.asegurarSuperadminInicial(entorno);
  const segundo = await service.asegurarSuperadminInicial(entorno);

  assert.deepEqual(primero, { creado: true, motivo: 'creado' });
  assert.deepEqual(segundo, { creado: false, motivo: 'ya-existe' });
  assert.equal(creados.length, 1);
  assert.equal(creados[0].rol, 'SUPERADMIN');
  assert.equal(creados[0].nombre, 'Super administrador');
  assert.equal(await bcrypt.compare('Admin12345', creados[0].password), true);
});

test('el super administrador inicial respeta la configuracion y la politica', async () => {
  const prisma = {
    usuario: {
      count: async () => 0,
      findUnique: async () => ({ id: 'otro', rol: 'ESTUDIANTE' }),
    },
  };
  const service = new AuthService(prisma, jwtFalso);

  assert.equal(
    (await service.asegurarSuperadminInicial({})).motivo,
    'sin-configuracion',
  );
  assert.equal(
    (
      await service.asegurarSuperadminInicial({
        SUPERADMIN_EMAIL: 'a@b.com',
        SUPERADMIN_PASSWORD: 'debil',
      })
    ).motivo,
    'password-invalido',
  );
  assert.equal(
    (
      await service.asegurarSuperadminInicial({
        SUPERADMIN_EMAIL: 'a@b.com',
        SUPERADMIN_PASSWORD: 'Admin12345',
      })
    ).motivo,
    'email-en-uso',
  );
});
