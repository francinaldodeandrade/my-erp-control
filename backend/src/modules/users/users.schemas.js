import { z } from "zod";

export const createUserSchema =
  z.object({
    name: z
      .string()
      .min(
        3,
        "Nome deve possuir no mínimo 3 caracteres"
      ),

    email: z
      .string()
      .email(
        "E-mail inválido"
      ),

    password: z
      .string()
      .min(
        8,
        "Senha deve possuir no mínimo 8 caracteres"
      ),

    role: z
      .string()
      .min(
        1,
        "Perfil obrigatório"
      ),
  });

export const updateUserSchema =
  z.object({
    name: z.string().min(3).optional(),

    email: z
      .string()
      .email()
      .optional(),

    password: z
      .string()
      .min(8)
      .optional(),

    role: z
      .string()
      .optional(),
  });