import { SaleService }
  from "./sale.service.js";

const service =
  new SaleService();

export class SaleController {
  async create(req, res) {
    try {
      const sale =
        await service.create(
          req.body
        );

      return res.status(201).json({
        success: true,
        data: sale,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async findMany(req, res) {
    try {
      const sales =
        await service.findMany();

      return res.json({
        success: true,
        data: sales,
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
      const sale =
        await service.findById(
          req.params.id
        );

      return res.json({
        success: true,
        data: sale,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async approve(req, res) {
    const sale =
      await service.approve(
        req.params.id
      );

    return res.json({
      success: true,
      data: sale,
    });
  }

  async cancel(req, res) {
    const sale =
      await service.cancel(
        req.params.id
      );

    return res.json({
      success: true,
      data: sale,
    });
  }
}