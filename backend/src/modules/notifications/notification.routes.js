import { Router } from "express";

import { NotificationController }
  from "./notification.controller.js";

const router = Router();

const controller =
  new NotificationController();

router.get(
  "/",
  controller.findMany.bind(
    controller
  )
);

router.get(
  "/:id",
  controller.findById.bind(
    controller
  )
);

router.patch(
  "/:id/read",
  controller.markAsRead.bind(
    controller
  )
);

router.patch(
  "/:id/resolve",
  controller.resolve.bind(
    controller
  )
);

export default router;
