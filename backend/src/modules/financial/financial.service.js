  import { FinancialRepository }
  from "./financial.repository.js";

const repository =
  new FinancialRepository();

export class FinancialService {
  async create(data) {
    return repository.create(data);
  }

  async findById(id) {
    const transaction =
      await repository.findById(id);

    if (!transaction) {
      throw new Error(
        "Lançamento financeiro não encontrado."
      );
    }

    return transaction;
  }

   async createPayableFromPurchase(
  purchase
) {
  return repository.create({
    referenceNumber:
      purchase.number,

    description:
      `Compra ${purchase.number}`,

    type: "PAYABLE",

    status: "OPEN",

    amount:
      purchase.totalAmount,

    dueDate:
      purchase.expectedDelivery ||
      new Date(),

    supplierId:
      purchase.supplierId,
  });
}

  async findMany() {
    return repository.findMany();
  }

  async findReceivables() {
    return repository.findReceivables();
  }

  async findPayables() {
    return repository.findPayables();
  }

  async pay(id) {
    const transaction =
      await repository.findById(id);

    if (!transaction) {
      throw new Error(
        "Lançamento financeiro não encontrado."
      );
    }

    if (transaction.status === "PAID") {
      throw new Error(
        "Lançamento já foi baixado."
      );
    }

    return repository.markAsPaid(
      id,
      new Date()
    );
  }

  async cancel(id) {
    const transaction =
      await repository.findById(id);

    if (!transaction) {
      throw new Error(
        "Lançamento financeiro não encontrado."
      );
    }

    return repository.cancel(id);
  }

  async getSummary() {
    return repository.getFinancialSummary();
  }

  /**
   * INTEGRAÇÃO COM SALES
   */
  async createReceivableFromSale(
    sale
  ) {
    return repository.create({
      referenceNumber:
        sale.number,

      description:
        `Venda ${sale.number}`,

      type: "RECEIVABLE",

      status: "OPEN",

      amount:
        sale.totalAmount,

      dueDate:
        sale.saleDate,

      customerId:
        sale.customerId,

      saleId: sale.id,
    });
  }
}
