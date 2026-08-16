import { prisma }
  from "../../config/prisma.js";

export class FinishedProductRepository {
  async create(data) {
    return prisma.finishedProduct.create({
      data,
    });
  }

  async findAll() {
    return prisma.finishedProduct.findMany({
      orderBy: {
        description: "asc",
      },
    });
  }

  async findById(id) {
    return prisma.finishedProduct.findUnique({
      where: { id },
    });
  }

  async findByCode(code) {
    return prisma.finishedProduct.findUnique({
      where: { code },
    });
  }

  async update(id, data) {
    return prisma.finishedProduct.update({
      where: { id },
      data,
    });
  }

  async toggleActive(id, active) {
    return prisma.finishedProduct.update({
      where: { id },

      data: {
        active,
      },
    });
  }
}
