import { prisma } from "../../config/prisma.js";

export class UsersRepository {
 /* async findAll() {
    return prisma.user.findMany({
      include: {
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }*/

    async findAll() {
  return prisma.user.findMany({
    where: {
      active: true,
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
      where: { id },
      include: {
        role: true,
      },
    });
  }

  /*async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }*/

  async findByEmail(email) {
  return prisma.user.findFirst({
    where: {
      email,
      active: true,
    },
  });
}  

  async findRoleByName(name) {
  return prisma.role.findFirst({
    where: {
      name,
    },
  });
}

  async create(data) {
    return prisma.user.create({
      data,
    });
  }

  async update(id, data) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

/*async delete(id) {
  return prisma.user.delete({
    where: { id },
  });
}*/

async delete(id) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      active: false,
    },
  });
}

async toggleActive(id, active) {
  return prisma.user.update({
    where: { id },
    data: {
      active,
    },
  });
}
}