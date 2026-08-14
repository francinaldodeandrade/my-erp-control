import bcrypt from "bcryptjs";

import { AppError } from "../../utils/AppError.js";
import { UsersRepository } from "./users.repository.js";

import { AuditService } from "../../services/audit.service.js";

const auditService = new AuditService();

const usersRepository = new UsersRepository();

export class UsersService {
  async findAll() {
    return usersRepository.findAll();
  }

  async findById(id) {
    const user =
      await usersRepository.findById(id);

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    return user;
  }

  /*async create(data) {
    const exists =
      await usersRepository.findByEmail(
        data.email
      );

    if (exists) {
      throw new AppError(
        "E-mail já cadastrado",
        409
      );
    }

    const role =
      await usersRepository.findRoleByName(
        data.role
      );

    if (!role) {
      throw new AppError(
        "Perfil não encontrado",
        404
      );
    }

    const passwordHash =
      await bcrypt.hash(
        data.password,
        10
      );

    return usersRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
      roleId: role.id,
      active: true,
    });
  }*/

  async create(data) {
  const exists =
    await usersRepository.findByEmail(
      data.email
    );

  if (exists) {
    throw new AppError(
      "E-mail já cadastrado",
      409
    );
  }

  const role =
    await usersRepository.findRoleByName(
      data.role
    );

  if (!role) {
    throw new AppError(
      "Perfil não encontrado",
      404
    );
  }

  const passwordHash =
    await bcrypt.hash(
      data.password,
      10
    );

  const createdUser =
    await usersRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
      roleId: role.id,
      active: true,
    });

  await auditService.create({
    tableName: "users",
    recordId: createdUser.id,
    action: "CREATE_USER",
    newData: createdUser,
  });

  return createdUser;
}

  /*async update(id, data) {
    const user =
      //await usersRepository.findById(id);

      await auditService.create({
  tableName: "users",
  recordId: user.id,
  action: "UPDATE_USER",
  oldData: user,
  newData: updateData,
});

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    const updateData = {};

    if (data.name) {
      updateData.name = data.name;
    }

    if (data.email) {
      updateData.email = data.email;
    }

    if (data.role) {
      const role =
        await usersRepository.findRoleByName(
          data.role
        );

      if (!role) {
        throw new AppError(
          "Perfil não encontrado",
          404
        );
      }

      updateData.roleId = role.id;
    }

    if (data.password) {
      updateData.passwordHash =
        await bcrypt.hash(
          data.password,
          10
        );
    }

    return usersRepository.update(
      id,
      updateData
    );
  }*/

    async update(id, data) {
  const user =
    await usersRepository.findById(id);

  if (!user) {
    throw new AppError(
      "Usuário não encontrado",
      404
    );
  }

  const updateData = {};

  if (data.name) {
    updateData.name = data.name;
  }

  if (data.email) {
    updateData.email = data.email;
  }

  if (data.role) {
    const role =
      await usersRepository.findRoleByName(
        data.role
      );

    if (!role) {
      throw new AppError(
        "Perfil não encontrado",
        404
      );
    }

    updateData.roleId = role.id;
  }

  if (data.password) {
    updateData.passwordHash =
      await bcrypt.hash(
        data.password,
        10
      );
  }

  const updatedUser =
    await usersRepository.update(
      id,
      updateData
    );

  await auditService.create({
    tableName: "users",
    recordId: user.id,
    action: "UPDATE_USER",
    oldData: user,
    newData: updatedUser,
  });

  return updatedUser;
}

  /*async delete(id) {
    const user =
      //await usersRepository.findById(id);

      await auditService.create({
  tableName: "users",
  recordId: user.id,
  action: "DELETE_USER",
  oldData: user,
});

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    return usersRepository.delete(id);
  }*/

    async delete(id) {
  const user =
    await usersRepository.findById(id);

  if (!user) {
    throw new AppError(
      "Usuário não encontrado",
      404
    );
  }

  const deletedUser =
    await usersRepository.delete(id);

  await auditService.create({
    tableName: "users",
    recordId: user.id,
    action: "DELETE_USER",
    oldData: user,
    newData: deletedUser,
  });

  return deletedUser;
}

  async toggleActive(id, active) {
    const user =
      await usersRepository.findById(id);

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        404
      );
    }

    return usersRepository.toggleActive(
      id,
      active
    );
  }
}