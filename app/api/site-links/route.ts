import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/site-links - returns all available navigation links for dropdowns
export async function GET() {
  try {
    const [services, categories] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        select: { title: true, slug: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.category.findMany({
        where: { isActive: true },
        select: { name: true, slug: true },
        orderBy: { sortOrder: "asc" },
      }),
    ]);

    const links = [
      // Static pages
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Services", url: "/services" },
      { label: "Portfolio", url: "/portfolio" },
      { label: "Contact", url: "/contact" },
      { label: "Request a Quote", url: "/request-quote" },
      { label: "FAQ", url: "/faq" },
      { label: "Blog", url: "/blog" },
      { label: "Track Order", url: "/track" },
      // Services (dynamic)
      ...services.map((s) => ({
        label: `📄 ${s.title}`,
        url: `/services/${s.slug}`,
      })),
      // Categories (dynamic)
      ...categories.map((c) => ({
        label: `🏷️ ${c.name}`,
        url: `/categories/${c.slug}`,
      })),
    ];

    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching site links:", error);
    return NextResponse.json(
      { error: "Failed to fetch site links" },
      { status: 500 }
    );
  }
}