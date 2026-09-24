import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { CoordinadoresModule } from './modules/coordinadores/coordinadores.module.js';

@Module({
  imports: [CoordinadoresModule],
  controllers: [AppController],
})
export class AppModule {}
