import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string;
  email: string;
  rol: 'ESTUDIANTE' | 'EMPRESA' | 'COORDINADOR' | 'DOCENTE' | 'SUPERADMIN';
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string | undefined = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      request.user = await this.jwtService.verifyAsync<JwtPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException('Token invalido o expirado');
    }
  }
}
