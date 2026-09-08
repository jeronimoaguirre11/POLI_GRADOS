-- La postulacion existente es solo un dato de prueba (de antes de que
-- existiera la hoja de vida), asi que se elimina en vez de rellenarla,
-- y luego se agrega la columna como obligatoria sobre la tabla ya vacia.
DELETE FROM "Postulacion";

-- AlterTable
ALTER TABLE "Postulacion" ADD COLUMN "hojaVidaUrl" TEXT NOT NULL;
