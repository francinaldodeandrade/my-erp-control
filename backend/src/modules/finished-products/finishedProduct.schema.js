import { z } from "zod";

export const createFinishedProductSchema =
  z.object({
    code: z.string().min(1),

    description: z
      .string()
      .min(3),

    category: z
      .string()
      .optional(),

    unit: z
      .string()
      .min(1),

    salePrice: z.coerce
      .number()
      .positive(),

    minimumStock: z.coerce
      .number()
      .min(0),

    productionCost: z.coerce
      .number()
      .min(0)
      .optional(),
  });

export const updateFinishedProductSchema =
  createFinishedProductSchema.partial();
