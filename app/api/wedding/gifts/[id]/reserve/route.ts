import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { giftReservationSchema } from "@/lib/validations";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validation = giftReservationSchema.safeParse(body);

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid reservation";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const gift = await prisma.giftRegistry.findUnique({
      where: { id },
      include: {
        invitation: {
          select: {
            id: true,
            isPublished: true,
            status: true,
            allowGiftRegistry: true,
          },
        },
      },
    });

    if (
      !gift ||
      (!gift.invitation.isPublished && gift.invitation.status !== "PUBLISHED")
    ) {
      return NextResponse.json(
        { success: false, error: "Gift not found" },
        { status: 404 }
      );
    }

    if (!gift.invitation.allowGiftRegistry) {
      return NextResponse.json(
        { success: false, error: "Gift registry is closed for this invitation" },
        { status: 403 }
      );
    }

    if (gift.isReserved && !gift.allowDuplicates) {
      return NextResponse.json(
        { success: false, error: "This gift is already reserved" },
        { status: 409 }
      );
    }

    await prisma.giftReservation.create({
      data: {
        invitationId: gift.invitation.id,
        giftId: gift.id,
        reservedBy: validation.data.reservedBy,
        reservedMessage: validation.data.reservedMessage || null,
      },
    });

    const savedGift = gift.allowDuplicates
      ? gift
      : await prisma.giftRegistry.update({
          where: { id },
          data: {
            isReserved: true,
            reservedBy: validation.data.reservedBy,
            reservedMessage: validation.data.reservedMessage || null,
          },
        });

    return NextResponse.json({ success: true, data: savedGift });
  } catch (error) {
    console.error("GIFT_RESERVATION_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not reserve gift" },
      { status: 500 }
    );
  }
}
