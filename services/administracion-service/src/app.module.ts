import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { HealthController } from './health.controller.js';
import { AdministracionModule } from './modules/administracion/administracion.module.js';

@Module({
  imports: [AdministracionModule],
  controllers: [AppController, HealthController],
})
export class AppModule {}
