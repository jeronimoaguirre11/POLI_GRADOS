-- AlterTable
ALTER TABLE "Postulacion" ADD COLUMN     "observacionesEmpresa" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
