import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { CoordinadoresModule } from './modules/coordinadores/coordinadores.module.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [CoordinadoresModule],
  controllers: [AppController, HealthController],
})
export class AppModule {}
