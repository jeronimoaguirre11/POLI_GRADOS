-- CreateTable
CREATE TABLE "AsignacionDocente" (
    "id" TEXT NOT NULL,
    "docenteId" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "fechaAsignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AsignacionDocente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AsignacionDocente_estudianteId_key" ON "AsignacionDocente"("estudianteId");

-- CreateIndex
CREATE INDEX "AsignacionDocente_docenteId_idx" ON "AsignacionDocente"("docenteId");

-- AddForeignKey
ALTER TABLE "AsignacionDocente" ADD CONSTRAINT "AsignacionDocente_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
