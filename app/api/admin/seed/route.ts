import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "seed") {
      // Check if admin already exists
      const existingAdmin = await prisma.user.findUnique({
        where: { email: "admin@dafprinting.com" },
      });

      if (existingAdmin) {
        return NextResponse.json({
          success: true,
          message: "Database already seeded. Admin user exists.",
          adminExists: true,
        });
      }

      // Create admin user
      const adminPassword = await bcrypt.hash("Admin@2026", 10);
      await prisma.user.create({
        data: {
          name: "Daf Printing Admin",
          email: "admin@dafprinting.com",
          password: adminPassword,
          role: "SUPER_ADMIN",
          isActive: true,
        },
      });

      // Create sample categories if none exist
      const categoryCount = await prisma.category.count();
      if (categoryCount === 0) {
        await prisma.category.createMany({
          data: [
            { name: "Business Cards", slug: "business-cards", description: "Premium business cards with multiple finishes.", sortOrder: 1, isActive: true },
            { name: "Banners & Posters", slug: "banners-posters", description: "Large-format banners and posters for indoor/outdoor use.", sortOrder: 2, isActive: true },
            { name: "Labels & Stickers", slug: "labels-stickers", description: "Custom stickers and product labels in any shape.", sortOrder: 3, isActive: true },
            { name: "Apparel & Tees", slug: "apparel-tees", description: "Custom apparel printing including DTG and screen printing.", sortOrder: 4, isActive: true },
            { name: "Packaging", slug: "packaging", description: "Custom boxes, sleeves, and packaging solutions.", sortOrder: 5, isActive: true },
            { name: "Stationery", slug: "stationery", description: "Letterheads, envelopes, and stationery suites.", sortOrder: 6, isActive: true },
            { name: "Wedding & Events", slug: "wedding-events", description: "Invitations, programs and wedding stationery.", sortOrder: 7, isActive: true },
            { name: "Promotional Merch", slug: "promotional-merch", description: "Branded merchandise: pens, mugs, notebooks and more.", sortOrder: 8, isActive: true },
          ],
        });
      }

      // Create sample banners if none exist
      const bannerCount = await prisma.banner.count();
      if (bannerCount === 0) {
        await prisma.banner.createMany({
          data: [
            { title: "High-impact print campaigns", imageUrl: "/assets/banners/banner-1.jpg", linkUrl: "/request-quote", sortOrder: 1, isActive: true },
            { title: "Fast turnaround for every order", imageUrl: "/assets/banners/banner-2.jpg", linkUrl: "/services", sortOrder: 2, isActive: true },
            { title: "Custom packaging & stationery", imageUrl: "/assets/banners/banner-3.jpg", linkUrl: "/categories/packaging", sortOrder: 3, isActive: true },
          ],
        });
      }

      // Create sample services if none exist
      const serviceCount = await prisma.service.count();
      if (serviceCount === 0) {
        await prisma.service.createMany({
          data: [
            { title: "Flyer Printing", slug: "flyer-printing", description: "High-quality flyer printing for events and promotions.", sortOrder: 1, isActive: true },
            { title: "Brochure & Catalog Printing", slug: "brochure-catalog-printing", description: "Professional brochure and catalog printing.", sortOrder: 2, isActive: true },
            { title: "Business Card Printing", slug: "business-card-printing", description: "Premium business card printing on high-quality card stock.", sortOrder: 3, isActive: true },
            { title: "Large Format Printing", slug: "large-format-printing", description: "Large format printing for banners, posters, and signage.", sortOrder: 4, isActive: true },
          ],
        });
      }

      return NextResponse.json({
        success: true,
        message: "Database seeded successfully! Admin credentials: admin@dafprinting.com / Admin@2026",
        adminExists: false,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Check database status
  try {
    const [userCount, categoryCount, bannerCount, serviceCount] = await Promise.all([
      prisma.user.count(),
      prisma.category.count(),
      prisma.banner.count(),
      prisma.service.count(),
    ]);

    const adminExists = await prisma.user.findUnique({
      where: { email: "admin@dafprinting.com" },
    });

    return NextResponse.json({
      status: "ok",
      database: {
        users: userCount,
        categories: categoryCount,
        banners: bannerCount,
        services: serviceCount,
        adminExists: !!adminExists,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check database status", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}