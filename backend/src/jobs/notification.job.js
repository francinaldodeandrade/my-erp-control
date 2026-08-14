import { documentNotification }
  from "../services/notification/documentNotification.js";

import { maintenanceNotification }
  from "../services/notification/maintenanceNotification.js";

import { stockNotification }
  from "../services/notification/stockNotification.js";

import { salesNotification }
  from "../services/notification/salesNotification.js";

import { purchaseNotification }
  from "../services/notification/purchaseNotification.js";

export async function notificationJob() {
  console.log("🔔 Notification Job iniciado");

  await documentNotification();

  await maintenanceNotification();

  await stockNotification();

  await salesNotification();

  await purchaseNotification();

  console.log("✅ Notification Job finalizado");
}