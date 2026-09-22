// Debe ser el primer import: carga las variables de .env (PORT, DATABASE_URL,
// JWT_SECRET, INTERNAL_API_KEY, ...) en process.env antes de que cualquier
// otro modulo las lea.
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Los frontends (otros puertos) y el gateway llaman a este servicio.
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
