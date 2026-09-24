// Debe ser el primer import: carga las variables de .env en process.env
// antes de que el resto del archivo las lea.
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AppModule } from './app.module.js';

// Un prefijo por microservicio. El gateway NUNCA reenvia nada bajo
// /internal: esas rutas solo se llaman servicio-a-servicio, directo por su
// URL interna (ver los .env de cada servicio), nunca a traves de aca.
function construirRutas(): Array<{ prefijo: string; destino: string }> {
  const rutas: Array<{ prefijo: string; destino: string | undefined }> = [
    { prefijo: '/auth', destino: process.env.AUTH_SERVICE_URL },
    { prefijo: '/empresas', destino: process.env.EMPRESAS_SERVICE_URL },
    { prefijo: '/estudiantes', destino: process.env.ESTUDIANTES_SERVICE_URL },
    {
      prefijo: '/postulaciones',
      destino: process.env.POSTULACIONES_SERVICE_URL,
    },
    {
      prefijo: '/coordinadores',
      destino: process.env.COORDINADORES_SERVICE_URL,
    },
    // El listado publico de convocatorias abiertas vive en empresas-service,
    // pero su ruta (heredada del monolito, ver ofertas.controller.ts) es
    // /ofertas y no /empresas/ofertas, asi que necesita su propio prefijo.
    { prefijo: '/ofertas', destino: process.env.EMPRESAS_SERVICE_URL },
  ];

  return rutas.map(({ prefijo, destino }) => {
    if (!destino) {
      throw new Error(
        `Falta configurar la URL de destino para ${prefijo} en el .env del gateway`,
      );
    }
    return { prefijo, destino };
  });
}

async function bootstrap() {
  // bodyParser: false es clave: el gateway no debe leer ni parsear el body
  // de ninguna request. Si lo hiciera, el stream original ya estaria
  // consumido cuando http-proxy-middleware intente reenviarlo, y se
  // romperian las subidas de archivos (imagen de oferta, hoja de vida) y
  // cualquier POST/PATCH con JSON.
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.enableCors({
    origin: [
      process.env.FRONTEND_AUTH_URL,
      process.env.FRONTEND_EMPRESAS_URL,
      process.env.FRONTEND_ESTUDIANTES_URL,
      process.env.FRONTEND_POSTULACIONES_URL,
      process.env.FRONTEND_COORDINADORES_URL,
    ].filter((origen): origen is string => Boolean(origen)),
    // Necesario para que el frontend pueda leer el nombre del archivo al
    // descargar la hoja de vida (ver empresas.controller.ts).
    exposedHeaders: ['Content-Disposition'],
  });

  for (const { prefijo, destino } of construirRutas()) {
    app.use(
      prefijo,
      createProxyMiddleware({
        target: destino,
        changeOrigin: true,
        // Al montar el middleware con app.use(prefijo, ...), Express le
        // quita el prefijo del path antes de que llegue aca. Se lo volvemos
        // a poner porque el microservicio de destino sigue esperando sus
        // rutas completas, con el prefijo incluido (p. ej. /auth/register).
        pathRewrite: (path) => `${prefijo}${path}`,
      }),
    );
  }

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
