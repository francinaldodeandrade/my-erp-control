import { prisma } from "../../config/prisma.js";

export class SellerRepository {
  async findMany() {
    return prisma.user.findMany({
      where: {
        active: true,
        role: {
          name: "Vendas",
        },
      },
      include: {
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
  }

  async findCustomers(id) {
    return prisma.customer.findMany({
      where: {
        sellerId: id,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async findSales(id) {
    return prisma.sale.findMany({
      where: {
        sellerId: id,
      },
      include: {
        customer: true,
      },
      orderBy: {
        saleDate: "desc",
      },
    });
  }

  async findDistributions(id) {
    return prisma.stockDistribution.findMany({
      where: {
        sellerId: id,
      },
      include: {
        finishedProduct: true,
      },
      orderBy: {
        distributedAt: "desc",
      },
    });
  }

  async getDashboard(id) {
    const customers =
      await prisma.customer.count({
        where: {
          sellerId: id,
        },
      });

    const sales =
      await prisma.sale.count({
        where: {
          sellerId: id,
        },
      });

    const distributions =
      await prisma.stockDistribution.count({
        where: {
          sellerId: id,
        },
      });

    const salesAmount =
      await prisma.sale.aggregate({
        where: {
          sellerId: id,
        },
        _sum: {
          totalAmount: true,
        },
      });

    return {
      customers,
      sales,
      distributions,
      salesAmount:
        salesAmount._sum.totalAmount ?? 0,
    };
  }
}
``