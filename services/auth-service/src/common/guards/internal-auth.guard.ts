import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

// Protege las rutas /internal/* (solo las llaman otros microservicios entre
// si, nunca el gateway ni un frontend). El gateway ni siquiera reenvia rutas
// /internal/*, pero este guard es una segunda capa de seguridad: exige un
// header compartido por variable de entorno en vez de un JWT de usuario.
@Injectable()
export class InternalAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clave = request.headers?.['x-internal-key'];

    if (!clave || clave !== process.env.INTERNAL_API_KEY) {
      throw new UnauthorizedException('Clave interna invalida o ausente');
    }

    return true;
  }
}
