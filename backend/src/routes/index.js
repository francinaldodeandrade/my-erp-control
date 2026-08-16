import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";

import usersRoutes from "../modules/users/users.routes.js";

import rolesRoutes from "../modules/roles/roles.routes.js";

import customerRoutes from "../modules/customers/customer.routes.js";

import sellerRoutes from "../modules/sellers/seller.routes.js";

import saleRoutes from "../modules/sales/sale.routes.js";

import financialRoutes from "../modules/financial/financial.routes.js";

import notificationRoutes from "../modules/notifications/notification.routes.js";

import supplierRoutes from "../modules/suppliers/supplier.routes.js";

import purchaseRoutes from "../modules/purchases/purchase.routes.js";

import rawMaterialRoutes from "../modules/raw-materials/rawMaterial.routes.js";

import formulaRoutes from "../modules/formulas/formula.routes.js";

import finishedProductRoutes from "../modules/finished-products/finishedProduct.routes.js";

import productionOrderRoutes from "../modules/production-orders/productionOrder.routes.js";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    app: "ERP Control",
    version: "1.5.0",
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

router.use(
  "/notifications",
  notificationRoutes
);

router.use(
  "/suppliers",
  supplierRoutes
);

router.use(
  "/purchases",
  purchaseRoutes
);

router.use(
  "/raw-materials",
  rawMaterialRoutes
);

router.use(
  "/formulas",
  formulaRoutes
);

router.use(
  "/finished-products",
  finishedProductRoutes
);

router.use(
  "/production-orders",
  productionOrderRoutes
);

export default router;
