import { z } from "zod";

export const createRawMaterialSchema =
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

    costPrice: z.coerce
      .number()
      .positive(),

    minimumStock: z.coerce
      .number()
      .min(0),

    supplierId: z
      .uuid()
      .optional(),
  });

export const updateRawMaterialSchema =
  createRawMaterialSchema.partial();

export const rawMaterialIdSchema =
  z.object({
    id: z.uuid(),
  });
