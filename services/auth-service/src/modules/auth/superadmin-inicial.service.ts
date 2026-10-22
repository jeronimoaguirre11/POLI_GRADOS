import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './auth.service.js';

// Crea el unico super administrador de la plataforma al arrancar
// auth-service, a partir de SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD /
// SUPERADMIN_NOMBRE. Es idempotente: si ya existe no hace nada, asi que
// reiniciar el servicio nunca crea otro ni sobreescribe la contrasena.
@Injectable()
export class SuperadminInicialService implements OnApplicationBootstrap {
  private readonly logger = new Logger('SuperadminInicial');

  constructor(private readonly authService: AuthService) {}

  async onApplicationBootstrap() {
    try {
      const { creado, motivo } =
        await this.authService.asegurarSuperadminInicial();

      const mensajes: Record<string, string> = {
        creado: 'Super administrador inicial creado.',
        'ya-existe': 'Ya existe un super administrador; no se crea otro.',
        'sin-configuracion':
          'SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD no configurados; no se crea el super administrador inicial.',
        'password-invalido':
          'SUPERADMIN_PASSWORD no cumple la politica de contrasenas (8-15 caracteres, mayuscula, minuscula y numero).',
        'email-en-uso':
          'SUPERADMIN_EMAIL ya pertenece a otra cuenta que no es super administrador.',
      };

      const texto = mensajes[motivo] ?? motivo;
      if (creado || motivo === 'ya-existe') this.logger.log(texto);
      else this.logger.warn(texto);
    } catch (error) {
      // Un fallo aqui no debe tumbar el login del resto de usuarios.
      this.logger.error(
        `No se pudo asegurar el super administrador inicial: ${(error as Error).message}`,
      );
    }
  }
}
