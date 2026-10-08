import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  estado() {
    return { servicio: 'coordinadores-service', estado: 'ok' };
  }
}
