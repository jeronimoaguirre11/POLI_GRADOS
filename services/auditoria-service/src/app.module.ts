import { Module } from '@nestjs/common';
import { HealthController } from './health.controller.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { AuditoriaModule } from './modules/auditoria/auditoria.module.js';

@Module({
  imports: [PrismaModule, AuditoriaModule],
  controllers: [HealthController],
})
export class AppModule {}
