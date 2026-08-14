import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../../config/jwt.js";
import { AuthRepository } from "./auth.repository.js";

import { AppError } from "../../utils/AppError.js";
import { prisma } from "../../config/prisma.js";

const authRepository = new AuthRepository();

export class AuthService {
  async login(
    email,
    password,
    ipAddress = null,
    userAgent = null
  ) {
    const user =
      await authRepository.findUserByEmail(
        email
      );

    if (!user) {
      throw new AppError(
        "Usuário ou senha inválidos",
        401
      );
    }

    if (!user.active) {
      throw new AppError(
        "Usuário desativado",
        403
      );
    }

    if (
      user.lockedUntil &&
      user.lockedUntil > new Date()
    ) {
      throw new AppError(
        "Usuário temporariamente bloqueado",
        423
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordMatch) {
      const attempts =
        user.failedLoginAttempts + 1;

      if (attempts >= 5) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: new Date(
              Date.now() + 30 * 60 * 1000
            ),
          },
        });

        throw new AppError(
          "Usuário bloqueado por 30 minutos",
          423
        );
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          failedLoginAttempts: attempts,
        },
      });

      throw new AppError(
        "Usuário ou senha inválidos",
        401
      );
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name,
      },
      jwtConfig.secret,
      {
        expiresIn:
          jwtConfig.expiresIn,
      }
    );

    await authRepository.createSession({
      userId: user.id,
      token,
      ipAddress,
      userAgent,
      expiresAt: new Date(
        Date.now() +
          8 * 60 * 60 * 1000
      ),
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        mustChangePassword:
          user.mustChangePassword,
      },
      token,
    };
  }

  async me(userId) {
    const user =
      await authRepository.findUserById(
        userId
      );

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      active: user.active,
      mustChangePassword:
        user.mustChangePassword,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async changePassword(
    userId,
    currentPassword,
    newPassword
  ) {
    const user =
      await authRepository.findUserById(
        userId
      );

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    const currentPasswordValid =
      await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );

    if (!currentPasswordValid) {
      throw new AppError(
        "Senha atual inválida",
        401
      );
    }

    const lastPasswords =
      await authRepository.getLastPasswords(
        userId
      );

    for (const item of lastPasswords) {
      const reused =
        await bcrypt.compare(
          newPassword,
          item.passwordHash
        );

      if (reused) {
        throw new AppError(
          "Não é permitido reutilizar as últimas 5 senhas",
          400
        );
      }
    }

    const currentEqualsNew =
      await bcrypt.compare(
        newPassword,
        user.passwordHash
      );

    if (currentEqualsNew) {
      throw new AppError(
        "A nova senha deve ser diferente da atual",
        400
      );
    }

    await authRepository.savePasswordHistory(
      user.id,
      user.passwordHash
    );

    const newHash =
      await bcrypt.hash(
        newPassword,
        10
      );

    await authRepository.updatePassword(
      user.id,
      newHash
    );

    return {
      message:
        "Senha alterada com sucesso",
    };
  }

  async logout(token) {
    await authRepository.deleteSession(
      token
    );

    return {
      message:
        "Seção encerrada com sucesso",
    };
  }
}