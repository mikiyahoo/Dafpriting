import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { giftReservationSchema } from "@/lib/validations";

const slugGiftReservationSchema = giftReservationSchema.extend({
  giftId: z.string().min(1, "Gift is required"),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const validation = slugGiftReservationSchema.safeParse(body);

    if (!validation.success) {
      const firstError =
        validation.error.issues[0]?.message || "Invalid reservation";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const invitation = await prisma.weddingInvitation.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!invitation) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    const gift = await prisma.giftRegistry.findFirst({
      where: { id: body.giftId, invitationId: invitation.id },
      select: { id: true },
    });

    if (!gift) {
      return NextResponse.json(
        { success: false, error: "Gift not found" },
        { status: 404 }
      );
    }

    const reserveResponse = await fetch(
      new URL(`/api/wedding/gifts/${gift.id}/reserve`, request.url),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reservedBy: validation.data.reservedBy,
          reservedMessage: validation.data.reservedMessage,
        }),
      }
    );
    const result = await reserveResponse.json();

    return NextResponse.json(result, { status: reserveResponse.status });
  } catch (error) {
    console.error("PUBLIC_GIFT_RESERVE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not reserve gift" },
      { status: 500 }
    );
  }
}
