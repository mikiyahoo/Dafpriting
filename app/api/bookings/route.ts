import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingFormSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";
import { isMissingWeddingExperienceTable } from "@/lib/prisma-errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = bookingFormSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || "Invalid input";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const validated = validation.data;

    // Create booking via Prisma
    const booking = await prisma.booking.create({
      data: {
        clientName: validated.clientName,
        clientEmail: validated.clientEmail,
        clientPhone: validated.clientPhone,
        eventType: validated.eventType,
        eventDate: new Date(validated.eventDate),
        location: validated.location,
        guestCount: validated.guestCount ?? null,
        budgetRange: validated.budgetRange,
        notes: validated.notes || null,
        status: "NEW_REQUEST",
      },
    });

    // Create initial system message
    await prisma.message.create({
      data: {
        bookingId: booking.id,
        sender: "SYSTEM",
        content: "New booking request received. Awaiting review.",
      },
    });

    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("BOOKING_API_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { id: search },
        { clientName: { contains: search, mode: "insensitive" } },
        { clientEmail: { contains: search, mode: "insensitive" } },
      ];
    }

    try {
      const bookings = await prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          invitations: {
            select: {
              id: true,
              slug: true,
              brideName: true,
              groomName: true,
              weddingDate: true,
              isPublished: true,
              status: true,
              templateKey: true,
              theme: true,
              _count: {
                select: {
                  rsvps: true,
                  gifts: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json({ success: true, data: bookings ?? [] });
    } catch (error) {
      if (!isMissingWeddingExperienceTable(error)) throw error;

      const bookings = await prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        success: true,
        data: bookings.map((booking) => ({ ...booking, invitations: [] })),
        warning: "Wedding experience tables are not installed yet.",
      });
    }
  } catch (error) {
    console.error("BOOKING_API_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
