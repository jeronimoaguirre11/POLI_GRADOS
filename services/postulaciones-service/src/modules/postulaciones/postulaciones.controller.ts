import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostulacionesService } from './postulaciones.service.js';
import { CrearPostulacionDto } from './dto/crear-postulacion.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@Controller('postulaciones')
@UseGuards(JwtAuthGuard)
export class PostulacionesController {
  constructor(private readonly postulacionesService: PostulacionesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('hojaVida'))
  async postularse(
    @Req() request: any,
    @Body() dto: CrearPostulacionDto,
    @UploadedFile() hojaVida?: any,
  ) {
    return this.postulacionesService.postularse(
      request.user,
      dto.ofertaId,
      hojaVida,
    );
  }

  @Get('mias')
  async listarMias(@Req() request: any) {
    return this.postulacionesService.listarMias(request.user);
  }

  @Delete(':id')
  async cancelar(@Req() request: any, @Param('id') id: string) {
    return this.postulacionesService.cancelarPostulacion(request.user, id);
  }
}
