import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EstudiantesController } from './estudiantes.controller.js';
import { InternalController } from './internal.controller.js';
import { EstudiantesService } from './estudiantes.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [EstudiantesController, InternalController],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}
