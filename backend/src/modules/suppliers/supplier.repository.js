import { prisma } from "../../config/prisma.js";

export class SupplierRepository {
  async create(data) {
    return prisma.supplier.create({
      data,
    });
  }

  async findAll() {
    return prisma.supplier.findMany({
      orderBy: {
  companyName: "asc",
  },
    });
  }

  async findById(id) {
    return prisma.supplier.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCpfCnpj(cpfCnpj) {
    return prisma.supplier.findUnique({
      where: {
        cpfCnpj,
      },
    });
  }

  async update(id, data) {
    return prisma.supplier.update({
      where: {
        id,
      },
      data,
    });
  }

  async toggleActive(id, active) {
    return prisma.supplier.update({
      where: {
        id,
      },
      data: {
        active,
      },
    });
  }
}
