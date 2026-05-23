import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

// PUT /api/testimonials/[id] - Admin: update a testimonial
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    const body = await request.json();
    const { customerName, company, review, rating, isApproved, isFeatured, avatarUrl, avatarType } = body;

    const data: Record<string, unknown> = {};
    if (customerName !== undefined) data.customerName = customerName;
    if (company !== undefined) data.company = company;
    if (review !== undefined) data.review = review;
    if (rating !== undefined) data.rating = rating;
    if (isApproved !== undefined) data.isApproved = isApproved;
    if (isFeatured !== undefined) data.isFeatured = isFeatured;
    if (avatarUrl !== undefined) data.avatarUrl = avatarUrl;
    if (avatarType !== undefined) data.avatarType = avatarType;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// DELETE /api/testimonials/[id] - Admin: delete a testimonial
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}