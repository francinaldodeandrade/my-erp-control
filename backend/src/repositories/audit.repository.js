import { prisma } from "../config/prisma.js";

export class AuditRepository {
  async create(data) {
    return prisma.auditLog.create({
      data,
    });
  }
}