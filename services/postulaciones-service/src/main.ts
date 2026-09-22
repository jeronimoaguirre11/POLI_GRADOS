// Debe ser el primer import: carga las variables de .env (como DATABASE_URL,
// JWT_SECRET) en process.env antes de que cualquier otro modulo las lea.
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Permite que el gateway y los frontends (otros puertos) llamen a esta API.
  app.enableCors();
  // Valida y limpia automaticamente el body de cada request contra los DTO.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // No sirve nada estatico: la hoja de vida solo se entrega a traves de la
  // ruta interna autenticada por x-internal-key (ver internal.controller.ts).
  await app.listen(process.env.PORT ?? 3004);
}
await bootstrap();
