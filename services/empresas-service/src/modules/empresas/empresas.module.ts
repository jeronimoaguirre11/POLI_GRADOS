import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmpresasController } from './empresas.controller.js';
import { EmpresasService } from './empresas.service.js';
import { InternalController } from './internal.controller.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [EmpresasController, InternalController],
  providers: [EmpresasService],
})
export class EmpresasModule {}
