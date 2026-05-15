import { PrismaClient, UserRole, QuoteStatus } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─────────────────────────────────────────
  // CLEAN EXISTING DATA (reverse order to respect FK constraints)
  // ─────────────────────────────────────────
  console.log("🧹 Cleaning existing data...");
  await prisma.orderStage.deleteMany();
  await prisma.orderTracking.deleteMany();
  await prisma.quoteFile.deleteMany();
  await prisma.quoteRequest.deleteMany();
  await prisma.portfolioImage.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();
  console.log("   ✅ Existing data cleaned\n");

  // ─────────────────────────────────────────
  // 1. SERVICES
  // ─────────────────────────────────────────
  console.log("📦 Seeding services...");
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: "Flyer Printing",
        slug: "flyer-printing",
        description:
          "High-quality flyer printing for events, promotions, and business marketing. Available in multiple sizes and paper finishes including gloss, matte, and recycled options.",
        image: "/assets/flyer-printing.jpg",
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        title: "Brochure & Catalog Printing",
        slug: "brochure-catalog-printing",
        description:
          "Professional brochure and catalog printing for businesses. Perfect for product showcases, company profiles, and marketing campaigns with options for folds, binding, and custom finishes.",
        image: "/assets/brochure-printing.jpg",
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.service.create({
      data: {
        title: "Business Card Printing",
        slug: "business-card-printing",
        description:
          "Premium business card printing on high-quality card stock. Choose from various finishes including matte, gloss, spot UV, foil stamping, and rounded corners to make a lasting impression.",
        image: "/assets/business-cards.jpg",
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.service.create({
      data: {
        title: "Book & Magazine Printing",
        slug: "book-magazine-printing",
        description:
          "Complete book and magazine printing services for authors, publishers, and businesses. Options include perfect binding, saddle stitching, hardcover, and softcover with full-color or black & white printing.",
        image: "/assets/book-printing.jpg",
        isActive: true,
        sortOrder: 4,
      },
    }),
    prisma.service.create({
      data: {
        title: "Large Format Printing",
        slug: "large-format-printing",
        description:
          "Large format printing for banners, posters, signage, and outdoor displays. We handle everything from small posters to massive billboards with weather-resistant materials.",
        image: "/assets/large-format.jpg",
        isActive: true,
        sortOrder: 5,
      },
    }),
    prisma.service.create({
      data: {
        title: "Packaging & Label Printing",
        slug: "packaging-label-printing",
        description:
          "Custom packaging and label printing for products and businesses. Includes box printing, product labels, stickers, and custom packaging solutions with branding options.",
        image: "/assets/packaging.jpg",
        isActive: true,
        sortOrder: 6,
      },
    }),
    prisma.service.create({
      data: {
        title: "Wedding Stationery",
        slug: "wedding-stationery",
        description:
          "Elegant wedding stationery including invitation cards, RSVP cards, order of service booklets, place cards, and thank you cards. Fully customizable designs to match your wedding theme.",
        image: "/assets/wedding-stationery.jpg",
        isActive: true,
        sortOrder: 7,
      },
    }),
    prisma.service.create({
      data: {
        title: "Promotional Merchandise",
        slug: "promotional-merchandise",
        description:
          "Custom branded merchandise including branded pens, notebooks, mugs, t-shirts, caps, and corporate gifts. Perfect for company branding events and marketing campaigns.",
        image: "/assets/promotional.jpg",
        isActive: true,
        sortOrder: 8,
      },
    }),
  ]);
  console.log(`   ✅ ${services.length} services created`);

  // ─────────────────────────────────────────
  // 2. USERS (Admin & Staff)
  // ─────────────────────────────────────────
  console.log("👤 Seeding users...");
  const adminPassword = await bcrypt.hash("Admin@2026", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Daf Printing Admin",
        email: "admin@dafprinting.com",
        password: adminPassword,
        role: UserRole.SUPER_ADMIN,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Grace Mwangi",
        email: "grace@dafprinting.com",
        password: await bcrypt.hash("Staff@2026", 10),
        role: UserRole.ADMIN,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "John Kamau",
        email: "john@dafprinting.com",
        password: await bcrypt.hash("Staff@2026", 10),
        role: UserRole.STAFF,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        name: "Sarah Wanjiku",
        email: "sarah@dafprinting.com",
        password: await bcrypt.hash("Staff@2026", 10),
        role: UserRole.STAFF,
        isActive: true,
      },
    }),
  ]);
  console.log(`   ✅ ${users.length} users created`);
  const [admin, grace, john, sarah] = users;

  // ─────────────────────────────────────────
  // 3. CUSTOMERS
  // ─────────────────────────────────────────
  console.log("👥 Seeding customers...");
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: "Wanjiku Kariuki",
        email: "wanjiku.k@email.com",
        phone: "+254 712 345 678",
        company: "Kariuki Enterprises",
      },
    }),
    prisma.customer.create({
      data: {
        name: "James Ochieng",
        email: "james.o@email.com",
        phone: "+254 723 456 789",
        company: "Ochieng Solutions Ltd",
      },
    }),
    prisma.customer.create({
      data: {
        name: "Mary Kamau",
        email: "mary.kamau@email.com",
        phone: "+254 734 567 890",
        company: null,
      },
    }),
    prisma.customer.create({
      data: {
        name: "TechConnect Africa",
        email: "events@techconnect.africa",
        phone: "+254 745 678 901",
        company: "TechConnect Africa",
      },
    }),
    prisma.customer.create({
      data: {
        name: "Achieng Family",
        email: "family.achieng@email.com",
        phone: "+254 756 789 012",
        company: null,
      },
    }),
    prisma.customer.create({
      data: {
        name: "David Mwangi",
        email: "david.mwangi@email.com",
        phone: "+254 767 890 123",
        company: "Mwangi Media Group",
      },
    }),
    prisma.customer.create({
      data: {
        name: "Nairobi Design Collective",
        email: "info@nairobidesign.co.ke",
        phone: "+254 778 901 234",
        company: "Nairobi Design Collective",
      },
    }),
    prisma.customer.create({
      data: {
        name: "Elizabeth Nyambura",
        email: "eliz.nyambura@email.com",
        phone: "+254 789 012 345",
        company: null,
      },
    }),
    prisma.customer.create({
      data: {
        name: "Peter & Grace Waweru",
        email: "waweru.wedding@email.com",
        phone: "+254 790 123 456",
        company: null,
      },
    }),
    prisma.customer.create({
      data: {
        name: "Nakuru County Government",
        email: "procurement@nakuru.go.ke",
        phone: "+254 701 234 567",
        company: "Nakuru County Government",
      },
    }),
  ]);
  console.log(`   ✅ ${customers.length} customers created`);
  const [wanjiku, james, mary, techconnect, achieng, david, ndc, elizabeth, waweru, nakuru] = customers;

  // ─────────────────────────────────────────
  // 4. QUOTE REQUESTS
  // ─────────────────────────────────────────
  console.log("📋 Seeding quote requests...");
  const quotes = await Promise.all([
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0001",
        customerId: wanjiku.id,
        serviceId: services[0].id, // Flyer Printing
        quantity: 5000,
        size: "A5 (148mm x 210mm)",
        material: "150gsm Gloss Paper",
        notes: "Need flyers for a product launch event. Full color both sides. Want to see a proof before bulk printing.",
        status: QuoteStatus.QUOTED,
        assignedTo: grace.id,
        quotedPrice: 25000,
        validUntil: new Date("2026-06-15"),
        createdAt: new Date("2026-05-01T10:30:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0002",
        customerId: james.id,
        serviceId: services[1].id, // Brochure & Catalog
        quantity: 1000,
        size: "A4 (210mm x 297mm)",
        material: "200gsm Matte Paper with Fold",
        notes: "Corporate brochure for annual report. Tri-fold design with company branding. Need 10 copies of a sample first.",
        status: QuoteStatus.REVIEWING,
        assignedTo: grace.id,
        createdAt: new Date("2026-05-03T14:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0003",
        customerId: mary.id,
        serviceId: services[6].id, // Wedding Stationery
        quantity: 100,
        size: "Custom (5x7 inches)",
        material: "300gsm Premium Cardstock",
        notes: "Wedding invitation suites needed. Design includes laser-cut details and gold foil. 50 invitation sets + 50 RSVP cards.",
        status: QuoteStatus.ACCEPTED,
        assignedTo: john.id,
        quotedPrice: 45000,
        validUntil: new Date("2026-07-01"),
        createdAt: new Date("2026-04-28T09:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0004",
        customerId: techconnect.id,
        serviceId: services[4].id, // Large Format Printing
        quantity: 50,
        size: "3m x 2m Banner",
        material: "Premium Vinyl Banner",
        notes: "Conference banners for TechConnect Summit 2026. 10 different designs, 5 copies each. Need UV-resistant outdoor material.",
        status: QuoteStatus.PENDING,
        createdAt: new Date("2026-05-05T11:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0005",
        customerId: achieng.id,
        serviceId: services[0].id, // Flyer Printing
        quantity: 200,
        size: "A6 (105mm x 148mm)",
        material: "170gsm Satin Paper",
        notes: "Church anniversary invitation flyers. Simple design with photo of the church. Need them in 2 weeks.",
        status: QuoteStatus.DECLINED,
        assignedTo: john.id,
        quotedPrice: 8500,
        validUntil: new Date("2026-05-20"),
        createdAt: new Date("2026-04-20T08:30:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0006",
        customerId: david.id,
        serviceId: services[2].id, // Business Card Printing
        quantity: 500,
        size: "Standard (85mm x 55mm)",
        material: "350gsm Premium Card with Spot UV",
        notes: "Business cards for media company. Modern design with logo spot UV coating. Need 5 variations for different departments.",
        status: QuoteStatus.QUOTED,
        assignedTo: grace.id,
        quotedPrice: 12000,
        validUntil: new Date("2026-06-30"),
        createdAt: new Date("2026-05-02T16:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0007",
        customerId: ndc.id,
        serviceId: services[5].id, // Packaging & Label Printing
        quantity: 10000,
        size: "Custom Box (30cm x 20cm x 10cm)",
        material: "Kraft Cardboard with Full Color Print",
        notes: "Custom packaging boxes for artisanal products. Branding on all sides. Need eco-friendly materials.",
        status: QuoteStatus.REVIEWING,
        assignedTo: sarah.id,
        createdAt: new Date("2026-05-04T13:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0008",
        customerId: elizabeth.id,
        serviceId: services[3].id, // Book & Magazine Printing
        quantity: 200,
        size: "A5 (148mm x 210mm)",
        material: "80gsm Book Paper, Softcover",
        notes: "Poetry book for self-publishing. 120 pages, full color interior with artwork. Perfect bound softcover.",
        status: QuoteStatus.PENDING,
        createdAt: new Date("2026-05-06T09:15:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0009",
        customerId: waweru.id,
        serviceId: services[6].id, // Wedding Stationery
        quantity: 150,
        size: "Custom (6x8 inches)",
        material: "300gsm Textured Cardstock",
        notes: "Complete wedding stationery set. Invitations, programs, place cards, menus, and thank you cards. Rustic theme with navy and gold accents.",
        status: QuoteStatus.QUOTED,
        assignedTo: john.id,
        quotedPrice: 65000,
        validUntil: new Date("2026-07-15"),
        createdAt: new Date("2026-05-01T11:00:00+03:00"),
      },
    }),
    prisma.quoteRequest.create({
      data: {
        quoteNumber: "Q-2026-0010",
        customerId: nakuru.id,
        serviceId: services[4].id, // Large Format Printing
        quantity: 100,
        size: "1.2m x 0.8m Poster",
        material: "Weatherproof Vinyl",
        notes: "Government health awareness campaign posters. Need weather-resistant outdoor posters for display around the county. Design will be provided.",
        status: QuoteStatus.QUOTED,
        assignedTo: sarah.id,
        quotedPrice: 180000,
        validUntil: new Date("2026-06-01"),
        createdAt: new Date("2026-04-25T10:00:00+03:00"),
      },
    }),
  ]);
  console.log(`   ✅ ${quotes.length} quote requests created`);
  const [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10] = quotes;

  // ─────────────────────────────────────────
  // 5. PORTFOLIO ITEMS & IMAGES
  // ─────────────────────────────────────────
  console.log("🖼️ Seeding portfolio items...");
  const portfolioItems = await Promise.all([
    prisma.portfolioItem.create({
      data: {
        title: "TechConnect Summit Banners",
        description:
          "Large format banners and signage for a major tech conference. The project included outdoor banners, indoor directional signage, and stage backdrops.",
        coverImage: "/assets/portfolio/techconnect-banners.jpg",
        featured: true,
        sortOrder: 1,
        isActive: true,
        images: {
          create: [
            { imageUrl: "/assets/portfolio/techconnect-1.jpg", caption: "Main conference banner (3m x 2m)", sortOrder: 1 },
            { imageUrl: "/assets/portfolio/techconnect-2.jpg", caption: "Directional signage", sortOrder: 2 },
            { imageUrl: "/assets/portfolio/techconnect-3.jpg", caption: "Stage backdrop", sortOrder: 3 },
          ],
        },
      },
    }),
    prisma.portfolioItem.create({
      data: {
        title: "Elegant Wedding Suite",
        description:
          "Complete wedding stationery suite including invitations, RSVP cards, order of service booklets, place cards, and thank you cards with gold foil detailing.",
        coverImage: "/assets/portfolio/wedding-suite.jpg",
        featured: true,
        sortOrder: 2,
        isActive: true,
        images: {
          create: [
            { imageUrl: "/assets/portfolio/wedding-1.jpg", caption: "Main invitation card with gold foil", sortOrder: 1 },
            { imageUrl: "/assets/portfolio/wedding-2.jpg", caption: "Complete suite layout", sortOrder: 2 },
            { imageUrl: "/assets/portfolio/wedding-3.jpg", caption: "RSVP and information cards", sortOrder: 3 },
            { imageUrl: "/assets/portfolio/wedding-4.jpg", caption: "Laser-cut detail close-up", sortOrder: 4 },
          ],
        },
      },
    }),
    prisma.portfolioItem.create({
      data: {
        title: "Corporate Brand Brochure",
        description:
          "Tri-fold corporate brochure for a leading financial services company. Designed with premium matte finish and spot UV accents on the cover.",
        coverImage: "/assets/portfolio/corporate-brochure.jpg",
        featured: true,
        sortOrder: 3,
        isActive: true,
        images: {
          create: [
            { imageUrl: "/assets/portfolio/brochure-1.jpg", caption: "Front cover", sortOrder: 1 },
            { imageUrl: "/assets/portfolio/brochure-2.jpg", caption: "Inside spread", sortOrder: 2 },
            { imageUrl: "/assets/portfolio/brochure-3.jpg", caption: "Full brochure layout", sortOrder: 3 },
          ],
        },
      },
    }),
    prisma.portfolioItem.create({
      data: {
        title: "Artisanal Product Packaging",
        description:
          "Eco-friendly custom packaging for a local artisanal food brand. Printed on recycled kraft paper with soy-based inks.",
        coverImage: "/assets/portfolio/packaging.jpg",
        featured: false,
        sortOrder: 4,
        isActive: true,
        images: {
          create: [
            { imageUrl: "/assets/portfolio/packaging-1.jpg", caption: "Box assembly", sortOrder: 1 },
            { imageUrl: "/assets/portfolio/packaging-2.jpg", caption: "Label close-up", sortOrder: 2 },
            { imageUrl: "/assets/portfolio/packaging-3.jpg", caption: "Final product display", sortOrder: 3 },
          ],
        },
      },
    }),
    prisma.portfolioItem.create({
      data: {
        title: "Poetry Book Collection",
        description:
          "Self-published poetry book with full-color interior artwork. Perfect bound softcover with matte lamination.",
        coverImage: "/assets/portfolio/poetry-book.jpg",
        featured: false,
        sortOrder: 5,
        isActive: true,
        images: {
          create: [
            { imageUrl: "/assets/portfolio/book-1.jpg", caption: "Front cover design", sortOrder: 1 },
            { imageUrl: "/assets/portfolio/book-2.jpg", caption: "Interior page spread", sortOrder: 2 },
            { imageUrl: "/assets/portfolio/book-3.jpg", caption: "Spine and back cover", sortOrder: 3 },
          ],
        },
      },
    }),
  ]);
  console.log(`   ✅ ${portfolioItems.length} portfolio items created`);

  // ─────────────────────────────────────────
  // 6. TESTIMONIALS
  // ─────────────────────────────────────────
  console.log("💬 Seeding testimonials...");
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        customerName: "Wanjiku Kariuki",
        company: "Kariuki Enterprises",
        review:
          "Daf Printing delivered exceptional quality flyers for our product launch. The colors were vibrant and the turnaround time was impressive. Highly recommend their services!",
        rating: 5,
        isApproved: true,
        isFeatured: true,
        createdAt: new Date("2026-04-15T10:00:00+03:00"),
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: "James Ochieng",
        company: "Ochieng Solutions Ltd",
        review:
          "We've been using Daf Printing for all our corporate printing needs. Their brochure printing quality is top-notch and the team is always helpful with design advice.",
        rating: 5,
        isApproved: true,
        isFeatured: true,
        createdAt: new Date("2026-03-20T14:00:00+03:00"),
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: "Mary Kamau",
        review:
          "The wedding invitations were absolutely stunning! The gold foil detailing and laser-cut design exceeded our expectations. Thank you Daf Printing for making our day even more special.",
        rating: 5,
        isApproved: true,
        isFeatured: true,
        createdAt: new Date("2026-02-14T09:00:00+03:00"),
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: "David Mwangi",
        company: "Mwangi Media Group",
        review:
          "Business cards with spot UV finish came out beautifully. The precision and quality of the print is outstanding. Our team loves them!",
        rating: 4,
        isApproved: true,
        isFeatured: false,
        createdAt: new Date("2026-04-01T11:00:00+03:00"),
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: "Elizabeth Nyambura",
        review:
          "Finally found a reliable printer for self-publishing. My poetry book looks amazing and the print quality brings the artwork to life. Will definitely be coming back for more copies.",
        rating: 5,
        isApproved: true,
        isFeatured: true,
        createdAt: new Date("2026-04-20T15:00:00+03:00"),
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: "Peter & Grace Waweru",
        review:
          "From the first consultation to the final delivery, Daf Printing provided exceptional service. Our wedding stationery was perfect and our guests complimented the quality. Thank you!",
        rating: 5,
        isApproved: true,
        isFeatured: false,
        createdAt: new Date("2026-05-01T10:00:00+03:00"),
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: "Nairobi Design Collective",
        review:
          "The custom packaging boxes exceeded our expectations. The eco-friendly materials and attention to detail perfectly aligned with our brand values.",
        rating: 5,
        isApproved: false,
        isFeatured: false,
        createdAt: new Date("2026-05-05T12:00:00+03:00"),
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: "Nakuru County Government",
        company: "Nakuru County Government",
        review:
          "Large format posters for our health campaign were delivered on time and the quality was excellent. The weatherproof material held up perfectly outdoors.",
        rating: 4,
        isApproved: false,
        isFeatured: false,
        createdAt: new Date("2026-04-28T08:00:00+03:00"),
      },
    }),
  ]);
  console.log(`   ✅ ${testimonials.length} testimonials created`);

  // ─────────────────────────────────────────
  // 7. ORDER TRACKING & STAGES
  // ─────────────────────────────────────────
  console.log("📦 Seeding order tracking...");
  // For accepted/approved quotes, create tracking
  const tracking1 = await prisma.orderTracking.create({
    data: {
      quoteRequestId: q3.id, // Wedding stationery - ACCEPTED
      currentStage: "PRODUCTION",
      notes: "Production in progress. Gold foil stamping completed. Now moving to cutting and assembly.",
      stages: {
        create: [
          { stage: "ORDER_RECEIVED", label: "Order Received", completed: true, completedAt: new Date("2026-05-01T09:00:00+03:00"), sortOrder: 1 },
          { stage: "DESIGN_APPROVED", label: "Design Approved", completed: true, completedAt: new Date("2026-05-03T11:00:00+03:00"), sortOrder: 2 },
          { stage: "PRODUCTION", label: "Production", completed: true, completedAt: new Date("2026-05-08T14:00:00+03:00"), sortOrder: 3 },
          { stage: "QUALITY_CHECK", label: "Quality Check", completed: false, sortOrder: 4 },
          { stage: "SHIPPED", label: "Shipped", completed: false, sortOrder: 5 },
          { stage: "DELIVERED", label: "Delivered", completed: false, sortOrder: 6 },
        ],
      },
    },
  });

  // For quoted and accepted quote (q1 - QUOTED)
  const tracking2 = await prisma.orderTracking.create({
    data: {
      quoteRequestId: q1.id, // Flyer Printing - QUOTED
      currentStage: "ORDER_RECEIVED",
      notes: "Client reviewing quote. Awaiting approval to proceed with production.",
      stages: {
        create: [
          { stage: "ORDER_RECEIVED", label: "Order Received", completed: true, completedAt: new Date("2026-05-01T10:30:00+03:00"), sortOrder: 1 },
          { stage: "DESIGN_APPROVED", label: "Design Approved", completed: false, sortOrder: 2 },
          { stage: "PRODUCTION", label: "Production", completed: false, sortOrder: 3 },
          { stage: "QUALITY_CHECK", label: "Quality Check", completed: false, sortOrder: 4 },
          { stage: "SHIPPED", label: "Shipped", completed: false, sortOrder: 5 },
          { stage: "DELIVERED", label: "Delivered", completed: false, sortOrder: 6 },
        ],
      },
    },
  });

  // For government posters - QUOTED
  const tracking3 = await prisma.orderTracking.create({
    data: {
      quoteRequestId: q10.id, // Government posters - QUOTED
      currentStage: "DESIGN_APPROVED",
      notes: "Design approved by client. Preparing for large format production run.",
      stages: {
        create: [
          { stage: "ORDER_RECEIVED", label: "Order Received", completed: true, completedAt: new Date("2026-04-25T10:00:00+03:00"), sortOrder: 1 },
          { stage: "DESIGN_APPROVED", label: "Design Approved", completed: true, completedAt: new Date("2026-04-28T15:00:00+03:00"), sortOrder: 2 },
          { stage: "PRODUCTION", label: "Production", completed: false, sortOrder: 3 },
          { stage: "QUALITY_CHECK", label: "Quality Check", completed: false, sortOrder: 4 },
          { stage: "SHIPPED", label: "Shipped", completed: false, sortOrder: 5 },
          { stage: "DELIVERED", label: "Delivered", completed: false, sortOrder: 6 },
        ],
      },
    },
  });

  // For wedding suite - QUOTED (q9)
  const tracking4 = await prisma.orderTracking.create({
    data: {
      quoteRequestId: q9.id, // Wedding stationery - QUOTED (Waweru)
      currentStage: "ORDER_RECEIVED",
      notes: "New order received. Design consultation scheduled for next week.",
      stages: {
        create: [
          { stage: "ORDER_RECEIVED", label: "Order Received", completed: true, completedAt: new Date("2026-05-01T11:00:00+03:00"), sortOrder: 1 },
          { stage: "DESIGN_APPROVED", label: "Design Approved", completed: false, sortOrder: 2 },
          { stage: "PRODUCTION", label: "Production", completed: false, sortOrder: 3 },
          { stage: "QUALITY_CHECK", label: "Quality Check", completed: false, sortOrder: 4 },
          { stage: "SHIPPED", label: "Shipped", completed: false, sortOrder: 5 },
          { stage: "DELIVERED", label: "Delivered", completed: false, sortOrder: 6 },
        ],
      },
    },
  });

  console.log(`   ✅ 4 order tracking records created`);
  console.log(`   ✅ 20+ order stages created`);

  // ─────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────
  console.log("\n═══════════════════════════════════════");
  console.log("✅  Database seeding completed successfully!");
  console.log("═══════════════════════════════════════\n");
  console.log("📊  Seed Summary:");
  console.log(`     • Services:       ${services.length}`);
  console.log(`     • Users:          ${users.length}`);
  console.log(`     • Customers:      ${customers.length}`);
  console.log(`     • Quote Requests: ${quotes.length}`);
  console.log(`     • Portfolio:      ${portfolioItems.length} items with images`);
  console.log(`     • Testimonials:   ${testimonials.length}`);
  console.log(`     • Order Tracking: 4 records with stages`);
  console.log("\n👤  Admin Credentials:");
  console.log("     • Email:    admin@dafprinting.com");
  console.log("     • Password: Admin@2026");
  console.log("\n👤  Staff Credentials:");
  console.log("     • Email:    grace@dafprinting.com");
  console.log("     • Password: Staff@2026");
  console.log("───────────────────────────────────────\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });