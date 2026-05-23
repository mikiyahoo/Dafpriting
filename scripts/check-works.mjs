import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

const items = await prisma.portfolioItem.findMany({ take: 50, orderBy: { sortOrder: "asc" } });
console.log(`Total items: ${items.length}\n`);
for (const i of items) {
  console.log(`  ${i.title.padEnd(32)} cat="${i.category}"  type="${i.itemType}"  active=${i.isActive}`);
}
await prisma.$disconnect();