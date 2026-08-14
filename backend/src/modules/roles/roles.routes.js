import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { RolesController } from "./roles.controller.js";

const rolesRoutes = Router();

const rolesController =
  new RolesController();

rolesRoutes.use(authMiddleware);

rolesRoutes.get(
  "/",
  rolesController.list.bind(
    rolesController
  )
);

export default rolesRoutes;