import { prisma } from "../../config/prisma.js";
import { createNotification } from "./createNotification.js";

export async function maintenanceNotification() {
  const today = new Date();

  const limitDate = new Date();

  limitDate.setDate(
    limitDate.getDate() + 30
  );

  const vehicles =
    await prisma.maintenanceSchedule.findMany({
      where: {
        active: true,
        nextExecutionDate: {
          gte: today,
          lte: limitDate,
        },
      },
    });

  for (const schedule of vehicles) {
    await createNotification({
      title:
        "Manutenção de veículo programada",

      message:
        `${schedule.serviceName} está próxima da execução.`,

      type: "MAINTENANCE",

      priority: "HIGH",

      sourceKey:
        `VEHICLE_MAINTENANCE:${schedule.id}`,

      referenceTable:
        "maintenance_schedules",

      referenceId: schedule.id,

      dueDate:
        schedule.nextExecutionDate,
    });
  }

  const machines =
    await prisma.machineMaintenanceSchedule.findMany({
      where: {
        active: true,
        nextExecutionDate: {
          gte: today,
          lte: limitDate,
        },
      },
    });

  for (const schedule of machines) {
    await createNotification({
      title:
        "Manutenção de máquina programada",

      message:
        `${schedule.serviceName} está próxima da execução.`,

      type: "MAINTENANCE",

      priority: "HIGH",

      sourceKey:
        `MACHINE_MAINTENANCE:${schedule.id}`,

      referenceTable:
        "machine_maintenance_schedules",

      referenceId: schedule.id,

      dueDate:
        schedule.nextExecutionDate,
    });
  }
}