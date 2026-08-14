import rateLimit from "express-rate-limit";

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  message: {
    message:
      "Muitas tentativas. Tente novamente em 15 minutos.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});