// import { CustomerController }
//   from "./customer.controller.js";

// const controller =
//   new CustomerController();

// export async function customerRoutes(
//   fastify
// ) {
//   /*
//    * CREATE
//    */
//   fastify.post(
//     "/",
//     controller.create
//       .bind(controller)
//   );

//   /*
//    * LIST
//    */
//   fastify.get(
//     "/",
//     controller.findMany
//       .bind(controller)
//   );

//   /*
//    * FIND BY ID
//    */
//   fastify.get(
//     "/:id",
//     controller.findById
//       .bind(controller)
//   );

//   /*
//    * UPDATE
//    */
//   fastify.put(
//     "/:id",
//     controller.update
//       .bind(controller)
//   );

//   /*
//    * ACTIVATE
//    */
//   fastify.patch(
//     "/:id/activate",
//     controller.activate
//       .bind(controller)
//   );

//   /*
//    * DEACTIVATE
//    */
//   fastify.patch(
//     "/:id/deactivate",
//     controller.deactivate
//       .bind(controller)
//   );
// }

import { Router } from "express";
import { CustomerController } from "./customer.controller.js";

const router = Router();
const controller = new CustomerController();

router.post("/", controller.create.bind(controller));

router.get("/", controller.findMany.bind(controller));

router.get("/:id", controller.findById.bind(controller));

router.put("/:id", controller.update.bind(controller));

router.patch(
  "/:id/activate",
  controller.activate.bind(controller)
);

router.patch(
  "/:id/deactivate",
  controller.deactivate.bind(controller)
);

router.patch(
  "/:id/assign-seller",
  controller.assignSeller.bind(
    controller
  )
);

export default router;