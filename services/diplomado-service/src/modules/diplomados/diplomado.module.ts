// src/modules/diplomado/diplomado.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DiplomadoController } from './diplomado.controller.js';
import { InternalController } from './internal.controller.js';
import { DiplomadoService } from './diplomado.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [DiplomadoController, InternalController],
  providers: [DiplomadoService],
})
export class DiplomadoModule {}
