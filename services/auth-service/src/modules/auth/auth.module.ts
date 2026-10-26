import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { InternalController } from './internal.controller.js';
import { SuperadminInicialService } from './superadmin-inicial.service.js';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController, InternalController],
  providers: [AuthService, SuperadminInicialService],
})
export class AuthModule {}
