import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ActualizarPerfilDto } from './dto/actualizar-perfil.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

// Las mismas opciones deben usarse al crear y al borrar la cookie; si no,
// el navegador no reconoce que es la misma y no la elimina.
// Sin maxAge a proposito: es cookie de sesion y se borra al cerrar el
// navegador. COOKIE_SECURE=true solo cuando se sirva por HTTPS.
function opcionesCookie() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.COOKIE_SECURE === 'true',
    path: '/',
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this.authService.login(dto);
    res.cookie('token', token, opcionesCookie());
    return { message: 'Inicio de sesión exitoso' };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', opcionesCookie());
    return { message: 'Sesión cerrada' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() request: any) {
    return this.authService.obtenerPerfil(request.user);
  }

  @Patch('perfil')
  @UseGuards(JwtAuthGuard)
  async actualizarPerfil(
    @Req() request: any,
    @Body() dto: ActualizarPerfilDto,
  ) {
    return this.authService.actualizarPerfil(request.user, dto);
  }
}
