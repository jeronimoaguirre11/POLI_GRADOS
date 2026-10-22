import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { EmpresasModule } from './modules/empresas/empresas.module.js';
import { OfertasModule } from './modules/ofertas/ofertas.module.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [PrismaModule, EmpresasModule, OfertasModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
