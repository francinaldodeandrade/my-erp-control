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

  export const finishProductionOrderSchema =
  z.object({
    producedQuantity: z.coerce
      .number()
      .min(0),

    productionNotes: z
      .string()
      .optional(),
  });


export const updateProductionOrderSchema =
  createProductionOrderSchema.partial();
