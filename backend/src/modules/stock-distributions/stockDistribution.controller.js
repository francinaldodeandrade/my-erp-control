import {
  StockDistributionService
} from "./stockDistribution.service.js";

const service =
  new StockDistributionService();

export class StockDistributionController {

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
        message:
          error.message,
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
        message:
          error.message,
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
        message:
          error.message,
      });
    }
  }
}