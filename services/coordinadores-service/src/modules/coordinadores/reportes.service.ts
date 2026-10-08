import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import PDFDocument from 'pdfkit';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard.js';

interface ConvocatoriaActiva {
  id: string;
  titulo: string;
  perfilBuscado: string;
  modalidadContratacion: string;
  ubicacion: string;
  fechaInicioConvocatoria: string;
  fechaFinConvocatoria: string;
  fechaInicioPractica: string;
  duracionMeses: number;
  estado: string;
  fechaPublicacion: string;
  empresa: {
    nombreEmpresa: string;
    nit: string;
    sector: string;
  };
}

const PERFILES: Record<string, string> = {
  TECNOLOGIA_AGROPECUARIA: 'Tecnología Agropecuaria',
  ADMINISTRACION_EMPRESAS_AGROPECUARIAS:
    'Administración de Empresas Agropecuarias',
  INGENIERO_AGROPECUARIO: 'Ingeniería Agropecuaria',
};

const MODALIDADES: Record<string, string> = {
  CONTRATO_SENA: 'Contrato SENA',
  CONVENIO: 'Convenio',
  VOLUNTARIA: 'Práctica voluntaria',
};

@Injectable()
export class ReportesService {
  private asegurarRolCoordinador(payload: JwtPayload) {
    if (payload.rol !== 'COORDINADOR') {
      throw new ForbiddenException(
        'Solo las cuentas de coordinador pueden descargar este reporte',
      );
    }
  }

  private headersInternos() {
    return { 'x-internal-key': process.env.INTERNAL_API_KEY ?? '' };
  }

  private urlServicio(nombre: string) {
    const valor = process.env[nombre];
    if (!valor) {
      throw new InternalServerErrorException(
        `Falta configurar ${nombre} en coordinadores-service`,
      );
    }
    return valor.replace(/\/$/, '');
  }

  private fechaLegible(fecha: string) {
    const valor = new Date(fecha);
    if (Number.isNaN(valor.getTime())) return 'Sin registrar';

    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'America/Bogota',
    }).format(valor);
  }

  private async obtenerConvocatorias() {
    const respuesta = await axios.get<ConvocatoriaActiva[]>(
      `${this.urlServicio('EMPRESAS_SERVICE_URL')}/internal/ofertas/activas-reporte`,
      { headers: this.headersInternos(), timeout: 5000 },
    );

    if (!Array.isArray(respuesta.data)) {
      throw new InternalServerErrorException(
        'empresas-service devolvió una respuesta inválida',
      );
    }

    return respuesta.data;
  }

  private async obtenerConteos(ofertaIds: string[]) {
    if (ofertaIds.length === 0) return {};

    const lotes: string[][] = [];
    for (let indice = 0; indice < ofertaIds.length; indice += 100) {
      lotes.push(ofertaIds.slice(indice, indice + 100));
    }

    const respuestas = await Promise.all(
      lotes.map((ids) =>
        axios.get<Record<string, number>>(
          `${this.urlServicio('POSTULACIONES_SERVICE_URL')}/internal/conteo-por-ofertas`,
          {
            headers: this.headersInternos(),
            params: { ofertaIds: ids.join(',') },
            timeout: 5000,
          },
        ),
      ),
    );

    return Object.assign({}, ...respuestas.map((respuesta) => respuesta.data));
  }

  private escribirDato(
    documento: PDFKit.PDFDocument,
    etiqueta: string,
    valor: string,
    x: number,
    y: number,
    ancho: number,
  ) {
    documento
      .font('Helvetica-Bold')
      .fontSize(7)
      .fillColor('#758078')
      .text(etiqueta.toUpperCase(), x, y, { width: ancho });
    documento
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#263028')
      .text(valor || 'Sin registrar', x, y + 11, {
        width: ancho,
        height: 25,
        ellipsis: true,
      });
  }

  private construirPdf(
    convocatorias: ConvocatoriaActiva[],
    conteos: Record<string, number>,
  ) {
    const documento = new PDFDocument({
      size: 'A4',
      margin: 44,
      bufferPages: true,
      info: {
        Title: 'Reporte de convocatorias activas',
        Author: 'POLI_GRADOS',
        Subject: 'Convocatorias de prácticas profesionales activas',
      },
    });
    const fragmentos: Buffer[] = [];
    const terminado = new Promise<Buffer>((resolve, reject) => {
      documento.on('data', (fragmento: Buffer) => fragmentos.push(fragmento));
      documento.on('end', () => resolve(Buffer.concat(fragmentos)));
      documento.on('error', reject);
    });

    documento.rect(0, 0, documento.page.width, 112).fill('#0d5904');
    documento
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#dcebd9')
      .text('POLI_GRADOS · COORDINACIÓN ACADÉMICA', 44, 34);
    documento
      .font('Helvetica-Bold')
      .fontSize(22)
      .fillColor('#ffffff')
      .text('Convocatorias activas', 44, 54);
    documento
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#dcebd9')
      .text(
        `Generado el ${new Intl.DateTimeFormat('es-CO', {
          dateStyle: 'long',
          timeStyle: 'short',
          timeZone: 'America/Bogota',
        }).format(new Date())}`,
        44,
        84,
      );

    documento.y = 132;
    documento
      .roundedRect(44, documento.y, 507, 48, 8)
      .fillAndStroke('#edf5ec', '#cfe0cc');
    documento
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#526055')
      .text('Total de convocatorias activas', 60, documento.y + 12);
    documento
      .font('Helvetica-Bold')
      .fontSize(18)
      .fillColor('#0d5904')
      .text(String(convocatorias.length), 480, documento.y + 10, {
        width: 52,
        align: 'right',
      });
    documento.y += 70;

    if (convocatorias.length === 0) {
      documento
        .font('Helvetica-Bold')
        .fontSize(14)
        .fillColor('#263028')
        .text('No hay convocatorias activas', 44, documento.y + 28, {
          width: 507,
          align: 'center',
        });
      documento
        .font('Helvetica')
        .fontSize(9)
        .fillColor('#758078')
        .text(
          'Cuando una empresa publique una convocatoria abierta, aparecerá en este reporte.',
          80,
          documento.y + 54,
          { width: 435, align: 'center' },
        );
    }

    for (const [indice, convocatoria] of convocatorias.entries()) {
      const alto = 165;
      if (documento.y + alto > documento.page.height - 90) {
        documento.addPage();
        documento.y = 44;
      }

      const y = documento.y;
      documento.roundedRect(44, y, 507, alto - 10, 8).stroke('#dce3dd');
      documento.roundedRect(54, y + 12, 28, 22, 5).fill('#eaf4e8');
      documento
        .font('Helvetica-Bold')
        .fontSize(9)
        .fillColor('#0d5904')
        .text(String(indice + 1).padStart(2, '0'), 54, y + 19, {
          width: 28,
          align: 'center',
        });
      documento
        .font('Helvetica-Bold')
        .fontSize(12)
        .fillColor('#172019')
        .text(convocatoria.titulo, 92, y + 12, {
          width: 325,
          height: 26,
          ellipsis: true,
        });
      documento
        .font('Helvetica-Bold')
        .fontSize(8)
        .fillColor('#0d5904')
        .text(`${conteos[convocatoria.id] ?? 0} postulaciones`, 424, y + 18, {
          width: 112,
          align: 'right',
        });

      this.escribirDato(
        documento,
        'Empresa',
        `${convocatoria.empresa.nombreEmpresa} · NIT ${convocatoria.empresa.nit}`,
        60,
        y + 48,
        230,
      );
      this.escribirDato(
        documento,
        'Sector y ubicación',
        `${convocatoria.empresa.sector} · ${convocatoria.ubicacion}`,
        310,
        y + 48,
        225,
      );
      this.escribirDato(
        documento,
        'Perfil buscado',
        PERFILES[convocatoria.perfilBuscado] ?? convocatoria.perfilBuscado,
        60,
        y + 84,
        230,
      );
      this.escribirDato(
        documento,
        'Modalidad',
        MODALIDADES[convocatoria.modalidadContratacion] ??
          convocatoria.modalidadContratacion,
        310,
        y + 84,
        225,
      );
      this.escribirDato(
        documento,
        'Convocatoria',
        `${this.fechaLegible(convocatoria.fechaInicioConvocatoria)} al ${this.fechaLegible(convocatoria.fechaFinConvocatoria)}`,
        60,
        y + 120,
        230,
      );
      this.escribirDato(
        documento,
        'Inicio y duración de práctica',
        `${this.fechaLegible(convocatoria.fechaInicioPractica)} · ${convocatoria.duracionMeses} meses`,
        310,
        y + 120,
        225,
      );

      documento.y = y + alto;
    }

    const paginas = documento.bufferedPageRange();
    for (let indice = 0; indice < paginas.count; indice += 1) {
      documento.switchToPage(paginas.start + indice);
      documento
        .moveTo(44, documento.page.height - 78)
        .lineTo(551, documento.page.height - 78)
        .strokeColor('#dce3dd')
        .stroke();
      documento
        .font('Helvetica')
        .fontSize(7)
        .fillColor('#849087')
        .text(
          'Documento generado automáticamente por POLI_GRADOS',
          44,
          documento.page.height - 68,
          {
            width: 380,
          },
        );
      documento.text(
        `Página ${indice + 1} de ${paginas.count}`,
        430,
        documento.page.height - 68,
        { width: 121, align: 'right' },
      );
    }

    documento.end();
    return terminado;
  }

  async generarConvocatoriasActivas(payload: JwtPayload) {
    this.asegurarRolCoordinador(payload);

    try {
      const convocatorias = await this.obtenerConvocatorias();
      const conteos = await this.obtenerConteos(
        convocatorias.map((convocatoria) => convocatoria.id),
      );
      const archivo = await this.construirPdf(convocatorias, conteos);
      const fecha = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Bogota',
      }).format(new Date());

      return {
        archivo,
        nombreArchivo: `convocatorias-activas-${fecha}.pdf`,
      };
    } catch (error) {
      if (
        error instanceof ForbiddenException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'No fue posible generar el reporte de convocatorias activas',
      );
    }
  }
}
