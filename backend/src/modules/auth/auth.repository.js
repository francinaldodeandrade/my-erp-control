import { prisma } from "../../config/prisma.js";

export class AuthRepository {
  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });
  }

  async findUserById(id) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
  }

  async updateLastLogin(id) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  async savePasswordHistory(
    userId,
    passwordHash
  ) {
    return prisma.passwordHistory.create({
      data: {
        userId,
        passwordHash,
      },
    });
  }

  async getLastPasswords(userId) {
    return prisma.passwordHistory.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
  }

  async updatePassword(
    userId,
    passwordHash
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
        mustChangePassword: false,
      },
    });
  }

  async createSession(data) {
  return prisma.userSession.create({
    data,
  });
}

async deleteSession(token) {
  return prisma.userSession.deleteMany({
    where: {
      token,
    },
  });
}

async findSessions(userId) {
  return prisma.userSession.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
}