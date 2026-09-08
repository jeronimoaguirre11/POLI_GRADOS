import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

// @Global() para no tener que importar PrismaModule en cada modulo de
// funcionalidad (Empresas, Estudiantes, etc.) que necesite hablar con la BD.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
