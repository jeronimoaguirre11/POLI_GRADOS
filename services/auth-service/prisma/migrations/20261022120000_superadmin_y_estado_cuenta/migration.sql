-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'SUPERADMIN';

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;
