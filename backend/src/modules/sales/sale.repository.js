import { prisma } from "../../config/prisma.js";

export class SaleRepository {
  async create(data) {
    return prisma.sale.create({
      data,
      include: {
        customer: true,
        seller: true,
        items: true,
        payments: true,
      },
    });
  }

  async findById(id) {
    return prisma.sale.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        seller: true,
        items: {
          include: {
            finishedProduct: true,
          },
        },
        payments: true,
      },
    });
  }

  async findMany(where = {}) {
    return prisma.sale.findMany({
      where,
      include: {
        customer: true,
        seller: true,
      },
      orderBy: {
        saleDate: "desc",
      },
    });
  }

  async updateStatus(id, status) {
    return prisma.sale.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}