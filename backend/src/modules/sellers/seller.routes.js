import { Router } from "express";
import { SellerController }
  from "./seller.controller.js";

const router = Router();

const controller =
  new SellerController();

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

router.get(
  "/:id/customers",
  controller.findCustomers.bind(
    controller
  )
);

router.get(
  "/:id/sales",
  controller.findSales.bind(
    controller
  )
);

router.get(
  "/:id/distributions",
  controller.findDistributions.bind(
    controller
  )
);

router.get(
  "/:id/dashboard",
  controller.dashboard.bind(
    controller
  )
);

export default router;
