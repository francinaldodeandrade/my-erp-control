import { prisma }
  from "../../config/prisma.js";

export class RawMaterialRepository {
  async create(data) {
    return prisma.rawMaterial.create({
      data,
    });
  }

  async findAll() {
    return prisma.rawMaterial.findMany({
      include: {
        supplier: true,
      },

      orderBy: {
        description: "asc",
      },
    });
  }

  async findById(id) {
    return prisma.rawMaterial.findUnique({
      where: { id },

      include: {
        supplier: true,
      },
    });
  }

  async findByCode(code) {
    return prisma.rawMaterial.findUnique({
      where: { code },
    });
  }

  async update(id, data) {
    return prisma.rawMaterial.update({
      where: { id },
      data,
    });
  }

  async toggleActive(id, active) {
    return prisma.rawMaterial.update({
      where: { id },

      data: {
        active,
      },
    });
  }
}
