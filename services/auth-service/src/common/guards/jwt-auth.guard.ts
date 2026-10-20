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

// Igual al guard del backend monolitico original: cada microservicio lo
// duplica y registra su propio JwtModule con el mismo JWT_SECRET, asi que
// todos validan exactamente los mismos tokens que emite auth-service.
// El token viaja en una cookie httpOnly (la pone auth-service al hacer
// login), por lo que ya no se lee del header Authorization.
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string | undefined = request.cookies?.token; //añadimos la cookie token a la request para que el guard pueda leerla

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
