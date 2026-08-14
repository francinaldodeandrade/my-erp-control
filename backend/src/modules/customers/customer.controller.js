import { CustomerService }
  from "./customer.service.js";

const service = new CustomerService();

export class CustomerController {
  async create(request, reply) {
    try {
      const customer =
        await service.create(
          request.body
        );

      return reply.status(201).send({
        success: true,
        data: customer,
      });
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  async assignSeller(
  request,
  reply
) {
  try {
    const { id } = request.params;

    const { sellerId } =
      request.body;

    const customer =
      await service.assignSeller(
        id,
        sellerId
      );

    return reply.send({
      success: true,
      data: customer,
    });
  } catch (error) {
    return reply.status(400).send({
      success: false,
      message: error.message,
    });
  }
}

  async findById(request, reply) {
    try {
      const { id } = request.params;

      const customer =
        await service.findById(id);

      return reply.send({
        success: true,
        data: customer,
      });
    } catch (error) {
      return reply.status(404).send({
        success: false,
        message: error.message,
      });
    }
  }

  async findMany(request, reply) {
    try {
      const result =
        await service.findMany(
          request.query
        );

      return reply.send({
        success: true,
        ...result,
      });
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  async update(request, reply) {
    try {
      const { id } = request.params;

      const customer =
        await service.update(
          id,
          request.body
        );

      return reply.send({
        success: true,
        data: customer,
      });
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  async activate(request, reply) {
    try {
      const { id } = request.params;

      const customer =
        await service.activate(id);

      return reply.send({
        success: true,
        data: customer,
      });
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  async deactivate(request, reply) {
    try {
      const { id } = request.params;

      const customer =
        await service.deactivate(id);

      return reply.send({
        success: true,
        data: customer,
      });
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }
}