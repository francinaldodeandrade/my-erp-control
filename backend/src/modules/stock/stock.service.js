import { prisma }
  from "../../config/prisma.js";

import { createNotification }
  from "../../services/notification/createNotification.js";

export class StockService {

  async processSale(sale) {

    for (const item of sale.items) {

      const sellerStock =
        await prisma.sellerStock.findUnique({
          where: {
            sellerId_finishedProductId: {
              sellerId: sale.sellerId,
              finishedProductId:
                item.finishedProductId,
            },
          },

          include: {
            finishedProduct: true,
          },
        });

      if (!sellerStock) {
        throw new Error(
          "Vendedor não possui estoque para este produto."
        );
      }

      const quantity =
        Number(item.quantity);

      const balanceBefore =
        Number(
          sellerStock.quantity
        );

      const balanceAfter =
        balanceBefore -
        quantity;

      if (balanceAfter < 0) {
        throw new Error(
          `Estoque insuficiente para venda de ${sellerStock.finishedProduct.description}`
        );
      }

      await prisma.sellerStock.update({
        where: {
          sellerId_finishedProductId: {
            sellerId:
              sale.sellerId,

            finishedProductId:
              item.finishedProductId,
          },
        },

        data: {
          quantity:
            balanceAfter,
        },
      });

      if (
        balanceAfter <
        Number(
          sellerStock.finishedProduct.minimumStock
        )
      ) {

        await createNotification({
          title:
            "Estoque do vendedor abaixo do mínimo",

          message:
            `${sellerStock.finishedProduct.description} está com saldo crítico para o vendedor.`,

          type: "STOCK",

          referenceTable:
            "seller_stock",

          referenceId:
            sellerStock.id,
        });

      }

      await prisma.stockMovement.create({
        data: {

          stockType:
            "FINISHED_PRODUCT",

          movementType:
            "SALE",

          finishedProductId:
            item.finishedProductId,

          quantity,

          balanceBefore,

          balanceAfter,

          referenceNumber:
            sale.number,

          documentNumber:
            sale.number,

          notes:
            `Venda ${sale.number} realizada pelo vendedor ${sale.sellerId}`,

          movementDate:
            new Date(),
        },
      });

    }

    return true;
  }

}