-- AlterTable
ALTER TABLE "finished_product_lots" ADD COLUMN     "productionOrderId" TEXT;

-- AlterTable
ALTER TABLE "production_orders" ADD COLUMN     "productionOrderId" TEXT;

-- AlterTable
ALTER TABLE "stock_movements" ADD COLUMN     "productionOrderId" TEXT;

-- CreateTable
CREATE TABLE "ProductionHistory" (
    "id" TEXT NOT NULL,
    "productionOrderId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "oldStatus" "ProductionStatus",
    "newStatus" "ProductionStatus",
    "notes" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller_stock" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "finishedProductId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seller_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerInventory" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "finishedProductId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SellerInventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seller_stock_sellerId_finishedProductId_key" ON "seller_stock"("sellerId", "finishedProductId");

-- CreateIndex
CREATE INDEX "finished_products_active_idx" ON "finished_products"("active");

-- CreateIndex
CREATE INDEX "raw_materials_active_idx" ON "raw_materials"("active");

-- CreateIndex
CREATE INDEX "stock_movements_movementDate_idx" ON "stock_movements"("movementDate");

-- CreateIndex
CREATE INDEX "stock_movements_movementType_idx" ON "stock_movements"("movementType");

-- CreateIndex
CREATE INDEX "stock_movements_stockType_idx" ON "stock_movements"("stockType");

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_productionOrderId_fkey" FOREIGN KEY ("productionOrderId") REFERENCES "production_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_stock" ADD CONSTRAINT "seller_stock_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller_stock" ADD CONSTRAINT "seller_stock_finishedProductId_fkey" FOREIGN KEY ("finishedProductId") REFERENCES "finished_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
