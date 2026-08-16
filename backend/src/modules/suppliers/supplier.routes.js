import { Router } from "express";

import { SupplierController }
  from "./supplier.controller.js";

const router = Router();

const controller =
  new SupplierController();

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

router.post(
  "/",
  controller.create.bind(
    controller
  )
);

router.put(
  "/:id",
  controller.update.bind(
    controller
  )
);

router.patch(
  "/:id/activate",
  controller.activate.bind(
    controller
  )
);

router.patch(
  "/:id/deactivate",
  controller.deactivate.bind(
    controller
  )
);

export default router;
