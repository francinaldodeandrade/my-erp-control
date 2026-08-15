import { Router } from "express";

import { FinancialController }
  from "./financial.controller.js";

const router = Router();

const controller =
  new FinancialController();

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
  "/summary",
  controller.summary.bind(
    controller
  )
);

router.get(
  "/receivables",
  controller.receivables.bind(
    controller
  )
);

router.get(
  "/payables",
  controller.payables.bind(
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
  "/:id/pay",
  controller.pay.bind(
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