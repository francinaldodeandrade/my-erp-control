import { prisma }
  from "../../config/prisma.js";

export class ProductionOrderRepository {
  async create(data) {
    return prisma.productionOrder.create({
      data,

      include: {
        finishedProduct: true,
        formula: true,
      },
    });
  }

  async findAll() {
     console.log("productionOrder =>",
prisma.productionOrder
);     

    return prisma.productionOrder.findMany({
      include: {
        finishedProduct: true,
        formula: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return prisma.productionOrder.findUnique({
      where: { id },

      include: {
        finishedProduct: true,

        formula: {
          include: {
            items: true,
          },
        },
      },
    });
  }

  async update(id, data) {
    return prisma.productionOrder.update({
      where: { id },
      data,
    });
  }
}
