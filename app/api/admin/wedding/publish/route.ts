import { NextRequest, NextResponse } from "next/server";
import { InvitationStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = String(body.id || body.invitationId || "");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invitation id is required" },
        { status: 400 }
      );
    }

    const invitation = await prisma.weddingInvitation.update({
      where: { id },
      data: {
        isPublished: true,
        status: InvitationStatus.PUBLISHED,
        publishedAt: new Date(),
      },
      include: {
        gifts: { orderBy: [{ priority: "desc" }, { createdAt: "asc" }] },
        rsvps: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json({ success: true, data: invitation });
  } catch (error) {
    console.error("ADMIN_WEDDING_PUBLISH_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not publish invitation" },
      { status: 500 }
    );
  }
}
