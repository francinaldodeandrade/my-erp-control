import { z } from "zod";

export const purchaseItemSchema =
  z.object({
    rawMaterialId: z
      .uuid()
      .optional(),

    maintenancePartId: z
      .uuid()
      .optional(),

    quantity: z.coerce
      .number()
      .positive(),

    unitPrice: z.coerce
      .number()
      .positive(),
  });

export const createPurchaseSchema =
  z.object({
    supplierId: z.uuid(
      "Fornecedor inválido"
    ),

    expectedDelivery: z
      .string()
      .datetime()
      .optional(),

    notes: z
      .string()
      .optional(),

    items: z
      .array(
        purchaseItemSchema
      )
      .min(
        1,
        "A compra deve possuir pelo menos um item"
      ),
  });

export const purchaseIdSchema =
  z.object({
    id: z.uuid(),
  });
