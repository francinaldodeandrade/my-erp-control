// // src/api/auth.api.js

// import api from "./axios";

// export const authApi = {
//   login: (data) =>
//     api.post("/auth/login", data),

//   me: () =>
//     api.get("/auth/me"),

//   logout: () =>
//     api.post("/auth/logout"),

//   changePassword: (data) =>
//     api.post("/auth/change-password", data),
// };

import api from "./axios";

export const authApi = {
  login: (data) =>
    api.post("/auth/login", data),

  me: () =>
    api.get("/auth/me"),

  logout: () =>
    api.post("/auth/logout"),

  changePassword: (data) =>
    api.post(
      "/auth/change-password",
      data
    ),
};