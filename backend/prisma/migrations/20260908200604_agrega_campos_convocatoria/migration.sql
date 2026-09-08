/*
  Warnings:

  - Added the required column `duracionMeses` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaFinConvocatoria` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicioConvocatoria` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicioPractica` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funciones` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modalidadContratacion` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubicacion` to the `Oferta` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `perfilBuscado` on the `Oferta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PerfilBuscado" AS ENUM ('TECNOLOGIA_AGROPECUARIA', 'ADMINISTRACION_EMPRESAS_AGROPECUARIAS', 'INGENIERO_AGROPECUARIO');

-- CreateEnum
CREATE TYPE "ModalidadContratacion" AS ENUM ('CONTRATO_SENA', 'CONVENIO', 'VOLUNTARIA');

-- AlterTable
ALTER TABLE "Oferta" ADD COLUMN     "duracionMeses" INTEGER NOT NULL,
ADD COLUMN     "fechaFinConvocatoria" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaInicioConvocatoria" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaInicioPractica" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "funciones" TEXT NOT NULL,
ADD COLUMN     "modalidadContratacion" "ModalidadContratacion" NOT NULL,
ADD COLUMN     "ubicacion" TEXT NOT NULL,
DROP COLUMN "perfilBuscado",
ADD COLUMN     "perfilBuscado" "PerfilBuscado" NOT NULL;
