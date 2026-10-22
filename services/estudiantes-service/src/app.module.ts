import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { EstudiantesModule } from './modules/estudiantes/estudiantes.module.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [PrismaModule, EstudiantesModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
