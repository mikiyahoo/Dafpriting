import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isGalleryCategory } from "@/lib/gallery";
import { GalleryCategory } from "@/generated/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (category && category !== "ALL" && !isGalleryCategory(category)) {
      return NextResponse.json(
        { success: false, error: "Invalid gallery category" },
        { status: 400 }
      );
    }

    const selectedCategory: GalleryCategory | null =
      category && category !== "ALL" && isGalleryCategory(category)
        ? category
        : null;

    const images = await prisma.galleryImage.findMany({
      where: selectedCategory ? { category: selectedCategory } : {},
      orderBy: [
        { isFeatured: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("GALLERY_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}
