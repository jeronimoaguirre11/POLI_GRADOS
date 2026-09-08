/*
  Warnings:

  - A unique constraint covering the columns `[ofertaId,estudianteId]` on the table `Postulacion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Estudiante" ALTER COLUMN "semestre" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Postulacion_ofertaId_estudianteId_key" ON "Postulacion"("ofertaId", "estudianteId");
