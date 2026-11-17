// Crea la base de datos de auditoria si todavia no existe. Hace falta porque
// db-init/init-microservicios.sql solo corre cuando el volumen de Postgres
// se crea desde cero: en una instalacion que ya existia, auditoria_db no
// estaria creada y "prisma migrate deploy" fallaria.
//
// Se ejecuta antes de las migraciones (ver "command" en docker-compose.yml).
import pg from 'pg';

const url = new URL(process.env.DATABASE_URL);
const baseDatos = url.pathname.replace(/^\//, '');
url.pathname = '/postgres';
url.search = '';

const cliente = new pg.Client({ connectionString: url.toString() });
await cliente.connect();
try {
  const { rowCount } = await cliente.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [baseDatos],
  );
  if (rowCount === 0) {
    // El nombre viene de nuestra propia configuracion y se valida: solo
    // letras, numeros y guion bajo.
    if (!/^\w+$/.test(baseDatos)) throw new Error(`Nombre invalido: ${baseDatos}`);
    await cliente.query(`CREATE DATABASE "${baseDatos}"`);
    console.log(`Base de datos ${baseDatos} creada.`);
  }
} finally {
  await cliente.end();
}
