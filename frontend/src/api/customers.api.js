import api from "./axios";

export const customersApi = {
  getAll: (params) =>
    api.get("/customers", {
      params,
    }),

  getById: (id) =>
    api.get(`/customers/${id}`),

  create: (data) =>
    api.post("/customers", data),

  update: (id, data) =>
    api.put(
      `/customers/${id}`,
      data
    ),

  activate: (id) =>
    api.patch(
      `/customers/${id}/activate`
    ),

  deactivate: (id) =>
    api.patch(
      `/customers/${id}/deactivate`
    ),

  assignSeller: (
    customerId,
    sellerId
  ) =>
    api.patch(
      `/customers/${customerId}/assign-seller`,
      {
        sellerId,
      }
    ),
};