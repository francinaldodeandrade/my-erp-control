import { randomUUID }
  from "crypto";

import { prisma }
  from "../../config/prisma.js";

import { PurchaseRepository }
  from "./purchase.repository.js";

import { FinancialService }
  from "../financial/financial.service.js";

import { createNotification }
  from "../../services/notification/createNotification.js";

const repository =
  new PurchaseRepository();

const financialService =
  new FinancialService();

export class PurchaseService {
  async create(data) {
    const supplier =
      await prisma.supplier.findUnique({
        where: {
          id: data.supplierId,
        },
      });

    if (!supplier) {
      throw new Error(
        "Fornecedor não encontrado."
      );
    }

    let totalAmount = 0;

    const items = [];

    for (const item of data.items) {
      const totalPrice =
        Number(item.quantity) *
        Number(item.unitPrice);

      totalAmount += totalPrice;

      items.push({
        rawMaterialId:
          item.rawMaterialId,

        maintenancePartId:
          item.maintenancePartId,

        quantity:
          item.quantity,

        unitPrice:
          item.unitPrice,

        totalPrice,
      });
    }

    return repository.create({
      number:
        `PO-${Date.now()}`,

      supplierId:
        data.supplierId,

      notes:
        data.notes,

      expectedDelivery:
        data.expectedDelivery,

      totalAmount,

      items: {
        create: items,
      },
    });
  }

  async findAll() {
    return repository.findAll();
  }

  async findById(id) {
    const purchase =
      await repository.findById(id);

    if (!purchase) {
      throw new Error(
        "Compra não encontrada."
      );
    }

    return purchase;
  }

  async receive(id) {
  const purchase =
    await repository.findById(id);

  if (!purchase) {
    throw new Error(
      "Compra não encontrada."
    );
  }

  if (
    purchase.status !==
    "APPROVED"
  ) {
    throw new Error(
      "Apenas compras aprovadas podem ser recebidas."
    );
  }

  for (const item of purchase.items) {

    if (!item.rawMaterialId) {
      continue;
    }

    const material =
      await prisma.rawMaterial.findUnique({
        where: {
          id: item.rawMaterialId,
        },
      });

    if (!material) {
      continue;
    }

    const balanceBefore =
      Number(material.currentStock);

    const quantity =
      Number(item.quantity);

    const balanceAfter =
      balanceBefore + quantity;

    await prisma.rawMaterial.update({
      where: {
        id: material.id,
      },

      data: {
        currentStock:
          balanceAfter,
      },
    });

    await prisma.stockMovement.create({
      data: {
        stockType:
          "RAW_MATERIAL",

        movementType:
          "PURCHASE",

        rawMaterialId:
          material.id,

        quantity,

        balanceBefore,

        balanceAfter,

        referenceNumber:
          purchase.number,

        notes:
          `Recebimento da compra ${purchase.number}`,
      },
    });
  }

  const receivedPurchase =
    await repository.updateStatus(
      id,
      "RECEIVED"
    );

  await createNotification({
    title:
      "Compra recebida",

    message:
      `Compra ${purchase.number} recebida com sucesso.`,

    type:
      "SYSTEM",

    referenceTable:
      "purchase_orders",

    referenceId:
      purchase.id,

    sourceKey:
      `purchase_received_${purchase.id}`,
  });

  return receivedPurchase;
}

  async approve(id) {
  const purchase =
    await this.findById(id);

  if (
    purchase.status ===
    "APPROVED"
  ) {
    throw new Error(
      "Compra já aprovada."
    );
  }

  const approvedPurchase =
    await repository.updateStatus(
      id,
      "APPROVED"
    );

  await financialService
    .createPayableFromPurchase(
      purchase
    );

  return approvedPurchase;
}
}
