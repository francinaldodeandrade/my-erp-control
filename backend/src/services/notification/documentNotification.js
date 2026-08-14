import { prisma } from "../../config/prisma.js";
import { createNotification } from "./createNotification.js";

const DAYS_WARNING = 30;

export async function documentNotification() {
  const today = new Date();

  const limitDate = new Date();

  limitDate.setDate(
    limitDate.getDate() + DAYS_WARNING
  );

  const drivers =
    await prisma.driver.findMany({
      where: {
        licenseExpiration: {
          gte: today,
          lte: limitDate,
        },
      },
    });

  for (const driver of drivers) {
    await createNotification({
      title: "CNH próxima do vencimento",

      message:
        `A CNH do motorista ${driver.employeeName} vence em breve.`,

      type: "DRIVER_LICENSE",

      priority: "HIGH",

      sourceKey:
        `DRIVER_LICENSE:${driver.id}`,

      referenceTable: "drivers",

      referenceId: driver.id,

      dueDate:
        driver.licenseExpiration,
    });
  }

  const vehicles =
    await prisma.vehicle.findMany();

  for (const vehicle of vehicles) {
    if (
      vehicle.documentExpiration &&
      vehicle.documentExpiration <=
        limitDate
    ) {
      await createNotification({
        title:
          "Documento de veículo próximo do vencimento",

        message:
          `O veículo ${vehicle.plate} possui documento próximo do vencimento.`,

        type:
          "VEHICLE_DOCUMENT",

        priority: "HIGH",

        sourceKey:
          `VEHICLE_DOCUMENT:${vehicle.id}`,

        referenceTable:
          "vehicles",

        referenceId: vehicle.id,

        dueDate:
          vehicle.documentExpiration,
      });
    }

    if (
      vehicle.insuranceExpiration &&
      vehicle.insuranceExpiration <=
        limitDate
    ) {
      await createNotification({
        title:
          "Seguro próximo do vencimento",

        message:
          `O seguro do veículo ${vehicle.plate} vence em breve.`,

        type:
          "VEHICLE_INSURANCE",

        priority: "HIGH",

        sourceKey:
          `VEHICLE_INSURANCE:${vehicle.id}`,

        referenceTable:
          "vehicles",

        referenceId: vehicle.id,

        dueDate:
          vehicle.insuranceExpiration,
      });
    }
  }

  const documents =
    await prisma.document.findMany({
      where: {
        active: true,
        expirationDate: {
          gte: today,
          lte: limitDate,
        },
      },
    });

  for (const document of documents) {
    await createNotification({
      title:
        "Documento próximo do vencimento",

      message:
        `${document.name} vence em breve.`,

      type: "SYSTEM",

      priority: "MEDIUM",

      sourceKey:
        `DOCUMENT:${document.id}`,

      referenceTable:
        "documents",

      referenceId: document.id,

      dueDate:
        document.expirationDate,
    });
  }
}