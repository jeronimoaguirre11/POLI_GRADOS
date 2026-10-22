import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  estado() {
    return { servicio: 'administracion-service', estado: 'ok' };
  }
}
