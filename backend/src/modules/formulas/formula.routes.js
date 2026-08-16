import { Router }
  from "express";

import { FormulaController }
  from "./formula.controller.js";

const router = Router();

const controller =
  new FormulaController();

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
  "/product/:productId",
  controller.findByProduct.bind(
    controller
  )
);

router.get(
  "/:id",
  controller.findById.bind(
    controller
  )
);

export default router;
