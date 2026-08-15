import { z } from "zod";

export const createFinancialSchema =
  z.object({
    description: z
      .string()
      .min(3),

    type: z.enum([
      "RECEIVABLE",
      "PAYABLE",
    ]),

    amount: z
      .coerce
      .number()
      .positive(),

    dueDate: z
      .string()
      .datetime(),

    paymentMethod: z
      .enum([
        "CASH",
        "PIX",
        "CREDIT_CARD",
        "DEBIT_CARD",
        "BANK_SLIP",
        "BANK_TRANSFER",
        "CHECK",
        "STORE_CREDIT",
      ])
      .optional(),

    customerId: z
      .uuid()
      .optional(),

    supplierId: z
      .uuid()
      .optional(),

    saleId: z
      .uuid()
      .optional(),

    notes: z
      .string()
      .optional(),
  });

export const financialIdSchema =
  z.object({
    id: z.uuid(),
  });

