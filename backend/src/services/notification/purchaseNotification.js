import { prisma } from "../../config/prisma.js";
import { createNotification } from "./createNotification.js";

export async function purchaseNotification() {
  const purchases =
    await prisma.purchaseOrder.findMany({
      where: {
        status: "WAITING_APPROVAL",
      },
    });

  for (const purchase of purchases) {
    await createNotification({
      title:
        "Compra aguardando aprovação",

      message:
        `Pedido de compra ${purchase.number} aguardando aprovação.`,

      type: "SYSTEM",

      priority: "HIGH",

      sourceKey:
        `PURCHASE_APPROVAL:${purchase.id}`,

      referenceTable:
        "purchase_orders",

      referenceId:
        purchase.id,
    });
  }
}