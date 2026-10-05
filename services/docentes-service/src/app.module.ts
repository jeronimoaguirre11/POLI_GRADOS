import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { DocentesModule } from './modules/docentes/docentes.module.js';

@Module({
  imports: [
    PrismaModule,
    DocentesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}