import { prisma }
  from "../../config/prisma.js";

export class StockDistributionRepository {

  async create(data) {
    return prisma.stockDistribution.create({
      data,

      include: {
        seller: true,
        distributedBy: true,
        finishedProduct: true,
      },
    });
  }

  async findAll() {
    return prisma.stockDistribution.findMany({
      include: {
        seller: true,
        distributedBy: true,
        finishedProduct: true,
      },

      orderBy: {
        distributedAt: "desc",
      },
    });
  }

  async findById(id) {
    return prisma.stockDistribution.findUnique({
      where: { id },

      include: {
        seller: true,
        distributedBy: true,
        finishedProduct: true,
      },
    });
  }
}