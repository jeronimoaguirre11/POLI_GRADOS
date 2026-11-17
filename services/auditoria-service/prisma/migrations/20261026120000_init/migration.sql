-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT,
    "email" TEXT,
    "rol" TEXT,
    "accion" TEXT NOT NULL,
    "metodo" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "servicio" TEXT NOT NULL,
    "estado" INTEGER NOT NULL,
    "exito" BOOLEAN NOT NULL,
    "ip" TEXT,
    "detalle" TEXT,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Evento_fecha_idx" ON "Evento"("fecha");

-- CreateIndex
CREATE INDEX "Evento_usuarioId_idx" ON "Evento"("usuarioId");

-- CreateIndex
CREATE INDEX "Evento_accion_idx" ON "Evento"("accion");
