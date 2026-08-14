import { Router } from "express";

import {
  loginRateLimit,
} from "../../middlewares/rate-limit.middleware.js";

import {
  authMiddleware,
} from "../../middlewares/auth.middleware.js";

import {
  validate,
} from "../../middlewares/validate.middleware.js";

import { AuthController } from "./auth.controller.js";

import {
  loginSchema,
  changePasswordSchema,
} from "./auth.schemas.js";

const authRoutes = Router();

const authController =
  new AuthController();

authRoutes.post(
  "/login",
  loginRateLimit,
  validate(loginSchema),
  authController.login.bind(
    authController
  )
);

authRoutes.get(
  "/me",
  authMiddleware,
  authController.me.bind(
    authController
  )
);

authRoutes.post(
  "/change-password",
  authMiddleware,
  validate(
    changePasswordSchema
  ),
  authController.changePassword.bind(
    authController
  )
);

authRoutes.post(
  "/logout",
  authMiddleware,
  authController.logout.bind(
    authController
  )
);

export default authRoutes;