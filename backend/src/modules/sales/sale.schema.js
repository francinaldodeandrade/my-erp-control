import { z } from "zod";

export const saleItemSchema =
  z.object({
    finishedProductId: z
      .uuid("Produto inválido"),

    quantity: z
      .coerce
      .number()
      .positive(
        "Quantidade deve ser maior que zero"
      ),

    unitPrice: z
      .coerce
      .number()
      .positive(
        "Preço unitário deve ser maior que zero"
      ),
  });

export const salePaymentSchema =
  z.object({
    paymentMethod: z.enum([
      "CASH",
      "PIX",
      "CREDIT_CARD",
      "DEBIT_CARD",
      "BANK_SLIP",
      "BANK_TRANSFER",
      "CHECK",
      "STORE_CREDIT",
    ]),

    amount: z
      .coerce
      .number()
      .positive(
        "Valor do pagamento deve ser maior que zero"
      ),

    dueDate: z
      .string()
      .datetime()
      .optional(),
  });

export const createSaleSchema =
  z.object({
    customerId: z
      .uuid("Cliente inválido"),

    sellerId: z
      .uuid("Vendedor inválido"),

    discount: z
      .coerce
      .number()
      .min(0)
      .default(0),

    notes: z
      .string()
      .max(1000)
      .optional(),

    items: z
      .array(saleItemSchema)
      .min(
        1,
        "A venda precisa ter pelo menos um item"
      ),

    payments: z
      .array(salePaymentSchema)
      .min(
        1,
        "A venda precisa ter pelo menos uma forma de pagamento"
      ),
  });

export const saleIdSchema =
  z.object({
    id: z.uuid(
      "ID da venda inválido"
    ),
  });

export const saleQuerySchema =
  z.object({
    page: z.coerce
      .number()
      .min(1)
      .default(1),

    perPage: z.coerce
      .number()
      .min(1)
      .max(100)
      .default(20),

    customerId: z
      .uuid()
      .optional(),

    sellerId: z
      .uuid()
      .optional(),

    status: z
      .enum([
        "DRAFT",
        "PENDING",
        "APPROVED",
        "DELIVERED",
        "CANCELED",
        "WAITING_STOCK",
        "WAITING_APPROVAL",
        "SEPARATED",
      ])
      .optional(),
  });