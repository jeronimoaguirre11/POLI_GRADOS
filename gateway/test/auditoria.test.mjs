import assert from 'node:assert/strict';
import test from 'node:test';
import { createHmac } from 'node:crypto';
import { describirAccion, leerUsuario } from '../dist/auditoria.js';

function firmar(datos, secreto) {
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const cuerpo = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64(datos)}`;
  return `${cuerpo}.${createHmac('sha256', secreto).update(cuerpo).digest('base64url')}`;
}

test('traduce cada ruta a una accion legible', () => {
  assert.equal(describirAccion('POST', '/administracion/usuarios/coordinadores'), 'Crear coordinador');
  assert.equal(
    describirAccion('PATCH', '/administracion/usuarios/3f2b/password'),
    'Cambiar contraseña de una cuenta',
  );
  assert.equal(describirAccion('PATCH', '/administracion/usuarios/3f2b'), 'Editar nombre o correo de una cuenta');
  assert.equal(describirAccion('GET', '/empresas/postulaciones/9/hoja-vida'), 'Descargar hoja de vida');
  assert.equal(describirAccion('GET', '/empresas/ofertas'), undefined);
});

test('lee el usuario solo de un JWT valido y vigente', () => {
  const vigente = Math.floor(Date.now() / 1000) + 60;
  const token = firmar({ sub: 'u1', email: 'a@p.com', rol: 'DOCENTE', exp: vigente }, 'secreto');

  assert.deepEqual(
    { ...leerUsuario(token, 'secreto'), exp: undefined },
    { sub: 'u1', email: 'a@p.com', rol: 'DOCENTE', exp: undefined },
  );
  assert.equal(leerUsuario(token, 'otro-secreto'), undefined);
  assert.equal(leerUsuario(firmar({ sub: 'u1', exp: 1 }, 'secreto'), 'secreto'), undefined);
  assert.equal(leerUsuario('basura', 'secreto'), undefined);
  assert.equal(leerUsuario(undefined, 'secreto'), undefined);
});
