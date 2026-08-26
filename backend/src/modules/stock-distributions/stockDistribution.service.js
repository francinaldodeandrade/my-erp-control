import { prisma }
  from "../../config/prisma.js";

import {
  StockDistributionRepository
} from "./stockDistribution.repository.js";

import { createNotification }
  from "../../services/notification/createNotification.js";

const repository =
  new StockDistributionRepository();

export class StockDistributionService {

  async create(data) {

    const seller =
      await prisma.user.findUnique({
        where: {
          id: data.sellerId,
        },
      });

    if (!seller) {
      throw new Error(
        "Vendedor não encontrado."
      );
    }

    const distributor =
      await prisma.user.findUnique({
        where: {
          id: data.distributedById,
        },
      });

    if (!distributor) {
      throw new Error(
        "Usuário distribuidor não encontrado."
      );
    }

    const product =
      await prisma.finishedProduct.findUnique({
        where: {
          id: data.finishedProductId,
        },
      });

    if (!product) {
      throw new Error(
        "Produto não encontrado."
      );
    }

    const currentStock =
      Number(product.currentStock);

    const quantity =
      Number(data.quantity);

    if (currentStock < quantity) {
      throw new Error(
        `Estoque insuficiente. Disponível: ${currentStock}`
      );
    }

    return prisma.$transaction(
      async (tx) => {

        const stockAfter =
          currentStock - quantity;

        await tx.finishedProduct.update({
          where: {
            id: product.id,
          },

          data: {
            currentStock:
              stockAfter,
          },
        });

      const sellerStock =
  await tx.sellerStock.findUnique({
    where: {
      sellerId_finishedProductId: {
        sellerId: data.sellerId,
        finishedProductId:
          data.finishedProductId,
      },
    },
  });
if (!sellerStock) {

  await tx.sellerStock.upsert({
  where: {
    sellerId_finishedProductId: {
      sellerId: data.sellerId,
      finishedProductId:
        data.finishedProductId,
    },
  },

  

  update: {
    quantity: {
      increment: quantity,
    },
  },

  create: {
    sellerId: data.sellerId,
    finishedProductId:
      data.finishedProductId,
    quantity,
  },
});

} else {
 

  await tx.sellerStock.update({
    where: {
      sellerId_finishedProductId: {
        sellerId:
          data.sellerId,

        finishedProductId:
          data.finishedProductId,
      },
    },

    data: {
      quantity:
        Number(
          sellerStock.quantity
        ) + quantity,
    },
  });

}
 await this.reprocessWaitingSales(
  tx,
  data.sellerId
);
        await tx.stockMovement.create({
          data: {

            stockType:
              "FINISHED_PRODUCT",

            movementType:
              "TRANSFER",

            finishedProductId:
              product.id,

            quantity,

            balanceBefore:
              currentStock,

            balanceAfter:
              stockAfter,

            referenceNumber:
              `DIST-${Date.now()}`,

            notes:
              `Distribuído para ${seller.name}`,
          },
        });

        return repository.create({
          sellerId:
            data.sellerId,

          finishedProductId:
            data.finishedProductId,

          distributedById:
            data.distributedById,

          quantity,

          notes:
            data.notes,
        });
      }
    );
  }

  async findAll() {
    return repository.findAll();
  }

  async findById(id) {
    const distribution =
      await repository.findById(id);

    if (!distribution) {
      throw new Error(
        "Distribuição não encontrada."
      );
    }

    return distribution;
  }
  async reprocessWaitingSales(
  tx,
  sellerId
) {

  const waitingSales =
    await tx.sale.findMany({
      where: {
        sellerId,
        status: "WAITING_STOCK",
      },

      include: {
        items: true,
      },
    });

  console.log(
    "REPROCESSANDO",
    sellerId
  );

  console.log(
    "VENDAS PENDENTES",
    waitingSales.length
  );

  for (const sale of waitingSales) {

    let hasStock = true;

    for (const item of sale.items) {

      const stock =
        await tx.sellerStock.findUnique({
          where: {
            sellerId_finishedProductId: {
              sellerId,
              finishedProductId:
                item.finishedProductId,
            },
          },
        });

      const available =
        Number(
          stock?.quantity || 0
        );

      const required =
        Number(item.quantity);

      console.log(
        "VENDA:",
        sale.number
      );

      console.log(
        "PRODUTO:",
        item.finishedProductId
      );

      console.log(
        "QTD VENDA:",
        required
      );

      console.log(
        "QTD ESTOQUE:",
        available
      );

      console.log(
        `Comparando ${available} >= ${required}`
      );

      if (available < required) {
        hasStock = false;
        break;
      }
    }

    if (!hasStock) {
      continue;
    }

    console.log(
      "LIBERANDO",
      sale.number
    );

    await tx.sale.update({
      where: {
        id: sale.id,
      },

      data: {
        status: "PENDING",
      },
    });

    // notificação opcional
    await createNotification({
  title: "Venda liberada",

  message:
    `A venda ${sale.number} possui estoque disponível e pode ser aprovada.`,

  type: "SYSTEM",

  referenceTable: "sales",

  referenceId: sale.id,
});
  }
}
}