import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';

// Envuelve el PrismaClient generado para que NestJS lo maneje como un
// provider mas: se conecta cuando arranca el modulo y se desconecta al
// apagar la app, en vez de dejarlo suelto.
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
