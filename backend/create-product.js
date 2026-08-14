import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const products = [
    {
      code: "BM001",
      description: "Máscara Capilar Bella Madian 500g",
      category: "Capilar",
      unit: "UN",
      salePrice: 35,
      productionCost: 18,
      minimumStock: 20,
      currentStock: 100,
      active: true,
    },
    {
      code: "BM002",
      description: "Shampoo Hidratante Bella Madian 300ml",
      category: "Capilar",
      unit: "UN",
      salePrice: 28,
      productionCost: 12,
      minimumStock: 20,
      currentStock: 120,
      active: true,
    },
    {
      code: "BM003",
      description: "Condicionador Nutritivo Bella Madian 300ml",
      category: "Capilar",
      unit: "UN",
      salePrice: 29,
      productionCost: 13,
      minimumStock: 20,
      currentStock: 120,
      active: true,
    },
    {
      code: "BM004",
      description: "Óleo Reparador Bella Madian 60ml",
      category: "Capilar",
      unit: "UN",
      salePrice: 45,
      productionCost: 20,
      minimumStock: 10,
      currentStock: 50,
      active: true,
    },
    {
      code: "BM005",
      description: "Kit Reconstrução Bella Madian",
      category: "Kit",
      unit: "UN",
      salePrice: 89,
      productionCost: 42,
      minimumStock: 10,
      currentStock: 40,
      active: true,
    },
  ];

  for (const product of products) {
    await prisma.finishedProduct.upsert({
      where: {
        code: product.code,
      },
      update: product,
      create: product,
    });
  }

  console.log("✅ Produtos cadastrados com sucesso");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });