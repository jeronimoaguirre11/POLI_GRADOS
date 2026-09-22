import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { PostulacionesModule } from './modules/postulaciones/postulaciones.module.js';

@Module({
  imports: [PrismaModule, PostulacionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
