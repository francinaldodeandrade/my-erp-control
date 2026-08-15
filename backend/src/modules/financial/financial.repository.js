import { prisma } from "../../config/prisma.js";

export class FinancialRepository {
  async create(data) {
    return prisma.financialTransaction.create({
      data,
      include: {
        customer: true,
        supplier: true,
        sale: true,
        cashRegister: true,
      },
    });
  }

  async findById(id) {
    return prisma.financialTransaction.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        supplier: true,
        sale: true,
        cashRegister: true,
      },
    });
  }

  async findMany(where = {}) {
    return prisma.financialTransaction.findMany({
      where,
      include: {
        customer: true,
        supplier: true,
        sale: true,
        cashRegister: true,
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  async findReceivables() {
    return prisma.financialTransaction.findMany({
      where: {
        type: "RECEIVABLE",
      },
      include: {
        customer: true,
        sale: true,
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  async findPayables() {
    return prisma.financialTransaction.findMany({
      where: {
        type: "PAYABLE",
      },
      include: {
        supplier: true,
      },
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  async markAsPaid(id, paymentDate) {
    return prisma.financialTransaction.update({
      where: {
        id,
      },
      data: {
        status: "PAID",
        paymentDate,
      },
    });
  }

  async cancel(id) {
    return prisma.financialTransaction.update({
      where: {
        id,
      },
      data: {
        status: "CANCELED",
      },
    });
  }

  async getOpenReceivablesTotal() {
    return prisma.financialTransaction.aggregate({
      where: {
        type: "RECEIVABLE",
        status: "OPEN",
      },
      _sum: {
        amount: true,
      },
    });
  }

  async getOpenPayablesTotal() {
    return prisma.financialTransaction.aggregate({
      where: {
        type: "PAYABLE",
        status: "OPEN",
      },
      _sum: {
        amount: true,
      },
    });
  }

  async getFinancialSummary() {
    const receivables =
      await this.getOpenReceivablesTotal();

    const payables =
      await this.getOpenPayablesTotal();

    return {
      receivables:
        receivables._sum.amount ?? 0,

      payables:
        payables._sum.amount ?? 0,
    };
  }
}