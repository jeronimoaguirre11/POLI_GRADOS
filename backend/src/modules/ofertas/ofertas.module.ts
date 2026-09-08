import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OfertasController } from './ofertas.controller.js';
import { OfertasService } from './ofertas.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [OfertasController],
  providers: [OfertasService],
})
export class OfertasModule {}
