import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const invitation = await prisma.weddingInvitation.findUnique({
      where: { slug },
      include: {
        gifts: { orderBy: [{ priority: "desc" }, { createdAt: "asc" }] },
      },
    });

    if (
      !invitation ||
      (!invitation.isPublished && invitation.status !== "PUBLISHED")
    ) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: invitation });
  } catch (error) {
    console.error("PUBLIC_WEDDING_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not load invitation" },
      { status: 500 }
    );
  }
}
