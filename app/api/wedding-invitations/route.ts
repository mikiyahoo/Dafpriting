import { NextRequest, NextResponse } from "next/server";
import { InvitationStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { weddingInvitationSchema } from "@/lib/validations";
import { isMissingWeddingExperienceTable } from "@/lib/prisma-errors";

function nullable(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function publishState(isPublished: boolean, status?: string) {
  const published = isPublished || status === "PUBLISHED";
  return {
    isPublished: published,
    status: (published ? "PUBLISHED" : status ?? "DRAFT") as InvitationStatus,
    publishedAt: published ? new Date() : null,
  };
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const invitations = await prisma.weddingInvitation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        booking: true,
        gifts: { orderBy: [{ priority: "desc" }, { createdAt: "asc" }] },
        rsvps: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json({ success: true, data: invitations });
  } catch (error) {
    console.error("WEDDING_INVITATION_LIST_ERROR", error);
    if (isMissingWeddingExperienceTable(error)) {
      return NextResponse.json(
        {
          success: false,
          error: "Wedding experience tables are not installed yet.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const validation = weddingInvitationSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid invitation";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const data = validation.data;
    const booking = await prisma.booking.findUnique({
      where: { id: data.bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    if (
      booking.eventType !== "WEDDING" ||
      !["CONFIRMED", "PLANNED"].includes(booking.status)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Wedding invitations can only be created for confirmed or planned wedding bookings",
        },
        { status: 400 }
      );
    }

    const existingForBooking = await prisma.weddingInvitation.findFirst({
      where: { bookingId: data.bookingId },
      select: { id: true },
    });

    if (existingForBooking) {
      return NextResponse.json(
        { success: false, error: "This booking already has a wedding invitation" },
        { status: 409 }
      );
    }

    const invitation = await prisma.weddingInvitation.create({
      data: {
        bookingId: data.bookingId,
        brideName: data.brideName,
        groomName: data.groomName,
        slug: data.slug,
        weddingDate: new Date(data.weddingDate),
        weddingTime: data.weddingTime,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        dressCode: nullable(data.dressCode),
        mapUrl: nullable(data.mapUrl),
        welcomeMessage: nullable(data.welcomeMessage),
        story: nullable(data.story),
        heroImageUrl: nullable(data.heroImageUrl) ?? nullable(data.coverImage),
        coverImage: nullable(data.coverImage),
        galleryImages: data.galleryImages,
        templateKey: data.templateKey || data.theme,
        theme: data.theme,
        themeColor: nullable(data.themeColor) ?? nullable(data.primaryColor),
        primaryColor: nullable(data.primaryColor),
        secondaryColor: nullable(data.secondaryColor),
        customMessage: nullable(data.customMessage),
        floralTopLeft: nullable(data.floralTopLeft),
        floralTopRight: nullable(data.floralTopRight),
        floralBottomLeft: nullable(data.floralBottomLeft),
        floralBottomRight: nullable(data.floralBottomRight),
        allowRSVP: data.allowRSVP,
        allowGiftRegistry: data.allowGiftRegistry,
        ...publishState(data.isPublished, data.status),
        gifts: {
          create: data.gifts.map((gift) => ({
            giftName: gift.giftName,
            title: gift.giftName,
            description: nullable(gift.description),
            imageUrl: nullable(gift.imageUrl),
            priority: gift.priority,
            priorityLabel: gift.priorityLabel,
            allowDuplicates: gift.allowDuplicates,
            reservedMessage: nullable(gift.reservedMessage),
          })),
        },
      },
      include: {
        gifts: { orderBy: [{ priority: "desc" }, { createdAt: "asc" }] },
        rsvps: { orderBy: { createdAt: "desc" } },
      },
    });

    await prisma.message.create({
      data: {
        bookingId: data.bookingId,
        sender: "SYSTEM",
        content: `Wedding invitation created for ${data.brideName} & ${data.groomName}.`,
      },
    });

    return NextResponse.json({ success: true, data: invitation }, { status: 201 });
  } catch (error) {
    console.error("WEDDING_INVITATION_CREATE_ERROR", error);
    if (isMissingWeddingExperienceTable(error)) {
      return NextResponse.json(
        {
          success: false,
          error: "Wedding experience tables are not installed yet. Apply prisma/wedding_experience.sql first.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Could not create invitation. Check that the slug is unique." },
      { status: 500 }
    );
  }
}
