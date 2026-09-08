// Debe ser el primer import: carga las variables de .env (como DATABASE_URL,
// JWT_SECRET) en process.env antes de que cualquier otro modulo las lea.
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Permite que el frontend (otro puerto, http://localhost:5173) llame a esta API.
  app.enableCors();
  // Valida y limpia automaticamente el body de cada request contra los DTO.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
