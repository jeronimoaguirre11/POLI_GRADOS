-- CreateEnum
CREATE TYPE "EstadoDiplomado" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "EstadoInscripcion" AS ENUM ('INSCRITO', 'CANCELADO');

-- CreateTable
CREATE TABLE "Diplomado" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "duracionHoras" INTEGER NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "cuposTotales" INTEGER NOT NULL,
    "cuposDisponibles" INTEGER NOT NULL,
    "estado" "EstadoDiplomado" NOT NULL DEFAULT 'ACTIVO',
    "creadoPorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diplomado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" TEXT NOT NULL,
    "diplomadoId" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "estado" "EstadoInscripcion" NOT NULL DEFAULT 'INSCRITO',
    "fechaInscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_diplomadoId_estudianteId_key" ON "Inscripcion"("diplomadoId", "estudianteId");

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_diplomadoId_fkey" FOREIGN KEY ("diplomadoId") REFERENCES "Diplomado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
