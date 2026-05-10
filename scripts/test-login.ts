import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";

async function main() {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({
      where: { email: "admin@radiance.com" },
    });
    if (!user) {
      console.log("User not found");
      return;
    }
    console.log("Found:", user.email, "Role:", user.role, "Active:", user.isActive);
    const match = await bcrypt.compare("Admin@2026", user.password);
    console.log("Password correct:", match);
    console.log("Hash:", user.password.substring(0, 15) + "...");
    console.log("isActive:", user.isActive);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();