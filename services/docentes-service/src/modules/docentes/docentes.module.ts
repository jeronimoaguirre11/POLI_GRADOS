import { Module } from '@nestjs/common';
import { DocentesController } from './docentes.controller.js';
import { InternalDocentesController } from './internal-docentes.controller.js';
import { DocentesService } from './docentes.service.js';

@Module({
  controllers: [
    DocentesController,
    InternalDocentesController,
  ],
  providers: [DocentesService],
  exports: [DocentesService],
})
export class DocentesModule {}