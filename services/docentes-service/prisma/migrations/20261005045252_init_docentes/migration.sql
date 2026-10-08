-- CreateTable
CREATE TABLE "Docente" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "programa" TEXT,
    "especialidad" TEXT,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Docente_usuarioId_key" ON "Docente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_identificacion_key" ON "Docente"("identificacion");
