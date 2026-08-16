import { Router }
  from "express";

import { PurchaseController }
  from "./purchase.controller.js";

const router = Router();

const controller =
  new PurchaseController();

router.post(
  "/",
  controller.create.bind(
    controller
  )
);

router.get(
  "/",
  controller.findAll.bind(
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
  "/:id/receive",
  controller.receive.bind(
    controller
  )
);

export default router;
