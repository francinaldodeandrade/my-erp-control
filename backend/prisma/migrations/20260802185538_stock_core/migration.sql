-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('RAW_MATERIAL', 'FINISHED_PRODUCT', 'MAINTENANCE_PART');

-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('ENTRY', 'EXIT', 'SALE', 'PURCHASE', 'PRODUCTION', 'MAINTENANCE', 'TRANSFER', 'ADJUSTMENT', 'INVENTORY', 'LOSS');

-- CreateTable
CREATE TABLE "stock_movements" (
    "id" TEXT NOT NULL,
    "stockType" "StockType" NOT NULL,
    "movementType" "MovementType" NOT NULL,
    "rawMaterialId" TEXT,
    "finishedProductId" TEXT,
    "maintenancePartId" TEXT,
    "quantity" DECIMAL(65,30) NOT NULL,
    "unitCost" DECIMAL(65,30),
    "totalCost" DECIMAL(65,30),
    "balanceBefore" DECIMAL(65,30),
    "balanceAfter" DECIMAL(65,30),
    "referenceNumber" TEXT,
    "documentNumber" TEXT,
    "notes" TEXT,
    "userId" TEXT,
    "movementDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_finishedProductId_fkey" FOREIGN KEY ("finishedProductId") REFERENCES "finished_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_maintenancePartId_fkey" FOREIGN KEY ("maintenancePartId") REFERENCES "maintenance_parts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
