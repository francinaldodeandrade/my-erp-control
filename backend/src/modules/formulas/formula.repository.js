import { prisma }
  from "../../config/prisma.js";

export class FormulaRepository {
  async create(data) {
    return prisma.productFormula.create({
      data,

      include: {
        finishedProduct: true,
        items: true,
      },
    });
  }

  async findAll() {
    return prisma.productFormula.findMany({
      include: {
        finishedProduct: true,
        items: {
          include: {
            rawMaterial: true,
            finishedProduct: true,
            maintenancePart: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return prisma.productFormula.findUnique({
      where: { id },

      include: {
        finishedProduct: true,

        items: {
          include: {
            rawMaterial: true,
            finishedProduct: true,
            maintenancePart: true,
          },
        },
      },
    });
  }

  async findByProduct(
    finishedProductId
  ) {
    return prisma.productFormula.findFirst({
      where: {
        finishedProductId,
        active: true,
      },

      include: {
        items: true,
      },

      orderBy: {
        version: "desc",
      },
    });
  }
}
