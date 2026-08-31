import api from "./axios";

export const sellersApi = {
  getAll: () =>
    api.get("/sellers"),

  getById: (id) =>
    api.get(`/sellers/${id}`),

  getCustomers: (id) =>
    api.get(`/sellers/${id}/customers`),

  getSales: (id) =>
    api.get(`/sellers/${id}/sales`),

  getDistributions: (id) =>
    api.get(`/sellers/${id}/distributions`),

  getDashboard: (id) =>
    api.get(`/sellers/${id}/dashboard`),
};