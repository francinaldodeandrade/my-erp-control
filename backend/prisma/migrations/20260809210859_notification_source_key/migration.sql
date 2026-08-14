/*
  Warnings:

  - A unique constraint covering the columns `[sourceKey]` on the table `notifications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "sourceKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "notifications_sourceKey_key" ON "notifications"("sourceKey");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_referenceTable_referenceId_idx" ON "notifications"("referenceTable", "referenceId");
