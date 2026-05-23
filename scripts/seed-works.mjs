import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const worksSeed = [
  // ─── Promotional Material ───
  { file: "Banner.jpg", category: "promo", itemType: "Posters", title: '"Coming Soon" Outdoor Restaurant Banner', clientName: "Le Basilic" },
  { file: "Banner_2.jpg", category: "promo", itemType: "Posters", title: '"12.12 Campaign" Real Estate Billboard/Banner', clientName: "Metropolitan Real Estate" },
  { file: "Flyer.jpg", category: "promo", itemType: "Flyers", title: "Promotional Marketing Flyer (Healthcare/Insurance)", clientName: "ICAS Ethiopia" },
  { file: "Menu.jpg", category: "promo", itemType: "Menu Cards", title: "Tri-Fold Printed Restaurant Menu", clientName: "Sky Steak House (at Grand Eliana Hotel)" },
  { file: "Menu_2.jpg", category: "promo", itemType: "Menu Cards", title: "Tri-Fold Printed Restaurant Menu (Beverage/Dessert Page)", clientName: "Sky Steak House (at Grand Eliana Hotel)" },
  { file: "Menu_3.jpg", category: "promo", itemType: "Menu Cards", title: "Leather-Bound Premium Restaurant Menu Book", clientName: "Grand Eliana Hotel" },
  { file: "Mug.jpg", category: "promo", itemType: "Paper Handbags", title: "Branded Promotional Ceramic Mug", clientName: "Horizon Addis Tyres Share Company" },
  { file: "Mug_2.jpg", category: "promo", itemType: "Paper Handbags", title: "Branded Promotional Ceramic Mug", clientName: "National Blood Bank Service" },
  { file: "Mug & Water Bottle.jpg", category: "promo", itemType: "Paper Handbags", title: "Branded Gift Set (Ceramic Mug & Stainless Steel Water Bottle)", clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Water Bottle.jpg", category: "promo", itemType: "Paper Handbags", title: "Custom Stainless Steel Sports Water Bottle", clientName: "National Blood Bank Service" },
  { file: "Pen.jpg", category: "promo", itemType: "Greeting Cards", title: "Stack of Promotional Plastic Click Pens", clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Sticker.jpg", category: "promo", itemType: "Catalogues", title: "Round Die-Cut Logo Vinyl Stickers", clientName: "Horizon Addis Tyres Share Company" },
  { file: "Sticker_2.jpg", category: "promo", itemType: "Catalogues", title: "Round Die-Cut Logo Vinyl Stickers", clientName: "National Blood Bank Service" },
  { file: "Sticker_3.jpg", category: "promo", itemType: "Catalogues", title: "Square Branded Promotional Stickers", clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Packaging.jpg", category: "promo", itemType: "Leaflets", title: "Printed Corrugated Box Packaging (Tire Tubes)", clientName: "Horizon Addis Tyres Share Company" },
  { file: "Packaging_2.jpg", category: "promo", itemType: "Leaflets", title: "Large Printed Corrugated Shipping Box", clientName: "Horizon Addis Tyres Share Company" },
  { file: "Trophy.jpg", category: "promo", itemType: "Magazines", title: "Custom Glass/Acrylic Award Trophy", clientName: "National Blood Bank Service" },

  // ─── Corporate Stationery ───
  { file: "Business Card.jpg", category: "corp", itemType: "Business Cards", title: "Stack of Tour & Travel Business Cards", clientName: "Pilgrim Ethiopia Tour & Travel" },
  { file: "Business Card_PVC.jpg", category: "corp", itemType: "Business Cards", title: "Building & Electrical Materials Business Cards", clientName: "Chapter Three Building & Electrical Materials Trade" },
  { file: "Envelope.jpg", category: "corp", itemType: "Envelopes", title: "Branded Corporate Mailing Envelopes", clientName: "National Blood Bank Service" },
  { file: "ID Card.jpg", category: "corp", itemType: "Personal Stationery", title: "Corporate Employee ID Card with Lanyard", clientName: "National Blood Bank Service" },
  { file: "ID Card 2.jpg", category: "corp", itemType: "Personal Stationery", title: "Corporate Employee ID Card with Lanyard", clientName: "Horizon Addis Tyres Share Company" },
  { file: "Certificate.jpg", category: "corp", itemType: "Letterhead", title: "Printed Certificate Awards", clientName: "National Blood Bank Service" },

  // ─── Books & Documents ───
  { file: "Agenda & Cap.jpg", category: "books", itemType: "Booklets", title: "Promotional Mesh Caps & Covered Agendas/Notebooks", clientName: "GW Trading PLC" },

  // ─── Signage & Displays ───
  { file: "Rollup Banner.jpg", category: "signs", itemType: "Roll Up Banners", title: "Pull-Up/Roll-Up Promotional Banner", clientName: "Horizon Addis Tyres Share Company" },
  { file: "Rollup Bannner_2.jpg", category: "signs", itemType: "Roll Up Banners", title: "Pull-Up/Roll-Up Awareness & Informational Banner", clientName: "National Blood Bank Service" },
  { file: "Flag.jpg", category: "signs", itemType: "Shelf Talkers", title: "Promotional Desktop Miniature Flags", clientName: "National Blood Bank Service" },
  { file: "Mica Sign.jpg", category: "signs", itemType: "Labels", title: "Acrylic/Mica Office Door Sign with Metallic Stand-offs", clientName: "Horizon Addis Tyres Share Company" },
  { file: "Mica Sign_2.jpg", category: "signs", itemType: "Labels", title: "Acrylic/Mica Office Directional Sign", clientName: "National Blood Bank Service" },
  { file: "Mica Sign_3.jpg", category: "signs", itemType: "Labels", title: "Acrylic/Mica Room Identification Sign", clientName: "Horizon Addis Tyres Share Company" },
  { file: "Car Branding.jpg", category: "signs", itemType: "Shelf Strips", title: "Commercial Delivery Truck Vehicle Wrap / Branding", clientName: "Tsehay Paints (Beherant Trading)" },
  { file: "Car Branding_2.jpg", category: "signs", itemType: "Shelf Strips", title: "Commercial Van Vehicle Wrap / Branding", clientName: "Geosynthetics Industrial Works PLC (GIW)" },

  // ─── Events & Seasonal ───
  { file: "T-shirt.jpg", category: "events", itemType: "Branded Clothing", title: "Branded Round-Neck Promotional T-shirt", clientName: "National Blood Bank Service" },
  { file: "T-shirt_2.jpg", category: "events", itemType: "Branded Clothing", title: "Embroidered Corporate Polo T-shirt", clientName: "Horizon Addis Tyres Share Company" },
  { file: "T-shirt & Cap, Mug.jpg", category: "events", itemType: "Branded Clothing", title: "Branded Promotional Gift Set (Polo Shirt, Mesh Cap, and Mug)", clientName: "Horizon Addis Tyres Share Company" },
  { file: "T-shirt & Bill Holder.jpg", category: "events", itemType: "Branded Clothing", title: "Branded Staff Polo T-shirt & Leather Bill Presenter", clientName: "Grand Eliana Hotel / Sky Steak House" },
  { file: "Cap.jpg", category: "events", itemType: "Branded Clothing", title: "Embroidered Outdoor Sun Hats / Safari Hats", clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Cap_2.jpg", category: "events", itemType: "Branded Clothing", title: "Promotional Set (Cap, Notebook, and Pen)", clientName: "GW Trading PLC" },
  { file: "Safety Vests.jpg", category: "events", itemType: "Branded Clothing", title: "High-Visibility Reflective Safety Vests", clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Safety Vests_2.jpg", category: "events", itemType: "Branded Clothing", title: "High-Visibility Reflective Safety Vests", clientName: "GW Trading PLC" },
  { file: "Safety Vests_3.jpg", category: "events", itemType: "Branded Clothing", title: "High-Visibility Reflective Safety Vests", clientName: "GW Trading PLC" },
  { file: "Safety Vests_4.jpg", category: "events", itemType: "Branded Clothing", title: "Stack of High-Visibility Reflective Safety Vests", clientName: "Chapter Three Building & Electrical Materials Trade" },
  { file: "Safety Vests & Helmet.jpg", category: "events", itemType: "Branded Clothing", title: "Branded High-Visibility Safety Vests & Hard Hat", clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Weeding Card.jpg", category: "events", itemType: "Invitations", title: "Custom Laser-Cut Floral Wedding Invitation Card", clientName: "Personal / Private Event" },

  // ─── Creative & Finishing ───
  { file: "Engrave.jpg", category: "creative", itemType: "Graphic Design", title: "Laser-Engraved Wooden Decorative Panel / Wall Art", clientName: "Grand Eliana Hotel" },
];

async function main() {
  console.log("🧹 Cleaning existing portfolio items...");
  await prisma.portfolioImage.deleteMany();
  await prisma.portfolioItem.deleteMany();
  console.log("   ✅ Existing items deleted\n");

  console.log("🎨 Seeding works with titles & client names...\n");

  let count = 0;
  for (const w of worksSeed) {
    const coverImage = `/assets/Works/${w.file}`;

    await prisma.portfolioItem.create({
      data: {
        title: w.title,
        coverImage,
        category: w.category,
        itemType: w.itemType,
        clientName: w.clientName || null,
        featured: false,
        isActive: true,
        sortOrder: count + 1,
      },
    });

    console.log(`   ${String(++count).padStart(2, " ")}. ${w.title.slice(0, 50).padEnd(52)} [${w.category}]`);
  }

  console.log(`\n✅ ${count} works seeded successfully!`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    prisma.$disconnect();
    process.exit(1);
  });