import { z } from "zod";

export const formulaItemSchema =
  z.object({
    componentType: z.enum([
      "RAW_MATERIAL",
      "SEMI_FINISHED",
      "FINISHED_PRODUCT",
      "MAINTENANCE_PART",
    ]),

    rawMaterialId: z
      .string()
      .uuid()
      .optional(),

    finishedProductId: z
      .string()
      .uuid()
      .optional(),

    maintenancePartId: z
      .string()
      .uuid()
      .optional(),

    quantity: z.coerce
      .number()
      .positive(),

    lossPercentage: z.coerce
      .number()
      .min(0)
      .optional(),

    notes: z
      .string()
      .optional(),
  });

export const createFormulaSchema =
  z.object({
    finishedProductId: z
      .string()
      .uuid(),

    version: z.coerce
      .number()
      .int()
      .positive()
      .optional(),

    notes: z
      .string()
      .optional(),

    items: z
      .array(formulaItemSchema)
      .min(1),
  });

export const updateFormulaSchema =
  createFormulaSchema.partial();
