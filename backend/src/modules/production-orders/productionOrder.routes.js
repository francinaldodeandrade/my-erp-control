import { Router }
  from "express";

import { ProductionOrderController }
  from "./productionOrder.controller.js";

const router = Router();

const controller =
  new ProductionOrderController();

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
  "/:id/release",
  controller.release.bind(
    controller
  )
);

router.patch(
  "/:id/start",
  controller.start.bind(
    controller
  )
);

router.patch(
  "/:id/finish",
  controller.finish.bind(
    controller
  )
);

export default router;
