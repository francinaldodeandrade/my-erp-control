import { RolesRepository } from "./roles.repository.js";

const rolesRepository = new RolesRepository();

export class RolesService {
  async findAll() {
    return rolesRepository.findAll();
  }
}