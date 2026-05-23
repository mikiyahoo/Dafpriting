import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding testimonials directly...\n");

  // Add columns if they don't exist
  try {
    await prisma.$executeRawUnsafe('ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "avatarUrl" TEXT');
    await prisma.$executeRawUnsafe('ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "avatarType" TEXT DEFAULT \'none\'');
    console.log("✅ Columns verified/added\n");
  } catch (e) {
    console.log("Column check:", e.message);
  }

  // Delete existing testimonials
  await prisma.testimonial.deleteMany();
  console.log("🧹 Existing testimonials cleared\n");

  // Seed 6 testimonials with all 3 avatar tiers
  const data = [
    { customerName: "Sarah Jenkins", company: "Vertex Agency", review: "Daf Printing delivered exceptional quality flyers and banners for our brand launch. Absolute lifesavers with their quick turnaround!", rating: 5, isApproved: true, isFeatured: true, avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", avatarType: "upload" },
    { customerName: "Ethan Chan", company: "ShopEase", review: "Great quality products and helpful customer support. Highly recommended for any e-commerce businesses needing fast prints.", rating: 5, isApproved: true, isFeatured: true, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", avatarType: "upload" },
    { customerName: "Michael K.", company: "PixelLabs", review: "The spot UV business cards we ordered turned out incredibly sleek. Outstanding quality and professional feedback.", rating: 5, isApproved: true, isFeatured: true, avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Michael", avatarType: "clipart" },
    { customerName: "Jane Doe", company: "Creative Studio", review: "Their laser-cut wedding invitation suite was absolutely stunning! Our guests loved the texture and premium feel.", rating: 5, isApproved: true, isFeatured: true, avatarUrl: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jane", avatarType: "clipart" },
    { customerName: "David Mwangi", company: "Mwangi Media Group", review: "Very reliable printer for commercial requirements. Business cards and banners were exactly as specified.", rating: 4, isApproved: true, isFeatured: false, avatarUrl: null, avatarType: "none" },
    { customerName: "Elizabeth Nyambura", company: "Self-Publisher", review: "Excellent customer service and highly professional binding. Finally found a reliable printer for self-publishing our novel runs.", rating: 5, isApproved: true, isFeatured: true, avatarUrl: null, avatarType: "none" },
  ];

  const testimonials = await Promise.all(
    data.map((t) => prisma.testimonial.create({ data: t }))
  );

  console.log(`✅ ${testimonials.length} testimonials seeded successfully!`);
  console.log("   - 2 with Unsplash photos (upload)");
  console.log("   - 2 with DiceBear clipart mascots");
  console.log("   - 2 with initials fallback\n");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("❌ Seeding failed:", e);
  prisma.$disconnect();
  process.exit(1);
});