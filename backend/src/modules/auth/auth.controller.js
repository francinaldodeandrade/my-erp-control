import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const ipAddress =
        req.ip ||
        req.socket?.remoteAddress ||
        null;

      const userAgent =
        req.headers["user-agent"] ||
        null;

      const result =
        await authService.login(
          email,
          password,
          ipAddress,
          userAgent
        );

      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      const user = await authService.me(
        req.user.id
      );

      return res.status(200).json(user);

    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req,
    res,
    next
  ) {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      const result =
        await authService.changePassword(
          req.user.id,
          currentPassword,
          newPassword
        );

      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  }

  async logout(
    req,
    res,
    next
  ) {
    try {
      const token =
        req.headers.authorization
          ?.split(" ")[1];

      const result =
        await authService.logout(
          token
        );

      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  }
}