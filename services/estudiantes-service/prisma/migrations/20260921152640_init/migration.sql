-- CreateTable
CREATE TABLE "Estudiante" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "programa" TEXT NOT NULL,
    "semestre" INTEGER,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_usuarioId_key" ON "Estudiante"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_codigo_key" ON "Estudiante"("codigo");
