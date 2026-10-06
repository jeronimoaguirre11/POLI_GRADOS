import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DocentesController } from './docentes.controller.js';
import { InternalDocentesController } from './internal-docentes.controller.js';
import { DocentesService } from './docentes.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [
    DocentesController,
    InternalDocentesController,
  ],
  providers: [DocentesService],
  exports: [DocentesService],
})
export class DocentesModule {}