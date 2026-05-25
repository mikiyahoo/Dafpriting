import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const worksSeed = [
  // ─────────────────────────────────────────
  // Category: outdoor    → Banners, Vehicle Wraps, Flags, Roll-up Banners
  // ─────────────────────────────────────────
  { file: "Banner.jpg",         category: "outdoor",    itemType: "Banners",         title: '"Coming Soon" Outdoor Restaurant Banner',                    clientName: "Le Basilic" },
  { file: "Banner_2.jpg",       category: "outdoor",    itemType: "Banners",         title: '"12.12 Campaign" Real Estate Billboard/Banner',              clientName: "Metropolitan Real Estate" },
  { file: "Car Branding.jpg",   category: "outdoor",    itemType: "Vehicle Wraps",   title: "Commercial Delivery Truck Vehicle Wrap / Branding",          clientName: "Tsehay Paints (Beherant Trading)" },
  { file: "Car Branding_2.jpg", category: "outdoor",    itemType: "Vehicle Wraps",   title: "Commercial Van Vehicle Wrap / Branding",                     clientName: "Geosynthetics Industrial Works PLC (GIW)" },
  { file: "Rollup Banner.jpg",  category: "outdoor",    itemType: "Roll-up Banners", title: "Pull-Up/Roll-Up Promotional Banner",                         clientName: "Horizon Addis Tyres Share Company" },
  { file: "Rollup Bannner_2.jpg", category: "outdoor",  itemType: "Roll-up Banners", title: "Pull-Up/Roll-Up Awareness & Informational Banner",           clientName: "National Blood Bank Service" },
  { file: "Flag.jpg",           category: "outdoor",    itemType: "Flags",           title: "Promotional Desktop Miniature Flags",                        clientName: "National Blood Bank Service" },

  // ─────────────────────────────────────────
  // Category: signage    → Acrylic/Mica Signs
  // ─────────────────────────────────────────
  { file: "Mica Sign.jpg",      category: "signage",    itemType: "Acrylic Signs",   title: "Acrylic/Mica Office Door Sign with Metallic Stand-offs",    clientName: "Horizon Addis Tyres Share Company" },
  { file: "Mica Sign_2.jpg",    category: "signage",    itemType: "Acrylic Signs",   title: "Acrylic/Mica Office Directional Sign",                      clientName: "National Blood Bank Service" },
  { file: "Mica Sign_3.jpg",    category: "signage",    itemType: "Acrylic Signs",   title: "Acrylic/Mica Room Identification Sign",                     clientName: "Horizon Addis Tyres Share Company" },

  // ─────────────────────────────────────────
  // Category: stationery  → Business Cards, Envelopes, ID Cards, Certificates
  // ─────────────────────────────────────────
  { file: "Business Card.jpg",      category: "stationery", itemType: "Business Cards", title: "Stack of Tour & Travel Business Cards",                     clientName: "Pilgrim Ethiopia Tour & Travel" },
  { file: "Business Card_PVC.jpg",  category: "stationery", itemType: "Business Cards", title: "Building & Electrical Materials Business Cards",             clientName: "Chapter Three Building & Electrical Materials Trade" },
  { file: "Envelope.jpg",           category: "stationery", itemType: "Envelopes",      title: "Branded Corporate Mailing Envelopes",                       clientName: "National Blood Bank Service" },
  { file: "ID Card.jpg",            category: "stationery", itemType: "ID Cards",       title: "Corporate Employee ID Card with Lanyard",                   clientName: "National Blood Bank Service" },
  { file: "ID Card 2.jpg",          category: "stationery", itemType: "ID Cards",       title: "Corporate Employee ID Card with Lanyard",                   clientName: "Horizon Addis Tyres Share Company" },
  { file: "Certificate.jpg",        category: "stationery", itemType: "Certificates",   title: "Printed Certificate Awards",                                clientName: "National Blood Bank Service" },

  // ─────────────────────────────────────────
  // Category: print       → Flyers, Menus, Invitations, Notebooks
  // ─────────────────────────────────────────
  { file: "Flyer.jpg",     category: "print",      itemType: "Flyers",      title: "Promotional Marketing Flyer (Healthcare/Insurance)",         clientName: "ICAS Ethiopia" },
  { file: "Menu.jpg",      category: "print",      itemType: "Menu Cards",  title: "Tri-Fold Printed Restaurant Menu",                          clientName: "Sky Steak House (at Grand Eliana Hotel)" },
  { file: "Menu_2.jpg",    category: "print",      itemType: "Menu Cards",  title: "Tri-Fold Printed Restaurant Menu (Beverage/Dessert Page)",  clientName: "Sky Steak House (at Grand Eliana Hotel)" },
  { file: "Weeding Card.jpg", category: "print",   itemType: "Invitations", title: "Custom Laser-Cut Floral Wedding Invitation Card",           clientName: "Personal / Private Event" },
  { file: "Agenda & Cap.jpg", category: "print",   itemType: "Notebooks",   title: "Promotional Mesh Caps & Covered Agendas/Notebooks",         clientName: "GW Trading PLC" },

  // ─────────────────────────────────────────
  // Category: packaging   → Corrugated Boxes, Product Packaging
  // ─────────────────────────────────────────
  { file: "Packaging.jpg",   category: "packaging", itemType: "Corrugated Boxes", title: "Printed Corrugated Box Packaging (Tire Tubes)",             clientName: "Horizon Addis Tyres Share Company" },
  { file: "Packaging_2.jpg", category: "packaging", itemType: "Corrugated Boxes", title: "Large Printed Corrugated Shipping Box",                    clientName: "Horizon Addis Tyres Share Company" },

  // ─────────────────────────────────────────
  // Category: promo       → Stickers, Mugs, Bottles, Pens, Caps, T-shirts, Safety Vests, Gift Sets
  // ─────────────────────────────────────────
  { file: "Sticker.jpg",              category: "promo",  itemType: "Stickers",        title: "Round Die-Cut Logo Vinyl Stickers",                           clientName: "Horizon Addis Tyres Share Company" },
  { file: "Sticker_2.jpg",            category: "promo",  itemType: "Stickers",        title: "Round Die-Cut Logo Vinyl Stickers",                           clientName: "National Blood Bank Service" },
  { file: "Sticker_3.jpg",            category: "promo",  itemType: "Stickers",        title: "Square Branded Promotional Stickers",                          clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Mug.jpg",                  category: "promo",  itemType: "Mugs & Drinkware", title: "Branded Promotional Ceramic Mug",                              clientName: "Horizon Addis Tyres Share Company" },
  { file: "Mug_2.jpg",                category: "promo",  itemType: "Mugs & Drinkware", title: "Branded Promotional Ceramic Mug",                              clientName: "National Blood Bank Service" },
  { file: "Water Bottle.jpg",         category: "promo",  itemType: "Mugs & Drinkware", title: "Custom Stainless Steel Sports Water Bottle",                    clientName: "National Blood Bank Service" },
  { file: "Mug & Water Bottle.jpg",   category: "promo",  itemType: "Gift Sets",       title: "Branded Gift Set (Ceramic Mug & Stainless Steel Water Bottle)", clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Pen.jpg",                  category: "promo",  itemType: "Pens",            title: "Stack of Promotional Plastic Click Pens",                       clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Cap.jpg",                  category: "promo",  itemType: "Caps & Hats",     title: "Embroidered Outdoor Sun Hats / Safari Hats",                    clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Cap_2.jpg",                category: "promo",  itemType: "Gift Sets",       title: "Promotional Set (Cap, Notebook, and Pen)",                     clientName: "GW Trading PLC" },
  { file: "T-shirt.jpg",              category: "promo",  itemType: "T-shirts",        title: "Branded Round-Neck Promotional T-shirt",                        clientName: "National Blood Bank Service" },
  { file: "T-shirt_2.jpg",            category: "promo",  itemType: "T-shirts",        title: "Embroidered Corporate Polo T-shirt",                            clientName: "Horizon Addis Tyres Share Company" },
  { file: "T-shirt & Cap, Mug.jpg",   category: "promo",  itemType: "Gift Sets",       title: "Branded Promotional Gift Set (Polo Shirt, Mesh Cap, and Mug)",  clientName: "Horizon Addis Tyres Share Company" },
  { file: "T-shirt & Bill Holder.jpg", category: "promo", itemType: "Gift Sets",       title: "Branded Staff Polo T-shirt & Leather Bill Presenter",           clientName: "Grand Eliana Hotel / Sky Steak House" },
  { file: "Safety Vests.jpg",          category: "promo", itemType: "Safety Vests",    title: "High-Visibility Reflective Safety Vests",                       clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },
  { file: "Safety Vests_2.jpg",        category: "promo", itemType: "Safety Vests",    title: "High-Visibility Reflective Safety Vests",                       clientName: "GW Trading PLC" },
  { file: "Safety Vests_3.jpg",        category: "promo", itemType: "Safety Vests",    title: "High-Visibility Reflective Safety Vests",                       clientName: "GW Trading PLC" },
  { file: "Safety Vests_4.jpg",        category: "promo", itemType: "Safety Vests",    title: "Stack of High-Visibility Reflective Safety Vests",              clientName: "Chapter Three Building & Electrical Materials Trade" },
  { file: "Safety Vests & Helmet.jpg", category: "promo", itemType: "Safety Vests",    title: "Branded High-Visibility Safety Vests & Hard Hat",               clientName: "Oromia LLRP-II (Lowlands Livelihood Resilience Project)" },

  // ─────────────────────────────────────────
  // Category: premium     → Leather, Awards, Engraved Products
  // ─────────────────────────────────────────
  { file: "Menu_3.jpg",   category: "premium",  itemType: "Leather Goods",       title: "Leather-Bound Premium Restaurant Menu Book",             clientName: "Grand Eliana Hotel" },
  { file: "Trophy.jpg",   category: "premium",  itemType: "Awards & Trophies",   title: "Custom Glass/Acrylic Award Trophy",                      clientName: "National Blood Bank Service" },
  { file: "Engrave.jpg",  category: "premium",  itemType: "Engraved Products",   title: "Laser-Engraved Wooden Decorative Panel / Wall Art",      clientName: "Grand Eliana Hotel" },
];

async function main() {
  console.log("🧹 Cleaning existing portfolio items...");
  await prisma.portfolioImage.deleteMany();
  await prisma.portfolioItem.deleteMany();
  console.log("   ✅ Existing items deleted\n");

  console.log("🎨 Seeding works with categories & itemTypes...\n");

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

    console.log(`   ${String(++count).padStart(2, " ")}. ${w.title.slice(0, 55).padEnd(58)} [${w.category} / ${w.itemType}]`);
  }

  console.log(`\n✅ ${count} works seeded successfully!`);
  console.log("\n📊 Category breakdown:");
  const cats = {};
  for (const w of worksSeed) { cats[w.category] = (cats[w.category] || 0) + 1; }
  for (const [cat, num] of Object.entries(cats)) {
    console.log(`   ${cat}: ${num} items`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    prisma.$disconnect();
    process.exit(1);
  });