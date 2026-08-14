import { prisma } from "../../config/prisma.js";
import { createNotification } from "./createNotification.js";

export async function salesNotification() {
  const waitingApproval =
    await prisma.sale.findMany({
      where: {
        status: "WAITING_APPROVAL",
      },
    });

  for (const sale of waitingApproval) {
    await createNotification({
      title:
        "Pedido aguardando aprovação",

      message:
        `Pedido ${sale.number} aguardando aprovação.`,

      type:
        "ORDER_WAITING_APPROVAL",

      priority: "HIGH",

      sourceKey:
        `SALE_APPROVAL:${sale.id}`,

      referenceTable: "sales",

      referenceId: sale.id,
    });
  }

  const waitingStock =
    await prisma.sale.findMany({
      where: {
        status: "WAITING_STOCK",
      },
    });

  for (const sale of waitingStock) {
    await createNotification({
      title:
        "Pedido aguardando estoque",

      message:
        `Pedido ${sale.number} aguardando estoque.`,

      type:
        "ORDER_WAITING_STOCK",

      priority: "HIGH",

      sourceKey:
        `SALE_STOCK:${sale.id}`,

      referenceTable: "sales",

      referenceId: sale.id,
    });
  }
}