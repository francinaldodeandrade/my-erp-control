import { prisma }
  from "../../config/prisma.js";

import { FormulaRepository }
  from "./formula.repository.js";

const repository =
  new FormulaRepository();

export class FormulaService {
  async create(data) {
    const product =
      await prisma.finishedProduct.findUnique({
        where: {
          id: data.finishedProductId,
        },
      });

    if (!product) {
      throw new Error(
        "Produto não encontrado."
      );
    }

    return repository.create({
      finishedProductId:
        data.finishedProductId,

      version:
        data.version || 1,

      notes:
        data.notes,

      items: {
        create: data.items,
      },
    });
  }

  async findAll() {
    return repository.findAll();
  }

  async findById(id) {
    const formula =
      await repository.findById(id);

    if (!formula) {
      throw new Error(
        "Ficha técnica não encontrada."
      );
    }

    return formula;
  }

  async findByProduct(
    finishedProductId
  ) {
    const formula =
      await repository.findByProduct(
        finishedProductId
      );

    if (!formula) {
      throw new Error(
        "Ficha técnica não encontrada."
      );
    }

    return formula;
  }
}
