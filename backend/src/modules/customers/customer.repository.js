import { prisma } from "../../config/prisma.js";

export class CustomerRepository {
  async create(data) {
    return prisma.customer.create({
      data,
    });
  }

  async assignSeller(
  customerId,
  sellerId
) {
  return prisma.customer.update({
    where: {
      id: customerId,
    },
    data: {
      sellerId,
    },
  });
}

  async findById(id) {
    return prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByCpfCnpj(cpfCnpj) {
    return prisma.customer.findUnique({
      where: {
        cpfCnpj,
      },
    });
  }

  async findByCode(code) {
    return prisma.customer.findUnique({
      where: {
        code,
      },
    });
  }

  async findMany({
    page = 1,
    perPage = 20,
    search,
    active,
    sellerId,
  }) {
    const where = {
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            cpfCnpj: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            code: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(active !== undefined && {
        active,
      }),

      ...(sellerId && {
        sellerId,
      }),
    };

    const [customers, total] =
      await prisma.$transaction([
        prisma.customer.findMany({
          where,

          skip: (page - 1) * perPage,

          take: perPage,

          orderBy: {
            createdAt: "desc",
          },

          include: {
            seller: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),

        prisma.customer.count({
          where,
        }),
      ]);

    return {
      customers,
      total,
      page,
      perPage,
      totalPages: Math.ceil(
        total / perPage
      ),
    };
  }

  async update(id, data) {
    return prisma.customer.update({
      where: {
        id,
      },
      data,
    });
  }

  async deactivate(id) {
    return prisma.customer.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }

  async activate(id) {
    return prisma.customer.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
  }

  async delete(id) {
    return prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}