import api from "./axios";

export const rolesApi = {
  getAll: () =>
    api.get("/roles"),
};