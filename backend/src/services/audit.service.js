import { AuditRepository } from "../repositories/audit.repository.js";

const auditRepository =
  new AuditRepository();

export class AuditService {
  async create({
    userId,
    tableName,
    recordId,
    action,
    oldData = null,
    newData = null,
    ipAddress = null,
  }) {
    return auditRepository.create({
      userId,
      tableName,
      recordId,
      action,
      oldData,
      newData,
      ipAddress,
    });
  }
}