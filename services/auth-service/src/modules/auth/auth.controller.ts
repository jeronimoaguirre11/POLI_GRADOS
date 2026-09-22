import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

// Mismo prefijo y rutas que en el backend monolitico original: el gateway
// reenvia todo lo que empiece en /auth tal cual a este microservicio, sin
// reescribir la ruta, asi que el contrato con el frontend no cambia.
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Patch('perfil')
  @UseGuards(JwtAuthGuard)
  async actualizarPerfil(@Req() request: any, @Body() dto: ActualizarPerfilDto) {
    return this.authService.actualizarPerfil(request.user, dto);
  }
}
