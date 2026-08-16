-- CreateEnum
CREATE TYPE "ProductionStatus" AS ENUM ('DRAFT', 'RELEASED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "production_orders" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "finishedProductId" TEXT NOT NULL,
    "formulaId" TEXT NOT NULL,
    "createdById" TEXT,
    "status" "ProductionStatus" NOT NULL DEFAULT 'DRAFT',
    "plannedQuantity" DECIMAL(65,30) NOT NULL,
    "producedQuantity" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "notes" TEXT,
    "productionNotes" TEXT,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "production_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "production_orders_number_key" ON "production_orders"("number");

-- CreateIndex
CREATE INDEX "production_orders_status_idx" ON "production_orders"("status");

-- CreateIndex
CREATE INDEX "production_orders_finishedProductId_idx" ON "production_orders"("finishedProductId");

-- CreateIndex
CREATE INDEX "production_orders_createdAt_idx" ON "production_orders"("createdAt");

-- AddForeignKey
ALTER TABLE "production_orders" ADD CONSTRAINT "production_orders_finishedProductId_fkey" FOREIGN KEY ("finishedProductId") REFERENCES "finished_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_orders" ADD CONSTRAINT "production_orders_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "product_formulas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
