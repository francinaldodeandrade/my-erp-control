import { z } from "zod";

export const createCustomerSchema = z.object({
  code: z.string().max(20).optional(),

  type: z.enum([
    "INDIVIDUAL",
    "COMPANY",
  ]),

  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(120),

  cpfCnpj: z
    .string()
    .max(20)
    .optional(),

  ieRg: z
    .string()
    .max(30)
    .optional(),

  phone: z
    .string()
    .max(20)
    .optional(),

  mobile: z
    .string()
    .max(20)
    .optional(),

  email: z
    .string()
    .email("Email inválido")
    .optional(),

  zipCode: z
    .string()
    .max(15)
    .optional(),

  address: z
    .string()
    .max(255)
    .optional(),

  number: z
    .string()
    .max(20)
    .optional(),

  complement: z
    .string()
    .max(100)
    .optional(),

  district: z
    .string()
    .max(100)
    .optional(),

  city: z
    .string()
    .max(100)
    .optional(),

  state: z
    .string()
    .max(2)
    .optional(),

  creditLimit: z
    .coerce
    .number()
    .min(0)
    .optional(),

  notes: z
    .string()
    .max(1000)
    .optional(),

  sellerId: z
    .string()
    .uuid()
    .optional(),
});

export const updateCustomerSchema =
  createCustomerSchema.partial();

export const customerIdSchema = z.object({
  id: z.uuid("ID inválido"),
});

export const customerQuerySchema = z.object({
  page: z.coerce
    .number()
    .min(1)
    .default(1),

  perPage: z.coerce
    .number()
    .min(1)
    .max(100)
    .default(20),

  search: z.string().optional(),

  active: z
    .enum(["true", "false"])
    .optional(),

  sellerId: z.string().uuid().optional(),
});