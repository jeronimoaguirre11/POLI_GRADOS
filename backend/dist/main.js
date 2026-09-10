import 'dotenv/config';
import { join } from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ exposedHeaders: ['Content-Disposition'] });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useStaticAssets(join(process.cwd(), 'uploads', 'ofertas'), {
        prefix: '/uploads/ofertas/',
    });
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
//# sourceMappingURL=main.js.map