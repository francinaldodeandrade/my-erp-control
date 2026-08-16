import { prisma }
  from "../../config/prisma.js";

export class PurchaseRepository {
  async create(data) {
    return prisma.purchaseOrder.create({
      data,
      include: {
        supplier: true,
        items: true,
      },
    });
  }

  async findAll() {
    return prisma.purchaseOrder.findMany({
      include: {
        supplier: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return prisma.purchaseOrder.findUnique({
      where: { id },

      include: {
        supplier: true,

        items: {
          include: {
            rawMaterial: true,
            maintenancePart: true,
          },
        },
      },
    });
  }

  async updateStatus(
    id,
    status
  ) {
    return prisma.purchaseOrder.update({
      where: { id },

      data: {
        status,
      },
    });
  }
}
