import { FormulaService }
  from "./formula.service.js";

const service =
  new FormulaService();

export class FormulaController {
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
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

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
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async findByProduct(req, res) {
    try {
      const data =
        await service.findByProduct(
          req.params.productId
        );

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}
