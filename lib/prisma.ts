import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Ensure the pooler URL uses the correct port 6543 (sometimes cached env vars have 5432)
let dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.includes("pooler.supabase.com:5432")) {
  dbUrl = dbUrl.replace("pooler.supabase.com:5432", "pooler.supabase.com:6543");
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Add connection test
export async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}