import { RolesService } from "./roles.service.js";

const rolesService = new RolesService();

export class RolesController {
  async list(req, res, next) {
    try {
      const roles =
        await rolesService.findAll();

      return res.json(roles);

    } catch (error) {
      next(error);
    }
  }
}