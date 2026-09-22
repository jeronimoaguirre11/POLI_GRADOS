-- CreateEnum
CREATE TYPE "PerfilBuscado" AS ENUM ('TECNOLOGIA_AGROPECUARIA', 'ADMINISTRACION_EMPRESAS_AGROPECUARIAS', 'INGENIERO_AGROPECUARIO');

-- CreateEnum
CREATE TYPE "ModalidadContratacion" AS ENUM ('CONTRATO_SENA', 'CONVENIO', 'VOLUNTARIA');

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombreEmpresa" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "sector" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oferta" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "perfilBuscado" "PerfilBuscado" NOT NULL,
    "modalidadContratacion" "ModalidadContratacion" NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "funciones" TEXT NOT NULL,
    "fechaInicioConvocatoria" TIMESTAMP(3) NOT NULL,
    "fechaFinConvocatoria" TIMESTAMP(3) NOT NULL,
    "fechaInicioPractica" TIMESTAMP(3) NOT NULL,
    "duracionMeses" INTEGER NOT NULL,
    "imagenUrl" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'ABIERTA',
    "fechaPublicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Oferta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_usuarioId_key" ON "Empresa"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nit_key" ON "Empresa"("nit");

-- AddForeignKey
ALTER TABLE "Oferta" ADD CONSTRAINT "Oferta_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
