-- CreateTable
CREATE TABLE "Postulacion" (
    "id" TEXT NOT NULL,
    "ofertaId" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "hojaVidaUrl" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "observacionesEmpresa" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Postulacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Postulacion_ofertaId_estudianteId_key" ON "Postulacion"("ofertaId", "estudianteId");
