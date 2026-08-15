import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";

import usersRoutes from "../modules/users/users.routes.js";

import rolesRoutes from "../modules/roles/roles.routes.js";

import customerRoutes from "../modules/customers/customer.routes.js";

import sellerRoutes from "../modules/sellers/seller.routes.js";

import saleRoutes from "../modules/sales/sale.routes.js";

import financialRoutes from "../modules/financial/financial.routes.js";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    app: "ERP Control",
    version: "1.0.0",
    status: "online",
  });
});

router.use(
  "/users",
  usersRoutes
);

router.use(
  "/roles",
  rolesRoutes
);

router.use(
  "/sellers",
  sellerRoutes
);


router.use(
  "/customers", 
  customerRoutes
);

router.use(
  "/auth", 
  authRoutes
);

router.use(
  "/sales",
  saleRoutes
);

router.use(
  "/financial",
  financialRoutes
);

export default router;