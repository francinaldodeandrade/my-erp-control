import { Router }
  from "express";

import {
  StockDistributionController
} from "./stockDistribution.controller.js";

const router = Router();

const controller =
  new StockDistributionController();

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

export default router;