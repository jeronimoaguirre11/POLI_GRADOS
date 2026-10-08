import assert from 'node:assert/strict';
import test from 'node:test';
import bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { AuthService } from '../dist/modules/auth/auth.service.js';
import { CrearCoordinadorDto } from '../dist/modules/auth/dto/crear-coordinador.dto.js';
import { RegisterDto } from '../dist/modules/auth/dto/register.dto.js';

test('el registro publico rechaza el rol COORDINADOR', async () => {
  const dto = Object.assign(new RegisterDto(), {
    nombre: 'Coordinador público',
    email: 'publico@prueba.com',
    password: 'Clave123',
    rol: 'COORDINADOR',
  });

  const errores = await validate(dto);

  assert.equal(
    errores.some((error) => error.property === 'rol'),
    true,
  );
});

test('el aprovisionamiento exige la misma política de contraseña', async () => {
  const dto = Object.assign(new CrearCoordinadorDto(), {
    nombre: 'Coordinación Académica',
    email: 'coordinacion@prueba.com',
    password: 'debil',
  });

  const errores = await validate(dto);

  assert.equal(
    errores.some((error) => error.property === 'password'),
    true,
  );
});

test('el aprovisionamiento interno fija el rol y nunca devuelve el password', async () => {
  let datosCreados;
  const prisma = {
    usuario: {
      findUnique: async () => null,
      create: async ({ data }) => {
        datosCreados = data;
        return {
          id: 'coordinador-1',
          createdAt: new Date('2026-09-24T12:00:00.000Z'),
          ...data,
        };
      },
    },
  };
  const service = new AuthService(prisma, {});

  const resultado = await service.crearCoordinador({
    nombre: 'Coordinación Académica',
    email: 'coordinacion@prueba.com',
    password: 'Segura123',
  });

  assert.equal(datosCreados.rol, 'COORDINADOR');
  assert.equal(await bcrypt.compare('Segura123', datosCreados.password), true);
  assert.equal('password' in resultado, false);
  assert.equal(resultado.rol, 'COORDINADOR');
});

test('el aprovisionamiento interno rechaza correos duplicados', async () => {
  const prisma = {
    usuario: {
      findUnique: async () => ({ id: 'existente' }),
    },
  };
  const service = new AuthService(prisma, {});

  await assert.rejects(
    service.crearCoordinador({
      nombre: 'Coordinación Académica',
      email: 'duplicado@prueba.com',
      password: 'Segura123',
    }),
    (error) => error?.getStatus?.() === 409,
  );
});
