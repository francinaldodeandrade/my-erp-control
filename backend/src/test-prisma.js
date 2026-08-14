import { prisma } from "./config/prisma.js";

async function test() {
  const users = await prisma.user.findMany();

  console.log(users);

  await prisma.$disconnect();
}

test();