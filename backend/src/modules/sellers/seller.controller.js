import { SellerService }
  from "./seller.service.js";

const service =
  new SellerService();

export class SellerController {
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

  async findCustomers(req, res) {
    try {
      const data =
        await service.findCustomers(
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

  async findSales(req, res) {
    try {
      const data =
        await service.findSales(
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

  async findDistributions(
    req,
    res
  ) {
    try {
      const data =
        await service.findDistributions(
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

  async dashboard(req, res) {
    try {
      const data =
        await service.getDashboard(
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
}
