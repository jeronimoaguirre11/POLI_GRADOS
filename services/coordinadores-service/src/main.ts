// Debe ser el primer import para cargar PORT, JWT_SECRET y las URLs de los
// otros microservicios antes de inicializar los modulos de Nest.
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser'; // lo añadimos por seguridad, para poder leer cookies firmadas en las peticiones entrantes

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // lo añadimos por seguridad, para poder leer cookies firmadas en las peticiones entrantes
  await app.listen(process.env.PORT ?? 3005);
}

await bootstrap();
