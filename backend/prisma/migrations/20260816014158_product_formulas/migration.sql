-- CreateEnum
CREATE TYPE "FormulaComponentType" AS ENUM ('RAW_MATERIAL', 'FINISHED_PRODUCT', 'MAINTENANCE_PART');

-- CreateTable
CREATE TABLE "product_formulas" (
    "id" TEXT NOT NULL,
    "finishedProductId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_formulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_formula_items" (
    "id" TEXT NOT NULL,
    "formulaId" TEXT NOT NULL,
    "componentType" "FormulaComponentType" NOT NULL,
    "rawMaterialId" TEXT,
    "finishedProductId" TEXT,
    "maintenancePartId" TEXT,
    "quantity" DECIMAL(65,30) NOT NULL,
    "lossPercentage" DECIMAL(65,30) DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_formula_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_formulas_finishedProductId_version_key" ON "product_formulas"("finishedProductId", "version");

-- AddForeignKey
ALTER TABLE "product_formulas" ADD CONSTRAINT "product_formulas_finishedProductId_fkey" FOREIGN KEY ("finishedProductId") REFERENCES "finished_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_formula_items" ADD CONSTRAINT "product_formula_items_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "product_formulas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_formula_items" ADD CONSTRAINT "product_formula_items_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_formula_items" ADD CONSTRAINT "product_formula_items_finishedProductId_fkey" FOREIGN KEY ("finishedProductId") REFERENCES "finished_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_formula_items" ADD CONSTRAINT "product_formula_items_maintenancePartId_fkey" FOREIGN KEY ("maintenancePartId") REFERENCES "maintenance_parts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
