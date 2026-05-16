import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/banners
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

// POST /api/banners - simple create (admin UI should call this with imageUrl)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, imageUrl, linkUrl, sortOrder, isActive } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        imageUrl,
        linkUrl,
        sortOrder: sortOrder || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, banner }, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}
