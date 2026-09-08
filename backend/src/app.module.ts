import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { EmpresasModule } from './modules/empresas/empresas.module.js';
import { OfertasModule } from './modules/ofertas/ofertas.module.js';
import { PostulacionesModule } from './modules/postulaciones/postulaciones.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmpresasModule,
    OfertasModule,
    PostulacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
