1. Linha de comando pra criar estrutura
mkdir -p src/{api,contexts,routes,layouts,store,hooks,components,pages/auth,pages/dashboard}

touch \
src/api/axios.js \
src/contexts/AuthContext.jsx \
src/routes/AppRoutes.jsx \
src/routes/PrivateRoute.jsx \
src/routes/PermissionRoute.jsx \
src/layouts/MainLayout.jsx \
src/layouts/AuthLayout.jsx \
src/layouts/Sidebar.jsx \
src/layouts/Header.jsx \
src/store/authStore.js \
src/hooks/useAuth.js \
src/pages/auth/LoginPage.jsx \
src/pages/dashboard/DashboardPage.jsx \
src/components/Loading.jsx \
src/components/Unauthorized.jsx



2. Verificar a estrutura
find src -type f

src/

api/
├── axios.js

contexts/
├── AuthContext.jsx

routes/
├── AppRoutes.jsx
├── PrivateRoute.jsx
├── PermissionRoute.jsx

layouts/
├── MainLayout.jsx
├── AuthLayout.jsx
├── Sidebar.jsx
├── Header.jsx

store/
├── authStore.js

hooks/
├── useAuth.js

pages/
├── auth/
│   └── LoginPage.jsx
│
├── dashboard/
│   └── DashboardPage.jsx

components/
├── Loading.jsx
├── Unauthorized.jsx

App.jsx
main.jsx

3. Meus endpoint

leila@BellaMadian:~/my_erp/erp_control/backend$ cat src/routes/index.js && echo "" && grep -rnE "router\.(get|post|put|patch|delete)" src/modules
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

// import stockDistributionRoutes from "../modules/stock-distributions/stockDistribution.routes.js";
import stockDistributionRoutes from "../modules/stock-distributions/stockDistribution.routes.js";

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

router.use(
  "/stock-distributions",
  stockDistributionRoutes
);

export default router;

src/modules/production-orders/productionOrder.routes.js:12:router.post(
src/modules/production-orders/productionOrder.routes.js:19:router.get(
src/modules/production-orders/productionOrder.routes.js:26:router.get(
src/modules/production-orders/productionOrder.routes.js:33:router.patch(
src/modules/production-orders/productionOrder.routes.js:40:router.patch(
src/modules/production-orders/productionOrder.routes.js:47:router.patch(
src/modules/finished-products/finishedProduct.routes.js:12:router.post(
src/modules/finished-products/finishedProduct.routes.js:19:router.get(
src/modules/finished-products/finishedProduct.routes.js:26:router.get(
src/modules/finished-products/finishedProduct.routes.js:33:router.put(
src/modules/finished-products/finishedProduct.routes.js:40:router.patch(
src/modules/finished-products/finishedProduct.routes.js:47:router.patch(
src/modules/formulas/formula.routes.js:12:router.post(
src/modules/formulas/formula.routes.js:19:router.get(
src/modules/formulas/formula.routes.js:26:router.get(
src/modules/formulas/formula.routes.js:33:router.get(
src/modules/purchases/purchase.routes.js:12:router.post(
src/modules/purchases/purchase.routes.js:19:router.get(
src/modules/purchases/purchase.routes.js:26:router.get(
src/modules/purchases/purchase.routes.js:33:router.patch(
src/modules/purchases/purchase.routes.js:40:router.patch(
src/modules/suppliers/supplier.routes.js:11:router.get(
src/modules/suppliers/supplier.routes.js:18:router.get(
src/modules/suppliers/supplier.routes.js:25:router.post(
src/modules/suppliers/supplier.routes.js:32:router.put(
src/modules/suppliers/supplier.routes.js:39:router.patch(
src/modules/suppliers/supplier.routes.js:46:router.patch(
src/modules/stock-distributions/stockDistribution.routes.js:13:router.post(
src/modules/stock-distributions/stockDistribution.routes.js:20:router.get(
src/modules/stock-distributions/stockDistribution.routes.js:27:router.get(
src/modules/sales/sale.routes.js:11:router.post(
src/modules/sales/sale.routes.js:18:router.get(
src/modules/sales/sale.routes.js:25:router.get(
src/modules/sales/sale.routes.js:32:router.patch(
src/modules/sales/sale.routes.js:39:router.patch(
src/modules/raw-materials/rawMaterial.routes.js:12:router.post(
src/modules/raw-materials/rawMaterial.routes.js:19:router.get(
src/modules/raw-materials/rawMaterial.routes.js:26:router.get(
src/modules/raw-materials/rawMaterial.routes.js:33:router.put(
src/modules/raw-materials/rawMaterial.routes.js:40:router.patch(
src/modules/raw-materials/rawMaterial.routes.js:47:router.patch(
src/modules/sellers/seller.routes.js:10:router.get(
src/modules/sellers/seller.routes.js:17:router.get(
src/modules/sellers/seller.routes.js:24:router.get(
src/modules/sellers/seller.routes.js:31:router.get(
src/modules/sellers/seller.routes.js:38:router.get(
src/modules/sellers/seller.routes.js:45:router.get(
src/modules/notifications/notification.routes.js:11:router.get(
src/modules/notifications/notification.routes.js:18:router.get(
src/modules/notifications/notification.routes.js:25:router.patch(
src/modules/notifications/notification.routes.js:32:router.patch(
src/modules/financial/financial.routes.js:11:router.post(
src/modules/financial/financial.routes.js:18:router.get(
src/modules/financial/financial.routes.js:25:router.get(
src/modules/financial/financial.routes.js:32:router.get(
src/modules/financial/financial.routes.js:39:router.get(
src/modules/financial/financial.routes.js:46:router.get(
src/modules/financial/financial.routes.js:53:router.patch(
src/modules/financial/financial.routes.js:60:router.patch(
src/modules/customers/customer.routes.js:71:router.post("/", controller.create.bind(controller));
src/modules/customers/customer.routes.js:73:router.get("/", controller.findMany.bind(controller));
src/modules/customers/customer.routes.js:75:router.get("/:id", controller.findById.bind(controller));
src/modules/customers/customer.routes.js:77:router.put("/:id", controller.update.bind(controller));
src/modules/customers/customer.routes.js:79:router.patch(
src/modules/customers/customer.routes.js:84:router.patch(
src/modules/customers/customer.routes.js:89:router.patch(
leila@BellaMadian:~/my_erp/erp_control/backend$
