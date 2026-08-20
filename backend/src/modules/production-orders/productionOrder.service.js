import { prisma }
  from "../../config/prisma.js";

import { ProductionOrderRepository }
  from "./productionOrder.repository.js";

const repository =
  new ProductionOrderRepository();

export class ProductionOrderService {
  async create(data) {
    const product =
      await prisma.finishedProduct.findUnique({
        where: {
          id: data.finishedProductId,
        },
      });

    if (!product) {
      throw new Error(
        "Produto acabado não encontrado."
      );
    }

    const formula =
      await prisma.productFormula.findUnique({
        where: {
          id: data.formulaId,
        },
      });

    if (!formula) {
      throw new Error(
        "Ficha técnica não encontrada."
      );
    }

    const orderNumber =
      `OP-${Date.now()}`;

    return repository.create({
      number: orderNumber,

      finishedProductId:
        data.finishedProductId,

      formulaId:
        data.formulaId,

      plannedQuantity:
        data.plannedQuantity,

      notes:
        data.notes,
    });
  }

  async findAll() {
    return repository.findAll();
  }

  async findById(id) {
    const order =
      await repository.findById(id);

    if (!order) {
      throw new Error(
        "Ordem de produção não encontrada."
      );
    }

    return order;
  }

  async release(id) {
    return repository.update(id, {
      status: "RELEASED",
    });
  }

  async start(id) {
    return repository.update(id, {
      status: "IN_PROGRESS",

      startedAt:
        new Date(),
    });
  }

//   async finish(id, data) {
//   const order =
//     await this.findById(id);

//   if (
//     data.producedQuantity >
//     order.plannedQuantity
//   ) {
//     throw new Error(
//       "Quantidade produzida não pode ser maior que a planejada."
//     );
//   }

//   const lossQuantity =
//     Number(order.plannedQuantity) -
//     Number(data.producedQuantity);

//   return repository.update(id, {
//     status: "COMPLETED",

//     producedQuantity:
//       data.producedQuantity,

//     lossQuantity,

//     productionNotes:
//       data.productionNotes,

//     finishedAt:
//       new Date(),
//   });
//  }

async finish(id, data) {
  const order =
    await this.findById(id);

  const plannedQuantity =
    Number(order.plannedQuantity);

  const producedQuantity =
    Number(data.producedQuantity || 0);

  const lossQuantity =
    Number(data.lossQuantity || 0);

  const returnedQuantity =
    Number(data.returnedQuantity || 0);

  const total =
    producedQuantity +
    lossQuantity +
    returnedQuantity;

  if (total !== plannedQuantity) {
    throw new Error(
      `A soma de produzido (${producedQuantity}) + perdas (${lossQuantity}) + devolução (${returnedQuantity}) deve ser igual à quantidade planejada (${plannedQuantity}).`
    );
  }

  return repository.update(id, {
    status: "COMPLETED",

    producedQuantity,

    lossQuantity,

    returnedQuantity,

    productionNotes:
      data.productionNotes,

    finishedAt: new Date(),
  });
}
}
