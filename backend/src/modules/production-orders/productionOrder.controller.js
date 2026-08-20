import { ProductionOrderService }
  from "./productionOrder.service.js";

const service =
  new ProductionOrderService();

export class ProductionOrderController {
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

  async release(req, res) {
    const data =
      await service.release(
        req.params.id
      );

    return res.json({
      success: true,
      data,
    });
  }

  async start(req, res) {
    const data =
      await service.start(
        req.params.id
      );

    return res.json({
      success: true,
      data,
    });
  }

  // async finish(req, res) {
  // try {
  //   const data =
  //     await service.finish(
  //       req.params.id,
  //       req.body
  //     );

  //   return res.json({
  //     success: true,
  //     data,
  //   });
  // } catch (error) {
  //   return res.status(400).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }


  //   return res.json({
  //     success: true,
  //     data,
  //   });
  // }
  async finish(req, res) {
  try {
    const data =
      await service.finish(
        req.params.id,
        req.body
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
