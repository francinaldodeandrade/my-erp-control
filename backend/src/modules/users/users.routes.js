import { Router } from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { permissionMiddleware }
from "../../middlewares/permission.middleware.js";

import { UsersController }
from "./users.controller.js";

import { validate } from "../../middlewares/validate.middleware.js";

import {
  createUserSchema,
  updateUserSchema,
} from "./users.schemas.js";

const usersRoutes = Router();

const usersController =
  new UsersController();

usersRoutes.use(
  authMiddleware
);

usersRoutes.use(
  permissionMiddleware([
    "Administrador",
  ])
);

usersRoutes.get(
  "/",
  usersController.list
);

usersRoutes.get(
  "/:id",
  usersController.show
);

usersRoutes.post(
  "/",
  validate(createUserSchema),
  usersController.create.bind(
    usersController
  )
);

usersRoutes.put(
  "/:id",
  usersController.update.bind(
    usersController
  )
);

usersRoutes.patch(
  "/:id/active",
  usersController.toggleActive.bind(
    usersController
  )
);

usersRoutes.delete(
  "/:id",
  usersController.delete.bind(
    usersController
  )
);

export default usersRoutes;