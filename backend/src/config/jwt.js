export const jwtConfig = {
  secret:
    process.env.JWT_SECRET ||
    "ERP_CONTROL_2026_SECRET",
  expiresIn: "8h",
};