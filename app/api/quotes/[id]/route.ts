import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const quote = await prisma.quoteRequest.findUnique({
      where: { id },
      include: {
        customer: true,
        service: true,
        files: true,
        assignedUser: { select: { id: true, name: true, email: true } },
      },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status, quotedPrice, assignedTo } = body;

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (quotedPrice !== undefined) updateData.quotedPrice = quotedPrice;
    if (assignedTo) updateData.assignedTo = assignedTo;

    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: updateData,
      include: { customer: true, service: true },
    });

    return NextResponse.json({ success: true, quote });
  } catch (error) {
    console.error("Failed to update quote:", error);
    return NextResponse.json({ error: "Failed to update quote" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.quoteRequest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete quote:", error);
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 });
  }
}