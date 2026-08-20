/*
  Warnings:

  - You are about to drop the column `createdById` on the `production_orders` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "MovementType" ADD VALUE 'RETURN';

-- AlterTable
ALTER TABLE "production_orders" DROP COLUMN "createdById",
ADD COLUMN     "returnedQuantity" DECIMAL(65,30) NOT NULL DEFAULT 0;
