import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("E-mail inválido"),

  password: z
    .string()
    .min(
      6,
      "Senha deve possuir no mínimo 6 caracteres"
    ),
});

export const changePasswordSchema =
  z.object({
    currentPassword: z
      .string()
      .min(1),

    newPassword: z
      .string()
      .min(
        10,
        "Senha deve possuir no mínimo 10 caracteres"
      )
      .regex(
        /[A-Z]/,
        "Senha deve possuir letra maiúscula"
      )
      .regex(
        /[a-z]/,
        "Senha deve possuir letra minúscula"
      )
      .regex(
        /[0-9]/,
        "Senha deve possuir número"
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Senha deve possuir caractere especial"
      ),
  });