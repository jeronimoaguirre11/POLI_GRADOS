import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmpresasController } from './empresas.controller.js';
import { EmpresasService } from './empresas.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [EmpresasController],
  providers: [EmpresasService, JwtAuthGuard],
})
export class EmpresasModule {}
