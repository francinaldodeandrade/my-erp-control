/*
  Warnings:

  - A unique constraint covering the columns `[cpfCnpj]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licenseNumber]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serialNumber]` on the table `machines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpfCnpj]` on the table `suppliers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[renavam]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chassis]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "MaintenanceScheduleStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('VEHICLE_DOCUMENT', 'VEHICLE_INSURANCE', 'DRIVER_LICENSE', 'MAINTENANCE', 'FINANCIAL', 'STOCK', 'SYSTEM', 'ORDER_WAITING_STOCK', 'ORDER_WAITING_APPROVAL');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('DRAFT', 'WAITING_APPROVAL', 'APPROVED', 'ORDERED', 'PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SaleStatus" ADD VALUE 'WAITING_STOCK';
ALTER TYPE "SaleStatus" ADD VALUE 'WAITING_APPROVAL';
ALTER TYPE "SaleStatus" ADD VALUE 'SEPARATED';

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "complement" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "sellerId" TEXT,
ADD COLUMN     "type" "CustomerType" NOT NULL DEFAULT 'COMPANY';

-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "licenseExpiration" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "financial_transactions" ADD COLUMN     "referenceNumber" TEXT;

-- AlterTable
ALTER TABLE "maintenance_history" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "performedBy" TEXT,
ADD COLUMN     "servicePerformed" TEXT;

-- AlterTable
ALTER TABLE "maintenance_orders" ADD COLUMN     "actualCost" DECIMAL(65,30),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "downtimeMinutes" INTEGER,
ADD COLUMN     "estimatedCost" DECIMAL(65,30),
ADD COLUMN     "isScheduled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "performedBy" TEXT;

-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedById" TEXT;

-- AlterTable
ALTER TABLE "suppliers" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "user_sessions" ADD COLUMN     "lastActivityAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastSeenAt" TIMESTAMP(3),
ADD COLUMN     "passwordChangedAt" TIMESTAMP(3),
ADD COLUMN     "sellerId" TEXT;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "chassis" TEXT,
ADD COLUMN     "documentExpiration" TIMESTAMP(3),
ADD COLUMN     "driverId" TEXT,
ADD COLUMN     "insuranceExpiration" TIMESTAMP(3),
ADD COLUMN     "modelVehicle" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "renavam" TEXT;

-- CreateTable
CREATE TABLE "maintenance_schedules" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT,
    "frequencyKm" INTEGER,
    "frequencyDays" INTEGER,
    "lastExecutionKm" INTEGER,
    "nextExecutionKm" INTEGER,
    "lastExecutionDate" TIMESTAMP(3),
    "nextExecutionDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "MaintenanceScheduleStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "maintenance_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_orders" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'DRAFT',
    "totalAmount" DECIMAL(65,30),
    "notes" TEXT,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "expectedDelivery" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_items" (
    "id" TEXT NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "rawMaterialId" TEXT,
    "maintenancePartId" TEXT,
    "quantity" DECIMAL(65,30) NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "purchase_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockDistribution" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "finishedProductId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "distributedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "distributedById" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "StockDistribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machine_maintenance_schedules" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT,
    "frequencyHours" INTEGER,
    "frequencyDays" INTEGER,
    "lastExecutionDate" TIMESTAMP(3),
    "nextExecutionDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "machine_maintenance_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "referenceTable" TEXT,
    "referenceId" TEXT,
    "dueDate" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchase_orders_number_key" ON "purchase_orders"("number");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpfCnpj_key" ON "customers"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_cpf_key" ON "drivers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_licenseNumber_key" ON "drivers"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "machines_serialNumber_key" ON "machines"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_cpfCnpj_key" ON "suppliers"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_renavam_key" ON "vehicles"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_chassis_key" ON "vehicles"("chassis");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_schedules" ADD CONSTRAINT "maintenance_schedules_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_items" ADD CONSTRAINT "purchase_order_items_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_items" ADD CONSTRAINT "purchase_order_items_maintenancePartId_fkey" FOREIGN KEY ("maintenancePartId") REFERENCES "maintenance_parts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_items" ADD CONSTRAINT "purchase_order_items_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machine_maintenance_schedules" ADD CONSTRAINT "machine_maintenance_schedules_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "machines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
