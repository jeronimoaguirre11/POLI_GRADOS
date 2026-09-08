import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PostulacionesController } from './postulaciones.controller.js';
import { PostulacionesService } from './postulaciones.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PostulacionesController],
  providers: [PostulacionesService],
})
export class PostulacionesModule {}
