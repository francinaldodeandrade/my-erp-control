import { prisma } from "../../config/prisma.js";

export async function createNotification(data) {
  const exists =
    await prisma.notification.findUnique({
      where: {
        sourceKey: data.sourceKey,
      },
    });

  if (exists) {
    return;
  }

  await prisma.notification.create({
    data,
  });
}