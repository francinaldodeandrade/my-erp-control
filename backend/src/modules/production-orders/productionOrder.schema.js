import { z } from "zod";

export const createProductionOrderSchema =
  z.object({
    finishedProductId: z
      .string()
      .uuid(),

    formulaId: z
      .string()
      .uuid(),

    plannedQuantity: z.coerce
      .number()
      .positive(),

    notes: z
      .string()
      .optional(),
  });

export const updateProductionOrderSchema =
  createProductionOrderSchema.partial();
