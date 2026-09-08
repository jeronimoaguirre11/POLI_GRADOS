// Debe ser el primer import: carga las variables de .env (como DATABASE_URL,
// JWT_SECRET) en process.env antes de que cualquier otro modulo las lea.
import 'dotenv/config';
import { join } from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Permite que el frontend (otro puerto, http://localhost:5173) llame a esta API.
  app.enableCors();
  // Valida y limpia automaticamente el body de cada request contra los DTO.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Sirve las imagenes subidas (fotos de convocatorias) en /uploads/...
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
