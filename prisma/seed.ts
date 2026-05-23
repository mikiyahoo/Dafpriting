import { PrismaClient, UserRole, QuoteStatus } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  console.log("🧹 Cleaning existing data...");
  await prisma.quoteFile.deleteMany();
  await prisma.quoteRequest.deleteMany();
  await prisma.portfolioImage.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();
  console.log("   ✅ Existing data cleaned\n");

  console.log("📦 Seeding services...");
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: "Flyer Printing",
        slug: "flyer-printing",
        description: "High-quality flyer printing for events, promotions, and business marketing.",
        image: "/assets/flyer-printing.jpg",
        isActive: true, sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        title: "Brochure & Catalog Printing",
        slug: "brochure-catalog-printing",
        description: "Professional brochure and catalog printing for businesses.",
        image: "/assets/brochure-printing.jpg",
        isActive: true, sortOrder: 2,
      },
    }),
    prisma.service.create({
      data: {
        title: "Business Card Printing",
        slug: "business-card-printing",
        description: "Premium business card printing on high-quality card stock.",
        image: "/assets/business-cards.jpg",
        isActive: true, sortOrder: 3,
      },
    }),
    prisma.service.create({
      data: {
        title: "Book & Magazine Printing",
        slug: "book-magazine-printing",
        description: "Complete book and magazine printing services.",
        image: "/assets/book-printing.jpg",
        isActive: true, sortOrder: 4,
      },
    }),
    prisma.service.create({
      data: {
        title: "Large Format Printing",
        slug: "large-format-printing",
        description: "Banners, posters, signage, and outdoor displays.",
        image: "/assets/large-format.jpg",
        isActive: true, sortOrder: 5,
      },
    }),
    prisma.service.create({
      data: {
        title: "Packaging & Label Printing",
        slug: "packaging-label-printing",
        description: "Custom packaging and label printing.",
        image: "/assets/packaging.jpg",
        isActive: true, sortOrder: 6,
      },
    }),
    prisma.service.create({
      data: {
        title: "Wedding Stationery",
        slug: "wedding-stationery",
        description: "Elegant wedding stationery including invitation cards.",
        image: "/assets/wedding-stationery.jpg",
        isActive: true, sortOrder: 7,
      },
    }),
    prisma.service.create({
      data: {
        title: "Promotional Merchandise",
        slug: "promotional-merchandise",
        description: "Custom branded merchandise.",
        image: "/assets/promotional.jpg",
        isActive: true, sortOrder: 8,
      },
    }),
  ]);
  console.log(`   ✅ ${services.length} services created`);

  console.log("📚 Seeding categories...");
  await Promise.all([
    prisma.category.create({ data: { name: "Business Cards", slug: "business-cards", description: "Premium business cards.", image: "/assets/categories/business-cards.jpg", isActive: true, sortOrder: 1 } }),
    prisma.category.create({ data: { name: "Banners & Posters", slug: "banners-posters", description: "Large-format banners and posters.", image: "/assets/categories/banners-posters.jpg", isActive: true, sortOrder: 2 } }),
    prisma.category.create({ data: { name: "Labels & Stickers", slug: "labels-stickers", description: "Custom stickers and product labels.", image: "/assets/categories/labels-stickers.jpg", isActive: true, sortOrder: 3 } }),
    prisma.category.create({ data: { name: "Apparel & Tees", slug: "apparel-tees", description: "Custom apparel printing.", image: "/assets/categories/apparel-tees.jpg", isActive: true, sortOrder: 4 } }),
    prisma.category.create({ data: { name: "Packaging", slug: "packaging", description: "Custom boxes and packaging solutions.", image: "/assets/categories/packaging.jpg", isActive: true, sortOrder: 5 } }),
    prisma.category.create({ data: { name: "Stationery", slug: "stationery", description: "Letterheads, envelopes, and stationery suites.", image: "/assets/categories/stationery.jpg", isActive: true, sortOrder: 6 } }),
    prisma.category.create({ data: { name: "Wedding & Events", slug: "wedding-events", description: "Invitations and wedding stationery.", image: "/assets/categories/wedding-events.jpg", isActive: true, sortOrder: 7 } }),
    prisma.category.create({ data: { name: "Promotional Merch", slug: "promotional-merch", description: "Branded merchandise.", image: "/assets/categories/promotional-merch.jpg", isActive: true, sortOrder: 8 } }),
    prisma.category.create({ data: { name: "Books & Catalogs", slug: "books-catalogs", description: "Perfect bound books and catalogs.", image: "/assets/categories/books-catalogs.jpg", isActive: true, sortOrder: 9 } }),
  ]);
  console.log(`   ✅ Categories created`);

  console.log("🖼️ Seeding banners...");
  await Promise.all([
    prisma.banner.create({ data: { title: "Spring banners", imageUrl: "/assets/banners/banner-1.jpg", linkUrl: "/services", isActive: true, sortOrder: 1 } }),
    prisma.banner.create({ data: { title: "Free design review", imageUrl: "/assets/banners/banner-2.jpg", linkUrl: "/request-quote", isActive: true, sortOrder: 2 } }),
    prisma.banner.create({ data: { title: "Same-day proofs", imageUrl: "/assets/banners/banner-3.jpg", linkUrl: "/services", isActive: true, sortOrder: 3 } }),
  ]);
  console.log(`   ✅ Banners created`);

  console.log("👤 Seeding users...");
  const adminPassword = await bcrypt.hash("Admin@2026", 10);
  const users = await Promise.all([
    prisma.user.create({ data: { name: "Daf Printing Admin", email: "admin@dafprinting.com", password: adminPassword, role: UserRole.SUPER_ADMIN, isActive: true } }),
    prisma.user.create({ data: { name: "Grace Mwangi", email: "grace@dafprinting.com", password: await bcrypt.hash("Staff@2026", 10), role: UserRole.ADMIN, isActive: true } }),
    prisma.user.create({ data: { name: "John Kamau", email: "john@dafprinting.com", password: await bcrypt.hash("Staff@2026", 10), role: UserRole.STAFF, isActive: true } }),
    prisma.user.create({ data: { name: "Sarah Wanjiku", email: "sarah@dafprinting.com", password: await bcrypt.hash("Staff@2026", 10), role: UserRole.STAFF, isActive: true } }),
  ]);
  console.log(`   ✅ ${users.length} users created`);
  const [admin, grace, john, sarah] = users;

  console.log("📋 Seeding quote requests...");
  const quotes = await Promise.all([
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0001",
        customerName: "Wanjiku Kariuki", customerEmail: "wanjiku.k@email.com", customerPhone: "+254 712 345 678", customerCompany: "Kariuki Enterprises",
        serviceId: services[0].id, quantity: 5000, size: "A5 (148mm x 210mm)", material: "150gsm Gloss Paper",
        notes: "Need flyers for a product launch event. Full color both sides.",
        status: QuoteStatus.QUOTED, assignedTo: grace.id, quotedPrice: 25000, validUntil: new Date("2026-06-15"),
        createdAt: new Date("2026-05-01T10:30:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0002",
        customerName: "James Ochieng", customerEmail: "james.o@email.com", customerPhone: "+254 723 456 789", customerCompany: "Ochieng Solutions Ltd",
        serviceId: services[1].id, quantity: 1000, size: "A4 (210mm x 297mm)", material: "200gsm Matte Paper with Fold",
        notes: "Corporate brochure for annual report. Tri-fold design.",
        status: QuoteStatus.REVIEWING, assignedTo: grace.id,
        createdAt: new Date("2026-05-03T14:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0003",
        customerName: "Mary Kamau", customerEmail: "mary.kamau@email.com", customerPhone: "+254 734 567 890",
        serviceId: services[6].id, quantity: 100, size: "Custom (5x7 inches)", material: "300gsm Premium Cardstock",
        notes: "Wedding invitation suites with laser-cut details and gold foil.",
        status: QuoteStatus.ACCEPTED, assignedTo: john.id, quotedPrice: 45000, validUntil: new Date("2026-07-01"),
        createdAt: new Date("2026-04-28T09:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0004",
        customerName: "TechConnect Africa", customerEmail: "events@techconnect.africa", customerPhone: "+254 745 678 901", customerCompany: "TechConnect Africa",
        serviceId: services[4].id, quantity: 50, size: "3m x 2m Banner", material: "Premium Vinyl Banner",
        notes: "Conference banners for TechConnect Summit 2026.",
        status: QuoteStatus.PENDING,
        createdAt: new Date("2026-05-05T11:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0005",
        customerName: "Achieng Family", customerEmail: "family.achieng@email.com", customerPhone: "+254 756 789 012",
        serviceId: services[0].id, quantity: 200, size: "A6 (105mm x 148mm)", material: "170gsm Satin Paper",
        notes: "Church anniversary invitation flyers.",
        status: QuoteStatus.DECLINED, assignedTo: john.id, quotedPrice: 8500, validUntil: new Date("2026-05-20"),
        createdAt: new Date("2026-04-20T08:30:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0006",
        customerName: "David Mwangi", customerEmail: "david.mwangi@email.com", customerPhone: "+254 767 890 123", customerCompany: "Mwangi Media Group",
        serviceId: services[2].id, quantity: 500, size: "Standard (85mm x 55mm)", material: "350gsm Premium Card with Spot UV",
        notes: "Business cards for media company. Need 5 variations.",
        status: QuoteStatus.QUOTED, assignedTo: grace.id, quotedPrice: 12000, validUntil: new Date("2026-06-30"),
        createdAt: new Date("2026-05-02T16:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0007",
        customerName: "Nairobi Design Collective", customerEmail: "info@nairobidesign.co.ke", customerPhone: "+254 778 901 234", customerCompany: "Nairobi Design Collective",
        serviceId: services[5].id, quantity: 10000, size: "Custom Box (30cm x 20cm x 10cm)", material: "Kraft Cardboard",
        notes: "Custom packaging boxes for artisanal products.",
        status: QuoteStatus.REVIEWING, assignedTo: sarah.id,
        createdAt: new Date("2026-05-04T13:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0008",
        customerName: "Elizabeth Nyambura", customerEmail: "eliz.nyambura@email.com", customerPhone: "+254 789 012 345",
        serviceId: services[3].id, quantity: 200, size: "A5 (148mm x 210mm)", material: "80gsm Book Paper, Softcover",
        notes: "Poetry book for self-publishing. 120 pages.",
        status: QuoteStatus.PENDING,
        createdAt: new Date("2026-05-06T09:15:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0009",
        customerName: "Peter & Grace Waweru", customerEmail: "waweru.wedding@email.com", customerPhone: "+254 790 123 456",
        serviceId: services[6].id, quantity: 150, size: "Custom (6x8 inches)", material: "300gsm Textured Cardstock",
        notes: "Complete wedding stationery set. Rustic theme.",
        status: QuoteStatus.QUOTED, assignedTo: john.id, quotedPrice: 65000, validUntil: new Date("2026-07-15"),
        createdAt: new Date("2026-05-01T11:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0010",
        customerName: "Nakuru County Government", customerEmail: "procurement@nakuru.go.ke", customerPhone: "+254 701 234 567", customerCompany: "Nakuru County Government",
        serviceId: services[4].id, quantity: 100, size: "1.2m x 0.8m Poster", material: "Weatherproof Vinyl",
        notes: "Government health awareness campaign posters.",
        status: QuoteStatus.QUOTED, assignedTo: sarah.id, quotedPrice: 180000, validUntil: new Date("2026-06-01"),
        createdAt: new Date("2026-04-25T10:00:00+03:00"),
      },
    }),
  ]);
  console.log(`   ✅ ${quotes.length} quote requests created`);

  console.log("🖼️ Seeding portfolio items...");
  const portfolioItems = await Promise.all([
    prisma.portfolioItem.create({
      data: {
        title: "TechConnect Summit Banners",
        description: "Large format banners and signage for a major tech conference.",
        coverImage: "/assets/portfolio/techconnect-banners.jpg", featured: true, sortOrder: 1, isActive: true,
        images: { create: [
          { imageUrl: "/assets/portfolio/techconnect-1.jpg", caption: "Main conference banner", sortOrder: 1 },
          { imageUrl: "/assets/portfolio/techconnect-2.jpg", caption: "Directional signage", sortOrder: 2 },
        ]},
      },
    }),
    prisma.portfolioItem.create({
      data: {
        title: "Elegant Wedding Suite",
        description: "Complete wedding stationery suite with gold foil detailing.",
        coverImage: "/assets/portfolio/wedding-suite.jpg", featured: true, sortOrder: 2, isActive: true,
        images: { create: [
          { imageUrl: "/assets/portfolio/wedding-1.jpg", caption: "Main invitation card", sortOrder: 1 },
          { imageUrl: "/assets/portfolio/wedding-2.jpg", caption: "Complete suite layout", sortOrder: 2 },
        ]},
      },
    }),
    prisma.portfolioItem.create({
      data: {
        title: "Corporate Brand Brochure",
        description: "Tri-fold corporate brochure with premium matte finish.",
        coverImage: "/assets/portfolio/corporate-brochure.jpg", featured: true, sortOrder: 3, isActive: true,
        images: { create: [
          { imageUrl: "/assets/portfolio/brochure-1.jpg", caption: "Front cover", sortOrder: 1 },
          { imageUrl: "/assets/portfolio/brochure-2.jpg", caption: "Inside spread", sortOrder: 2 },
        ]},
      },
    }),
    prisma.portfolioItem.create({
      data: {
        title: "Artisanal Product Packaging",
        description: "Eco-friendly custom packaging on recycled kraft paper.",
        coverImage: "/assets/portfolio/packaging.jpg", featured: false, sortOrder: 4, isActive: true,
        images: { create: [
          { imageUrl: "/assets/portfolio/packaging-1.jpg", caption: "Box assembly", sortOrder: 1 },
        ]},
      },
    }),
    prisma.portfolioItem.create({
      data: {
        title: "Poetry Book Collection",
        description: "Self-published poetry book with full-color artwork.",
        coverImage: "/assets/portfolio/poetry-book.jpg", featured: false, sortOrder: 5, isActive: true,
        images: { create: [
          { imageUrl: "/assets/portfolio/book-1.jpg", caption: "Front cover design", sortOrder: 1 },
        ]},
      },
    }),
  ]);
  console.log(`   ✅ ${portfolioItems.length} portfolio items created`);

  console.log("💬 Seeding testimonials...");
  const testimonials = await Promise.all([
    prisma.testimonial.create({ data: { customerName: "Wanjiku Kariuki", company: "Kariuki Enterprises", review: "Daf Printing delivered exceptional quality flyers.", rating: 5, isApproved: true, isFeatured: true, createdAt: new Date("2026-04-15T10:00:00+03:00") } }),
    prisma.testimonial.create({ data: { customerName: "James Ochieng", company: "Ochieng Solutions Ltd", review: "We've been using Daf Printing for all our corporate printing needs.", rating: 5, isApproved: true, isFeatured: true, createdAt: new Date("2026-03-20T14:00:00+03:00") } }),
    prisma.testimonial.create({ data: { customerName: "Mary Kamau", review: "The wedding invitations were absolutely stunning!", rating: 5, isApproved: true, isFeatured: true, createdAt: new Date("2026-02-14T09:00:00+03:00") } }),
    prisma.testimonial.create({ data: { customerName: "David Mwangi", company: "Mwangi Media Group", review: "Business cards with spot UV came out beautifully.", rating: 4, isApproved: true, isFeatured: false, createdAt: new Date("2026-04-01T11:00:00+03:00") } }),
    prisma.testimonial.create({ data: { customerName: "Elizabeth Nyambura", review: "Finally found a reliable printer for self-publishing.", rating: 5, isApproved: true, isFeatured: true, createdAt: new Date("2026-04-20T15:00:00+03:00") } }),
    prisma.testimonial.create({ data: { customerName: "Peter & Grace Waweru", review: "Our wedding stationery was perfect.", rating: 5, isApproved: true, isFeatured: false, createdAt: new Date("2026-05-01T10:00:00+03:00") } }),
  ]);
  console.log(`   ✅ ${testimonials.length} testimonials created`);

  console.log("\n═══════════════════════════════════════");
  console.log("✅  Database seeding completed successfully!");
  console.log("═══════════════════════════════════════\n");
  console.log(`     • Services:       ${services.length}`);
  console.log(`     • Users:          ${users.length}`);
  console.log(`     • Quote Requests: ${quotes.length}`);
  console.log(`     • Portfolio:      ${portfolioItems.length} items with images`);
  console.log(`     • Testimonials:   ${testimonials.length}`);
  console.log("\n👤  Admin:");
  console.log("     • Email:    admin@dafprinting.com");
  console.log("     • Password: Admin@2026");
  console.log("\n👤  Staff:");
  console.log("     • Email:    grace@dafprinting.com");
  console.log("     • Password: Staff@2026");
  console.log("───────────────────────────────────────\n");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });