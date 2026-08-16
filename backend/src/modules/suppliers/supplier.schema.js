import { z } from "zod";

export const createSupplierSchema =
  z.object({
    companyName: z
  .string()
  .min(
    3,
    "Razão social deve possuir no mínimo 3 caracteres"
  ),

    cpfCnpj: z
      .string()
      .min(
        11,
        "CPF/CNPJ inválido"
      ),

    email: z
      .string()
      .email(
        "E-mail inválido"
      )
      .optional(),

    phone: z
      .string()
      .optional(),

    mobile: z
      .string()
      .optional(),

    contactName: z
      .string()
      .optional(),

    zipCode: z
      .string()
      .optional(),

    address: z
      .string()
      .optional(),

    number: z
      .string()
      .optional(),

    complement: z
      .string()
      .optional(),

    district: z
      .string()
      .optional(),

    city: z
      .string()
      .optional(),

    state: z
      .string()
      .max(2)
      .optional(),

    notes: z
      .string()
      .optional(),

    active: z
      .boolean()
      .optional(),
  });

export const updateSupplierSchema =
  z.object({
    name: z
      .string()
      .min(3)
      .optional(),

    cpfCnpj: z
      .string()
      .optional(),

    email: z
      .string()
      .email()
      .optional(),

    phone: z
      .string()
      .optional(),

    mobile: z
      .string()
      .optional(),

    contactName: z
      .string()
      .optional(),

    zipCode: z
      .string()
      .optional(),

    address: z
      .string()
      .optional(),

    number: z
      .string()
      .optional(),

    complement: z
      .string()
      .optional(),

    district: z
      .string()
      .optional(),

    city: z
      .string()
      .optional(),

    state: z
      .string()
      .max(2)
      .optional(),

    notes: z
      .string()
      .optional(),

    active: z
      .boolean()
      .optional(),
  });

export const supplierIdSchema =
  z.object({
    id: z.uuid(
      "ID do fornecedor inválido"
    ),
  });
