import { prisma }
  from "../../config/prisma.js";

import { createNotification }
  from "../../services/notification/createNotification.js";

export class StockService {
  async processSale(sale) {
    for (const item of sale.items) {

      const product =
        await prisma.finishedProduct.findUnique({
          where: {
            id: item.finishedProductId,
          },
        });

      if (!product) {
        throw new Error(
          "Produto não encontrado."
        );
      }

      const balanceBefore =
        Number(product.currentStock);

      const quantity =
        Number(item.quantity);

      const balanceAfter =
        balanceBefore - quantity;

      if (balanceAfter < 0) {
        throw new Error(
          `Estoque insuficiente para ${product.description}`
        );
      }

      await prisma.finishedProduct.update({
        where: {
          id: product.id,
        },
        data: {
          currentStock: balanceAfter,
        },
      });

      if (
  balanceAfter <
  Number(product.minimumStock)
) {
  await createNotification({
    title: "Estoque abaixo do mínimo",
    message:
      `${product.description} está com estoque crítico.`,
    type: "STOCK",
    referenceTable:
      "finished_products",
    referenceId:
      product.id,
  });
}

      await prisma.stockMovement.create({
        data: {
          stockType:
            "FINISHED_PRODUCT",

          movementType:
            "SALE",

          finishedProductId:
            product.id,

          quantity,

          balanceBefore,

          balanceAfter,

          referenceNumber:
            sale.number,

          notes:
            `Venda ${sale.number}`,

          movementDate:
            new Date(),
        },
      });
    }
  }
}