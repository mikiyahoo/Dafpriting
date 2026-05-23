import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

// GET /api/testimonials - Public: fetch approved testimonials; can filter by featured
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");
    const featured = searchParams.get("featured");

    const where: Record<string, unknown> = {};
    if (approved === "true") where.isApproved = true;
    if (featured === "true") where.isFeatured = true;

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// POST /api/testimonials - Admin: create a testimonial
export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { customerName, company, review, rating, isApproved, isFeatured, avatarUrl, avatarType } = body;

    if (!customerName || !review) {
      return NextResponse.json({ error: "customerName and review are required" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        customerName,
        company: company || null,
        review,
        rating: rating || 5,
        isApproved: isApproved ?? false,
        isFeatured: isFeatured ?? false,
        avatarUrl: avatarUrl || null,
        avatarType: avatarType || "none",
      } as any,
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}