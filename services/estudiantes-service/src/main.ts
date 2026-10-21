import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser'; // lo añadimos por seguridad, para poder leer cookies firmadas en las peticiones entrantes

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // lo añadimos por seguridad, para poder leer cookies firmadas en las peticiones entrantes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3003);
}
await bootstrap();
