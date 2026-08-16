import { PurchaseService }
  from "./purchase.service.js";

const service =
  new PurchaseService();

export class PurchaseController {
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
   
  async receive(req, res) {
  try {
    const data =
      await service.receive(
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

  async receive(req, res) {
  try {
    const data =
      await service.receive(
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
  
  async approve(req, res) {
   try {
      const data =
        await service.approve(
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
