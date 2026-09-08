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
  rol: 'ESTUDIANTE' | 'EMPRESA' | 'COORDINADOR' | 'DOCENTE';
}

// Guard propio (en vez de usar passport-jwt) porque AuthModule no exporta
// JwtModule/JwtService todavia. Cada modulo que lo usa registra su propio
// JwtModule con el mismo JWT_SECRET, asi que valida exactamente los mismos
// tokens que emite AuthService.login(). Vive en common/ porque lo usan
// varios modulos (empresas, ofertas, postulaciones).
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.slice('Bearer '.length);

    try {
      request.user = await this.jwtService.verifyAsync<JwtPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException('Token invalido o expirado');
    }
  }
}
