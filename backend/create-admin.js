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

async function main() {
//   const role = await prisma.role.findFirst({
//     where: {
//       name: "Administrador",
//     },
//   });

  const role = await prisma.role.upsert({
  where: {
    name: "Administrador",
  },
  update: {},
  create: {
    name: "Administrador",
    description: "Acesso total ao sistema",
  },
});

  if (!role) {
    throw new Error(
      "Role Administrador não encontrada."
    );
  }

  const passwordHash = await bcrypt.hash(
    "Admin@2026",
    12
  );

  const admin = await prisma.user.create({
    data: {
      name: "Administrador Sistema",
      email: "admin@erpcontrol.local",

      passwordHash,

      roleId: role.id,

      active: true,

      mustChangePassword: true,

      failedLoginAttempts: 0,

      passwordChangedAt: new Date(),
    },
  });

  await prisma.passwordHistory.create({
    data: {
      userId: admin.id,
      passwordHash,
    },
  });

  console.log("✅ Administrador criado");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });