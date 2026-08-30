import api from "./axios";

export const usersApi = {
  getAll: () =>
    api.get("/users"),

  getById: (id) =>
    api.get(`/users/${id}`),

  create: (data) =>
    api.post("/users", data),

  update: (id, data) =>
    api.put(`/users/${id}`, data),

  toggleActive: (id, active) =>
    api.patch(
      `/users/${id}/active`,
      {
        active,
      }
    ),

  remove: (id) =>
    api.delete(`/users/${id}`),
};