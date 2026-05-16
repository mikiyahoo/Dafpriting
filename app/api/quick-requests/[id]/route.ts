import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// PUT /api/quick-requests/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const quickRequest = await prisma.quickRequest.update({
      where: { id },
      data: {
        isRead: body.isRead,
      },
    });

    return NextResponse.json({ success: true, quickRequest });
  } catch (error) {
    console.error("Error updating quick request:", error);
    return NextResponse.json(
      { error: "Failed to update quick request" },
      { status: 500 }
    );
  }
}

// DELETE /api/quick-requests/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.quickRequest.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting quick request:", error);
    return NextResponse.json(
      { error: "Failed to delete quick request" },
      { status: 500 }
    );
  }
}