// Debe ser el primer import para cargar PORT, JWT_SECRET y las URLs de los
// otros microservicios antes de inicializar los modulos de Nest.
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3005);
}

await bootstrap();
