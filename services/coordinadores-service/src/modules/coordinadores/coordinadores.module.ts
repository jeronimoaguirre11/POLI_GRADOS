import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CoordinadoresController } from './coordinadores.controller.js';
import { CoordinadoresService } from './coordinadores.service.js';
import { ReportesService } from './reportes.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [CoordinadoresController],
  providers: [CoordinadoresService, ReportesService],
})
export class CoordinadoresModule {}
