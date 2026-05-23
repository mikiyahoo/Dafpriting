import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function GET() {
  try {
    const items = await prisma.portfolioItem.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        _count: { select: { images: true } },
      },
    });
    // Map to ensure all fields are present
    const mapped = items.map((item) => ({
      ...item,
      category: item.category || "",
      itemType: item.itemType || "",
      clientName: item.clientName || null,
    }));
    return NextResponse.json({ items: mapped });
  } catch (error) {
    console.error("Failed to fetch portfolio items:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { title, description, coverImage, category, itemType, clientName, featured, isActive } = body;

    const item = await prisma.portfolioItem.create({
      data: {
        title,
        description: description || null,
        coverImage: coverImage || null,
        category: category || "",
        itemType: itemType || "",
        clientName: clientName ? toTitleCase(clientName) : null,
        featured: featured || false,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error("Failed to create portfolio item:", error);
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}