import 'dotenv/config';
import { join } from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Fotos de las convocatorias. Se sirven bajo /empresas/uploads/... (no
  // /uploads/...) a proposito: asi el proxy /empresas del gateway ya las
  // cubre sin agregar una regla nueva.
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/empresas/uploads/',
  });
  await app.listen(process.env.PORT ?? 3002);
}
await bootstrap();
