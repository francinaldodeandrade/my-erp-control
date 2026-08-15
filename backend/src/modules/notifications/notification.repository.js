import { prisma } from "../../config/prisma.js";

export class NotificationRepository {
  async findMany() {
    return prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return prisma.notification.findUnique({
      where: {
        id,
      },
    });
  }

  async markAsRead(id) {
    return prisma.notification.update({
      where: {
        id,
      },
      data: {
        status: "READ",
        readAt: new Date(),
      },
    });
  }

  async resolve(id) {
    return prisma.notification.update({
      where: {
        id,
      },
      data: {
        status: "RESOLVED",
        resolvedAt: new Date(),
      },
    });
  }
}