-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ESTUDIANTE', 'EMPRESA', 'COORDINADOR', 'DOCENTE');

-- CreateEnum
CREATE TYPE "Modalidad" AS ENUM ('INVESTIGACION', 'DIPLOMADO', 'PRACTICA');

-- CreateEnum
CREATE TYPE "TipoDocente" AS ENUM ('DOCENTE', 'EGRESADO');

-- CreateEnum
CREATE TYPE "TipoPractica" AS ENUM ('UNIVERSIDAD', 'INDEPENDIENTE');

-- CreateTable
CREATE TABLE "Coordinador" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cargo" TEXT,

    CONSTRAINT "Coordinador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "programa" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Docente" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" "TipoDocente" NOT NULL,
    "especialidad" TEXT NOT NULL,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcesoGrado" (
    "id" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "modalidad" "Modalidad" NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'EN_PROCESO',
    "asesorId" TEXT,
    "coordinadorId" TEXT,
    "fechaAsignacion" TIMESTAMP(3),
    "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcesoGrado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investigacion" (
    "id" TEXT NOT NULL,
    "procesoGradoId" TEXT NOT NULL,
    "grupoInvestigacion" TEXT NOT NULL,
    "ideaPropuesta" TEXT NOT NULL,
    "materiaMatriculada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Investigacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diplomado" (
    "id" TEXT NOT NULL,
    "procesoGradoId" TEXT NOT NULL,
    "nombreCurso" TEXT NOT NULL,
    "institucion" TEXT NOT NULL,
    "estadoAprobacion" TEXT NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "Diplomado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practica" (
    "id" TEXT NOT NULL,
    "procesoGradoId" TEXT NOT NULL,
    "tipo" "TipoPractica" NOT NULL,
    "horasCompletadas" INTEGER NOT NULL DEFAULT 0,
    "ofertaId" TEXT,
    "estadoReporte" TEXT NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "Practica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oferta" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "perfilBuscado" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ABIERTA',
    "fechaPublicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Oferta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Postulacion" (
    "id" TEXT NOT NULL,
    "ofertaId" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Postulacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordinador_usuarioId_key" ON "Coordinador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_usuarioId_key" ON "Estudiante"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_codigo_key" ON "Estudiante"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_usuarioId_key" ON "Empresa"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nit_key" ON "Empresa"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_usuarioId_key" ON "Docente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcesoGrado_estudianteId_key" ON "ProcesoGrado"("estudianteId");

-- CreateIndex
CREATE UNIQUE INDEX "Investigacion_procesoGradoId_key" ON "Investigacion"("procesoGradoId");

-- CreateIndex
CREATE UNIQUE INDEX "Diplomado_procesoGradoId_key" ON "Diplomado"("procesoGradoId");

-- CreateIndex
CREATE UNIQUE INDEX "Practica_procesoGradoId_key" ON "Practica"("procesoGradoId");

-- AddForeignKey
ALTER TABLE "Coordinador" ADD CONSTRAINT "Coordinador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesoGrado" ADD CONSTRAINT "ProcesoGrado_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesoGrado" ADD CONSTRAINT "ProcesoGrado_asesorId_fkey" FOREIGN KEY ("asesorId") REFERENCES "Docente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesoGrado" ADD CONSTRAINT "ProcesoGrado_coordinadorId_fkey" FOREIGN KEY ("coordinadorId") REFERENCES "Coordinador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investigacion" ADD CONSTRAINT "Investigacion_procesoGradoId_fkey" FOREIGN KEY ("procesoGradoId") REFERENCES "ProcesoGrado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diplomado" ADD CONSTRAINT "Diplomado_procesoGradoId_fkey" FOREIGN KEY ("procesoGradoId") REFERENCES "ProcesoGrado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practica" ADD CONSTRAINT "Practica_procesoGradoId_fkey" FOREIGN KEY ("procesoGradoId") REFERENCES "ProcesoGrado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practica" ADD CONSTRAINT "Practica_ofertaId_fkey" FOREIGN KEY ("ofertaId") REFERENCES "Oferta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oferta" ADD CONSTRAINT "Oferta_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postulacion" ADD CONSTRAINT "Postulacion_ofertaId_fkey" FOREIGN KEY ("ofertaId") REFERENCES "Oferta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postulacion" ADD CONSTRAINT "Postulacion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
