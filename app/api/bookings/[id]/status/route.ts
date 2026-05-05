import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingStatusSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

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

    // Check if this is a payment update
    if (body.payment) {
      const { payment } = body;
      const updated = await prisma.booking.update({
        where: { id },
        data: {
          agreedAmount: payment.agreed_amount ? parseFloat(payment.agreed_amount) : null,
          depositAmount: payment.deposit_amount ? parseFloat(payment.deposit_amount) : null,
          depositPaid: payment.deposit_received ?? false,
          depositDate: payment.deposit_date ? new Date(payment.deposit_date) : null,
          balancePaid: payment.balance_paid ?? false,
          balanceDate: payment.balance_date ? new Date(payment.balance_date) : null,
        },
      });

      return NextResponse.json({ success: true, data: updated });
    }

    // Status update
    const validation = bookingStatusSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid status";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { status: newStatus } = validation.data;

    // Check booking exists
    const currentBooking = await prisma.booking.findUnique({ where: { id } });
    if (!currentBooking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Update status
    const updated = await prisma.booking.update({
      where: { id },
      data: { status: newStatus },
    });

    // Create system message for status change
    await prisma.message.create({
      data: {
        bookingId: id,
        sender: "SYSTEM",
        content: `Status changed to ${newStatus.replace("_", " ")}`,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("BOOKING_STATUS_API_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}