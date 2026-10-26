import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

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
