import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdministracionController } from './administracion.controller.js';
import { AdministracionService } from './administracion.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AdministracionController],
  providers: [AdministracionService],
})
export class AdministracionModule {}
