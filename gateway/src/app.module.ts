import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthController } from './health.controller.js';

@Module({
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
