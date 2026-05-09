import { NextRequest, NextResponse } from "next/server";
import { InvitationStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { weddingInvitationSchema } from "@/lib/validations";

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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const invitation = await prisma.weddingInvitation.findUnique({
      where: { id },
      include: {
        booking: true,
        gifts: { orderBy: [{ priority: "desc" }, { createdAt: "asc" }] },
        rsvps: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: invitation });
  } catch (error) {
    console.error("WEDDING_INVITATION_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
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
    const updated = await prisma.$transaction(async (tx) => {
      await tx.giftRegistry.deleteMany({ where: { invitationId: id } });

      await tx.weddingInvitation.update({
        where: { id },
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
      });

      return tx.weddingInvitation.findUnique({
        where: { id },
        include: {
          gifts: { orderBy: [{ priority: "desc" }, { createdAt: "asc" }] },
          rsvps: { orderBy: { createdAt: "desc" } },
        },
      });
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("WEDDING_INVITATION_UPDATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not update invitation. Check that the slug is unique." },
      { status: 500 }
    );
  }
}
