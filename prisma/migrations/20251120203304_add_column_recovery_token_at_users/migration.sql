-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN     "recovery_token" TEXT,
ALTER COLUMN "rolId" SET DEFAULT 2;
