import { SupplierService }
  from "./supplier.service.js";

const service =
  new SupplierService();

export class SupplierController {
  async findAll(req, res) {
    try {
      const data =
        await service.findAll();

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async findById(req, res) {
    try {
      const data =
        await service.findById(
          req.params.id
        );

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(
        error.statusCode || 404
      ).json({
        success: false,
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const data =
        await service.create(
          req.body
        );

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(
        error.statusCode || 400
      ).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const data =
        await service.update(
          req.params.id,
          req.body
        );

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(
        error.statusCode || 400
      ).json({
        success: false,
        message: error.message,
      });
    }
  }

  async activate(req, res) {
    try {
      const data =
        await service.activate(
          req.params.id
        );

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(
        error.statusCode || 400
      ).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deactivate(req, res) {
    try {
      const data =
        await service.deactivate(
          req.params.id
        );

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(
        error.statusCode || 400
      ).json({
        success: false,
        message: error.message,
      });
    }
  }
}
