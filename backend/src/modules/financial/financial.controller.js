import { FinancialService }
  from "./financial.service.js";

const service =
  new FinancialService();

export class FinancialController {
  async create(req, res) {
    try {
      const transaction =
        await service.create(
          req.body
        );

      return res.status(201).json({
        success: true,
        data: transaction,
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
      const data =
        await service.findMany();

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

  async receivables(req, res) {
    try {
      const data =
        await service.findReceivables();

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

  async payables(req, res) {
    try {
      const data =
        await service.findPayables();

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

  async pay(req, res) {
    try {
      const data =
        await service.pay(
          req.params.id
        );

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

  async cancel(req, res) {
    try {
      const data =
        await service.cancel(
          req.params.id
        );

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

  async summary(req, res) {
    try {
      const data =
        await service.getSummary();

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
}