import { RawMaterialRepository }
  from "./rawMaterial.repository.js";

const repository =
  new RawMaterialRepository();

export class RawMaterialService {
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
      currentStock: 0,
    });
  }

  async findAll() {
    return repository.findAll();
  }

  async findById(id) {
    const material =
      await repository.findById(id);

    if (!material) {
      throw new Error(
        "Matéria-prima não encontrada."
      );
    }

    return material;
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
