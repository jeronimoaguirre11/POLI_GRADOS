import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthController } from './health.controller.js';
import { GraphqlApiModule } from './graphql/graphql-api.module.js';

@Module({
  imports: [GraphqlApiModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
