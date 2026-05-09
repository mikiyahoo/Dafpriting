import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.package.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!item || !item.isActive || !item.category.isActive) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("PACKAGE_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not load package" },
      { status: 500 }
    );
  }
}
