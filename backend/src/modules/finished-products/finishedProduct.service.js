import { FinishedProductRepository }
  from "./finishedProduct.repository.js";

const repository =
  new FinishedProductRepository();

export class FinishedProductService {
  async create(data) {
    const exists =
      await repository.findByCode(
        data.code
      );

    if (exists) {
      throw new Error(
        "Código já cadastrado."
      );
    }

    return repository.create({
      ...data,

      productionCost:
        data.productionCost || 0,

      currentStock: 0,
    });
  }

  async findAll() {
    return repository.findAll();
  }

  async findById(id) {
    const product =
      await repository.findById(id);

    if (!product) {
      throw new Error(
        "Produto não encontrado."
      );
    }

    return product;
  }

  async update(id, data) {
    await this.findById(id);

    return repository.update(
      id,
      data
    );
  }

  async activate(id) {
    return repository.toggleActive(
      id,
      true
    );
  }

  async deactivate(id) {
    return repository.toggleActive(
      id,
      false
    );
  }
}
