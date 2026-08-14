import { CustomerRepository }
  from "./customer.repository.js";

const repository = new CustomerRepository();

export class CustomerService {
  async create(data) {
    if (data.cpfCnpj) {
      const existingCustomer =
        await repository.findByCpfCnpj(
          data.cpfCnpj
        );

      if (existingCustomer) {
        throw new Error(
          "CPF/CNPJ já cadastrado."
        );
      }
    }

    if (data.code) {
      const existingCode =
        await repository.findByCode(
          data.code
        );

      if (existingCode) {
        throw new Error(
          "Código de cliente já cadastrado."
        );
      }
    }

    return repository.create(data);
  }

  async assignSeller(
  customerId,
  sellerId
) {
  const customer =
    await repository.findById(
      customerId
    );

  if (!customer) {
    throw new Error(
      "Cliente não encontrado."
    );
  }

  return repository.assignSeller(
    customerId,
    sellerId
  );
}

  async findById(id) {
    const customer =
      await repository.findById(id);

    if (!customer) {
      throw new Error(
        "Cliente não encontrado."
      );
    }

    return customer;
  }

  async findMany(filters) {
    return repository.findMany(filters);
  }

  async update(id, data) {
    const customer =
      await repository.findById(id);

    if (!customer) {
      throw new Error(
        "Cliente não encontrado."
      );
    }

    if (
      data.cpfCnpj &&
      data.cpfCnpj !== customer.cpfCnpj
    ) {
      const existingCustomer =
        await repository.findByCpfCnpj(
          data.cpfCnpj
        );

      if (existingCustomer) {
        throw new Error(
          "CPF/CNPJ já cadastrado."
        );
      }
    }

    return repository.update(
      id,
      data
    );
  }

  async activate(id) {
    const customer =
      await repository.findById(id);

    if (!customer) {
      throw new Error(
        "Cliente não encontrado."
      );
    }

    return repository.activate(id);
  }

  async deactivate(id) {
    const customer =
      await repository.findById(id);

    if (!customer) {
      throw new Error(
        "Cliente não encontrado."
      );
    }

    return repository.deactivate(id);
  }
}