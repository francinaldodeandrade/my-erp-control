import { RawMaterialService }
  from "./rawMaterial.service.js";

const service =
  new RawMaterialService();

export class RawMaterialController {
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
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async activate(req, res) {
    const data =
      await service.activate(
        req.params.id
      );

    return res.json({
      success: true,
      data,
    });
  }

  async deactivate(req, res) {
    const data =
      await service.deactivate(
        req.params.id
      );

    return res.json({
      success: true,
      data,
    });
  }
}
