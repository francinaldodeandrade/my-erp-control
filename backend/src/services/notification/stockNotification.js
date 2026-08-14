import { prisma } from "../../config/prisma.js";
import { createNotification } from "./createNotification.js";

export async function stockNotification() {
  const rawMaterials =
    await prisma.rawMaterial.findMany();

  for (const item of rawMaterials) {
    if (
      Number(item.currentStock) <=
      Number(item.minimumStock)
    ) {
      await createNotification({
        title:
          "Matéria-prima abaixo do mínimo",

        message:
          `${item.description} atingiu estoque mínimo.`,

        type: "STOCK",

        priority: "HIGH",

        sourceKey:
          `RAW_MATERIAL:${item.id}`,

        referenceTable:
          "raw_materials",

        referenceId: item.id,
      });
    }
  }

  const products =
    await prisma.finishedProduct.findMany();

  for (const item of products) {
    if (
      Number(item.currentStock) <=
      Number(item.minimumStock)
    ) {
      await createNotification({
        title:
          "Produto abaixo do mínimo",

        message:
          `${item.description} atingiu estoque mínimo.`,

        type: "STOCK",

        priority: "HIGH",

        sourceKey:
          `FINISHED_PRODUCT:${item.id}`,

        referenceTable:
          "finished_products",

        referenceId: item.id,
      });
    }
  }
}