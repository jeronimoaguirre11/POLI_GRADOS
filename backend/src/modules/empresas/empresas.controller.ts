import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { EmpresasService } from './empresas.service.js';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { ActualizarOfertaDto } from './dto/actualizar-oferta.dto.js';
import { ActualizarPostulacionDto } from './dto/actualizar-postulacion.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@Controller('empresas')
@UseGuards(JwtAuthGuard)
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Get('perfil')
  async obtenerPerfil(@Req() request: any) {
    return this.empresasService.obtenerPerfil(request.user);
  }

  @Post('ofertas')
  @UseInterceptors(FileInterceptor('imagen'))
  async crearOferta(
    @Req() request: any,
    @Body() dto: CrearOfertaDto,
    @UploadedFile() imagen?: any,
  ) {
    return this.empresasService.crearOferta(request.user, dto, imagen);
  }

  @Get('ofertas')
  async listarOfertas(@Req() request: any) {
    return this.empresasService.listarOfertas(request.user);
  }

  @Get('ofertas/:id/postulaciones')
  async listarPostulantes(@Req() request: any, @Param('id') ofertaId: string) {
    return this.empresasService.listarPostulantes(request.user, ofertaId);
  }

  @Patch('postulaciones/:id')
  async actualizarPostulacion(
    @Req() request: any,
    @Param('id') postulacionId: string,
    @Body() dto: ActualizarPostulacionDto,
  ) {
    return this.empresasService.actualizarPostulacion(
      request.user,
      postulacionId,
      dto,
    );
  }

  @Get('postulaciones/:id/hoja-vida')
  async descargarHojaVida(
    @Req() request: any,
    @Param('id') postulacionId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const archivo = await this.empresasService.obtenerHojaVida(
      request.user,
      postulacionId,
    );

    response.set({
      'Content-Type': archivo.mimeType,
      'Content-Disposition': `attachment; filename="${archivo.nombreArchivo}"`,
      'Cache-Control': 'private, no-store',
    });

    return new StreamableFile(archivo.contenido);
  }

  @Patch('ofertas/:id')
  @UseInterceptors(FileInterceptor('imagen'))
  async actualizarOferta(
    @Req() request: any,
    @Param('id') id: string,
    @Body() dto: ActualizarOfertaDto,
    @UploadedFile() imagen?: any,
  ) {
    return this.empresasService.actualizarOferta(request.user, id, dto, imagen);
  }

  @Delete('ofertas/:id')
  async eliminarOferta(@Req() request: any, @Param('id') id: string) {
    return this.empresasService.eliminarOferta(request.user, id);
  }
}
