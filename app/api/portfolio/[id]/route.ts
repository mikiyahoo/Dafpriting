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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, coverImage, category, itemType, clientName, featured, isActive } = body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (coverImage !== undefined) data.coverImage = coverImage;
    if (category !== undefined) data.category = category;
    if (itemType !== undefined) data.itemType = itemType;
    if (clientName !== undefined) data.clientName = clientName ? toTitleCase(clientName) : null;
    if (featured !== undefined) data.featured = featured;
    if (isActive !== undefined) data.isActive = isActive;

    const item = await prisma.portfolioItem.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Failed to update portfolio item:", error);
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    await prisma.portfolioItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete portfolio item:", error);
    return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 });
  }
}
