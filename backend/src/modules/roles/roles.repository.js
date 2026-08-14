import { prisma } from "../../config/prisma.js";

export class RolesRepository {
  async findAll() {
    return prisma.role.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}