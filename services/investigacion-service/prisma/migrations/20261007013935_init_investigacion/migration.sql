-- CreateEnum
CREATE TYPE "EstadoInvestigacion" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Investigacion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "duracionMeses" INTEGER NOT NULL,
    "metodologia" TEXT NOT NULL,
    "objetivos" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "estado" "EstadoInvestigacion" NOT NULL DEFAULT 'PENDIENTE',
    "estudianteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investigacion_pkey" PRIMARY KEY ("id")
);
