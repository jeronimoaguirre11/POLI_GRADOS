import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuditoriaController } from './auditoria.controller.js';
import { InternalController } from './internal.controller.js';
import { AuditoriaService } from './auditoria.service.js';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [AuditoriaController, InternalController],
  providers: [AuditoriaService],
})
export class AuditoriaModule {}
