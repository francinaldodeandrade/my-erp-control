import { Router }
  from "express";

import { RawMaterialController }
  from "./rawMaterial.controller.js";

const router = Router();

const controller =
  new RawMaterialController();

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
