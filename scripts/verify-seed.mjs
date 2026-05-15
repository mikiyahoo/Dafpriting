import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("=== Daf Printing - Seed Verification ===\n");

  const user = await prisma.user.findUnique({ where: { email: "admin@dafprinting.com" } });
  console.log(`Admin user: ${user ? `✅ ${user.email} (${user.role})` : "❌ Not found"}`);

  const serviceCount = await prisma.service.count();
  console.log(`Services: ${serviceCount > 0 ? `✅ ${serviceCount} services` : "❌ Empty"}`);

  const portfolioCount = await prisma.portfolioItem.count();
  console.log(`Portfolio items: ${portfolioCount > 0 ? `✅ ${portfolioCount} items` : "❌ Empty"}`);

  const testimonialCount = await prisma.testimonial.count();
  console.log(`Testimonials: ${testimonialCount > 0 ? `✅ ${testimonialCount} testimonials` : "❌ Empty"}`);

  await prisma.$disconnect();
  console.log("\n=== Verification Complete ===");
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});