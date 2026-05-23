import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const categoriesData = [
  {
    name: "Magazines & Books",
    slug: "magazines-books",
    description: "Full-color magazine and book printing services including perfect binding, saddle stitching, hardcover, and softcover options for publishers, authors, and businesses.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "Advertisement Banners",
    slug: "advertisement-banners",
    description: "High-impact banner printing for outdoor and indoor advertising. Includes vinyl banners, mesh banners, retractable banners, and feather flags in various sizes.",
    image: "/assets/Works/Banner.jpg",
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "T-shirt/Cap (Apparel)",
    slug: "apparel",
    description: "Custom printed apparel including T-shirts, caps, polo shirts, and hoodies. Perfect for corporate branding, events, and promotional merchandise using screen printing or DTG.",
    image: "/assets/Works/T-shirt.jpg",
    isActive: true,
    sortOrder: 3,
  },
  {
    name: "Office Stationery",
    slug: "office-stationery",
    description: "Professional office stationery printing including letterheads, compliment slips, envelopes, notepads, diaries, and branded office supplies for your business.",
    image: "/assets/Works/Envelope.jpg",
    isActive: true,
    sortOrder: 4,
  },
  {
    name: "Light Box",
    slug: "light-box",
    description: "Illuminated light box signage for retail stores, restaurants, and businesses. Available in various sizes with LED lighting for eye-catching displays.",
    image: "/assets/Works/Mica Sign_3.jpg",
    isActive: true,
    sortOrder: 5,
  },
  {
    name: "Bill & Receipt",
    slug: "bill-receipt",
    description: "Custom printed bills, receipts, invoices, and voucher books for businesses. Includes NCR carbonless sets, thermal rolls, and customized receipt books.",
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&h=400&fit=crop",
    isActive: true,
    sortOrder: 6,
  },
  {
    name: "Flyers & Brochures",
    slug: "flyers-brochures",
    description: "Eye-catching flyer and brochure printing for marketing campaigns, events, and promotions. Choose from multiple sizes, folds, and paper finishes.",
    image: "/assets/Works/Flyer.jpg",
    isActive: true,
    sortOrder: 7,
  },
  {
    name: "Corporate Gifts",
    slug: "corporate-gifts",
    description: "Custom branded corporate gifts including custom mugs, pens, notebooks, USB drives, keychains, and promotional items perfect for client appreciation and events.",
    image: "/assets/Works/Pen.jpg",
    isActive: true,
    sortOrder: 8,
  },
  {
    name: "Exhibition & Display",
    slug: "exhibition-display",
    description: "Complete exhibition and display printing solutions including roll-up banners, pop-up displays, exhibition stands, and trade show graphics.",
    image: "/assets/Works/Rollup Banner.jpg",
    isActive: true,
    sortOrder: 9,
  },
];

async function main() {
  console.log("🧹 Cleaning existing categories...");
  await prisma.category.deleteMany();
  console.log("   ✅ Existing categories deleted\n");

  console.log("📚 Seeding updated categories with real images...\n");

  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    const imgSrc = cat.image.startsWith("/assets") ? "✅ LOCAL" : "🌐 UNSPLASH";
    console.log(`   ${created.name.padEnd(32)} ${imgSrc}`);
  }

  console.log(`\n✅ ${categoriesData.length} categories seeded successfully!`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    prisma.$disconnect();
    process.exit(1);
  });