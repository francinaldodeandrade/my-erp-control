import "dotenv/config";
import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const ROLES = [
  {
    name: "Administrador",
    description: "Acesso total ao sistema",
  },
  {
    name: "Diretor",
    description: "Gestão executiva",
  },
  {
    name: "Gerente",
    description: "Gestão operacional",
  },
  {
    name: "Financeiro",
    description: "Departamento financeiro",
  },
  {
    name: "Vendas",
    description: "Equipe comercial",
  },
  {
    name: "Estoque",
    description: "Controle de estoque",
  },
  {
    name: "Logistica",
    description: "Operações logísticas",
  },
  {
    name: "Manutencao",
    description: "Departamento manutenção",
  },
];

const PERMISSIONS = [
  ["CUSTOMERS", "VIEW"],
  ["CUSTOMERS", "CREATE"],
  ["CUSTOMERS", "UPDATE"],
  ["CUSTOMERS", "DELETE"],

  ["SUPPLIERS", "VIEW"],
  ["SUPPLIERS", "CREATE"],
  ["SUPPLIERS", "UPDATE"],
  ["SUPPLIERS", "DELETE"],

  ["PURCHASES", "VIEW"],
  ["PURCHASES", "CREATE"],
  ["PURCHASES", "APPROVE"],

  ["PRODUCTS", "VIEW"],
  ["PRODUCTS", "CREATE"],
  ["PRODUCTS", "UPDATE"],
  ["PRODUCTS", "DELETE"],

  ["STOCK", "VIEW"],
  ["STOCK", "MOVEMENT"],
  ["STOCK", "DISTRIBUTE"],

  ["SALES", "VIEW"],
  ["SALES", "CREATE"],
  ["SALES", "APPROVE"],
  ["SALES", "CANCEL"],

  ["FINANCIAL", "VIEW"],
  ["FINANCIAL", "CREATE"],
  ["FINANCIAL", "UPDATE"],

  ["LOGISTICS", "VIEW"],
  ["LOGISTICS", "CREATE"],
  ["LOGISTICS", "UPDATE"],

  ["MAINTENANCE", "VIEW"],
  ["MAINTENANCE", "CREATE"],
  ["MAINTENANCE", "UPDATE"],

  ["DOCUMENTS", "VIEW"],
  ["DOCUMENTS", "UPLOAD"],

  ["DASHBOARD", "VIEW"],
];

async function createRoles() {
  console.log("📌 Criando Roles...");

  for (const role of ROLES) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {
        description: role.description,
      },
      create: role,
    });
  }

  console.log("✅ Roles criadas");
}

async function createPermissions() {
  console.log("📌 Criando Permissões...");

  for (const [module, action] of PERMISSIONS) {
    await prisma.permission.upsert({
      where: {
        module_action: {
          module,
          action,
        },
      },
      update: {},
      create: {
        module,
        action,
      },
    });
  }

  console.log("✅ Permissões criadas");
}

async function bindAdminPermissions() {
  console.log(
    "📌 Vinculando permissões ao Administrador..."
  );

  const adminRole =
    await prisma.role.findUnique({
      where: {
        name: "Administrador",
      },
    });

  if (!adminRole) {
    throw new Error(
      "Role Administrador não encontrada."
    );
  }

  const permissions =
    await prisma.permission.findMany();

  for (const permission of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log(
    "✅ Permissões do Administrador criadas"
  );
}

async function createAdmin() {
  console.log("📌 Criando administrador...");

  const adminRole =
    await prisma.role.findUnique({
      where: {
        name: "Administrador",
      },
    });

  const passwordHash =
    await bcrypt.hash(
      "Admin@2026",
      12
    );

  const admin =
    await prisma.user.upsert({
      where: {
        email:
          "admin@erpcontrol.local",
      },
      update: {
        passwordHash,
        failedLoginAttempts: 0,
        lockedUntil: null,
        mustChangePassword: true,
        passwordChangedAt:
          new Date(),
      },
      create: {
        name:
          "Administrador Sistema",

        email:
          "admin@erpcontrol.local",

        passwordHash,

        roleId: adminRole.id,

        active: true,

        mustChangePassword: true,

        failedLoginAttempts: 0,

        passwordChangedAt:
          new Date(),
      },
    });

  const history =
    await prisma.passwordHistory.findFirst({
      where: {
        userId: admin.id,
      },
    });

  if (!history) {
    await prisma.passwordHistory.create({
      data: {
        userId: admin.id,
        passwordHash,
      },
    });
  }

  console.log(
    "✅ Administrador criado"
  );
}

async function createDefaultData() {
  console.log(
    "📌 Criando dados iniciais..."
  );

  await prisma.cashRegister.createMany({
    data: [
      {
        name: "CAIXA GERAL",
        description:
          "Caixa principal",
      },
    ],
  });

  await prisma.route.createMany({
    data: [
      {
        code: "POMBAL",
        description:
          "Rota Pombal",
      },
      {
        code: "PAULISTA",
        description:
          "Rota Paulista",
      },
      {
        code: "CATOLE",
        description:
          "Rota Catolé do Rocha",
      },
    ],
    skipDuplicates: true,
  });

  console.log(
    "✅ Dados iniciais criados"
  );
}

async function main() {
  console.log(
    "🚀 Iniciando Seed ERP Control"
  );

  await createRoles();

  await createPermissions();

  await bindAdminPermissions();

  await createAdmin();

  await createDefaultData();

  console.log(
    "🎉 Seed concluído com sucesso"
  );
}

main()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
