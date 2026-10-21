// Debe ser el primer import para cargar PORT, JWT_SECRET y las URLs de los
// otros microservicios antes de inicializar los modulos de Nest.
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // El JWT de sesión llega en una cookie httpOnly; sin esto request.cookies
  // queda undefined y el guard rechaza todas las peticiones.
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3005);
}

await bootstrap();
