import { z } from "zod";

export const createStockDistributionSchema =
  z.object({
    sellerId: z
      .string()
      .uuid(),

    finishedProductId: z
      .string()
      .uuid(),

    distributedById: z
      .string()
      .uuid(),

    quantity: z.coerce
      .number()
      .positive(),

    notes: z
      .string()
      .optional(),
  });