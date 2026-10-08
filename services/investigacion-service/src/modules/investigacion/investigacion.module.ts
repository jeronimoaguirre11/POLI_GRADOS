import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InvestigacionController } from './investigacion.controller.js';
import { InternalController } from './internal.controller.js';
import { InvestigacionService } from './investigacion.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [InvestigacionController, InternalController],
  providers: [InvestigacionService],
})
export class InvestigacionModule {}
