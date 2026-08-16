import { AppError }
  from "../../utils/AppError.js";

import { SupplierRepository }
  from "./supplier.repository.js";

const supplierRepository =
  new SupplierRepository();

export class SupplierService {
  async findAll() {
    return supplierRepository.findAll();
  }

  async findById(id) {
    const supplier =
      await supplierRepository.findById(
        id
      );

    if (!supplier) {
      throw new AppError(
        "Fornecedor não encontrado",
        404
      );
    }

    return supplier;
  }

  async create(data) {
    const exists =
      await supplierRepository.findByCpfCnpj(
        data.cpfCnpj
      );

    if (exists) {
      throw new AppError(
        "CPF/CNPJ já cadastrado",
        409
      );
    }

    return supplierRepository.create({
      ...data,
      active: true,
    });
  }

  async update(id, data) {
    const supplier =
      await supplierRepository.findById(
        id
      );

    if (!supplier) {
      throw new AppError(
        "Fornecedor não encontrado",
        404
      );
    }

    if (
      data.cpfCnpj &&
      data.cpfCnpj !== supplier.cpfCnpj
    ) {
      const exists =
        await supplierRepository.findByCpfCnpj(
          data.cpfCnpj
        );

      if (exists) {
        throw new AppError(
          "CPF/CNPJ já cadastrado",
          409
        );
      }
    }

    return supplierRepository.update(
      id,
      data
    );
  }

  async activate(id) {
    const supplier =
      await supplierRepository.findById(
        id
      );

    if (!supplier) {
      throw new AppError(
        "Fornecedor não encontrado",
        404
      );
    }

    return supplierRepository.toggleActive(
      id,
      true
    );
  }

  async deactivate(id) {
    const supplier =
      await supplierRepository.findById(
        id
      );

    if (!supplier) {
      throw new AppError(
        "Fornecedor não encontrado",
        404
      );
    }

    return supplierRepository.toggleActive(
      id,
      false
    );
  }
}
