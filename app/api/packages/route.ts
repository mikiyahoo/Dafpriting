import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const includeInactive = searchParams.get("includeInactive") === "true";

    const packages = await prisma.package.findMany({
      where: {
        ...(includeInactive ? {} : { isActive: true, category: { isActive: true } }),
        ...(category && category !== "all" ? { category: { slug: category } } : {}),
        ...(featured === "true" ? { isFeatured: true } : {}),
      },
      include: { category: true },
      orderBy: [
        { isPopular: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error("PACKAGES_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not load packages" },
      { status: 500 }
    );
  }
}
