import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { InvestigacionModule } from './modules/investigacion/investigacion.module.js';

@Module({
  imports: [PrismaModule, InvestigacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
