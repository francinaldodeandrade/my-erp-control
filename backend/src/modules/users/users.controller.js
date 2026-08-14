import { UsersService } from "./users.service.js";

const usersService = new UsersService();

export class UsersController {
  async list(req, res, next) {
    try {
      const users = await usersService.findAll();

      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const user = await usersService.findById(
        req.params.id
      );

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = await usersService.create(
        req.body
      );

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const user = await usersService.update(
        req.params.id,
        req.body
      );

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await usersService.delete(
        req.params.id
      );

      return res.json({
        message: "Usuário removido com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleActive(req, res, next) {
    try {
      const user =
        await usersService.toggleActive(
          req.params.id,
          req.body.active
        );

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
