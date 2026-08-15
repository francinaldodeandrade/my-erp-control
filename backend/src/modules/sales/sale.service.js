import { randomUUID } from "crypto";

import { prisma } from "../../config/prisma.js";
import { SaleRepository } from "./sale.repository.js";
import { FinancialService } from "../financial/financial.service.js";
import { StockService } from "../stock/stock.service.js";
import { createNotification } from "../../services/notification/createNotification.js";

const repository = new SaleRepository();

const financialService = new FinancialService();

const stockService = new StockService();

export class SaleService {
  async create(data) {
    const customer =
      await prisma.customer.findUnique({
        where: {
          id: data.customerId,
        },
      });

    if (!customer) {
      throw new Error(
        "Cliente não encontrado."
      );
    }

    const seller =
      await prisma.user.findUnique({
        where: {
          id: data.sellerId,
        },
      });

    if (!seller) {
      throw new Error(
        "Vendedor não encontrado."
      );
    }

    let subtotal = 0;

    const items = [];

    for (const item of data.items) {
      const product =
        await prisma.finishedProduct.findUnique({
          where: {
            id: item.finishedProductId,
          },
        });

      if (!product) {
        throw new Error(
          "Produto não encontrado."
        );
      }

      const totalPrice =
        Number(item.quantity) *
        Number(item.unitPrice);

      subtotal += totalPrice;

      items.push({
        finishedProductId:
          item.finishedProductId,

        quantity: item.quantity,

        unitPrice: item.unitPrice,

        totalPrice,
      });
    }

    const totalAmount =
      subtotal - Number(data.discount || 0);

    return repository.create({
      number: `SALE-${Date.now()}`,

      customerId: data.customerId,

      sellerId: data.sellerId,

      subtotal,

      discount:
        data.discount || 0,

      totalAmount,

      notes: data.notes,

      items: {
        create: items,
      },

      payments: {
        create: data.payments,
      },
    });
  }

  async findMany() {
    return repository.findMany();
  }

  async findById(id) {
    const sale =
      await repository.findById(id);

    if (!sale) {
      throw new Error(
        "Venda não encontrada."
      );
    }

    return sale;
  }

  // async approve(id) {
  //   return repository.updateStatus(
  //     id,
  //     "APPROVED"
  //   );
  // }

//   async approve(id) {
//   const sale =
//     await repository.findById(id);

//   if (!sale) {
//     throw new Error(
//       "Venda não encontrada."
//     );
//   }

//   if (
//     sale.status === "APPROVED"
//   ) {
//     throw new Error(
//       "Venda já aprovada."
//     );
//   }

//   const approvedSale =
//     await repository.updateStatus(
//       id,
//       "APPROVED"
//     );

//   await financialService
//     .createReceivableFromSale(
//       sale
//     );

//   return approvedSale;
// }

  async approve(id) {
  const sale =
    await repository.findById(id);

  if (!sale) {
    throw new Error(
      "Venda não encontrada."
    );
  }

  if (sale.status === "APPROVED") {
    throw new Error(
      "Venda já aprovada."
    );
  }

  const approvedSale =
    await repository.updateStatus(
      id,
      "APPROVED"
    );

  await financialService
    .createReceivableFromSale(
      sale
    );

  await stockService
    .processSale(
      sale
    );

  await createNotification({
  title: "Venda aprovada",
  message: `Venda ${sale.number} aprovada com sucesso.`,
  type: "SYSTEM",
  referenceTable: "sales",
  referenceId: sale.id,
});

await createNotification({
  title: "Conta a receber criada",
  message: `Recebível de R$ ${sale.totalAmount} criado para a venda ${sale.number}.`,
  type: "FINANCIAL",
  referenceTable: "financial_transactions",
  referenceId: sale.id,
});

  return approvedSale;
}

  async cancel(id) {
    return repository.updateStatus(
      id,
      "CANCELED"
    );
  }
}