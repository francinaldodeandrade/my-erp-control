import { SellerRepository }
  from "./seller.repository.js";

const repository =
  new SellerRepository();

export class SellerService {
  async findMany() {
    return repository.findMany();
  }

  async findById(id) {
    const seller =
      await repository.findById(id);

    if (!seller) {
      throw new Error(
        "Vendedor não encontrado."
      );
    }

    return seller;
  }

  async findCustomers(id) {
    await this.findById(id);

    return repository.findCustomers(id);
  }

  async findSales(id) {
    await this.findById(id);

    return repository.findSales(id);
  }

  async findDistributions(id) {
    await this.findById(id);

    return repository.findDistributions(id);
  }

  async getDashboard(id) {
    await this.findById(id);

    return repository.getDashboard(id);
  }
}