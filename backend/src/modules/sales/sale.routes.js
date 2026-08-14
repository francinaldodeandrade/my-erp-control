import { Router } from "express";

import { SaleController }
  from "./sale.controller.js";

const router = Router();

const controller =
  new SaleController();

router.post(
  "/",
  controller.create.bind(
    controller
  )
);

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
  "/:id/approve",
  controller.approve.bind(
    controller
  )
);

router.patch(
  "/:id/cancel",
  controller.cancel.bind(
    controller
  )
);

export default router;