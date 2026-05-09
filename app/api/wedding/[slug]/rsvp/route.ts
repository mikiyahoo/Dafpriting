import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rsvpSchema } from "@/lib/validations";

function nullable(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const validation = rsvpSchema.safeParse(body);

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid RSVP";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const invitation = await prisma.weddingInvitation.findUnique({
      where: { slug },
      select: { id: true, isPublished: true, status: true, allowRSVP: true },
    });

    if (!invitation || (!invitation.isPublished && invitation.status !== "PUBLISHED")) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    if (!invitation.allowRSVP) {
      return NextResponse.json(
        { success: false, error: "RSVP is closed for this invitation" },
        { status: 403 }
      );
    }

    const data = validation.data;
    const rsvp = await prisma.rSVP.create({
      data: {
        invitationId: invitation.id,
        guestName: data.guestName,
        guestPhone: nullable(data.guestPhone),
        attendance: data.attendance,
        message: nullable(data.message),
      },
    });

    return NextResponse.json({ success: true, data: rsvp }, { status: 201 });
  } catch (error) {
    console.error("PUBLIC_RSVP_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not submit RSVP" },
      { status: 500 }
    );
  }
}
