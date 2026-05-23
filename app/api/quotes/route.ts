import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(request: Request) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [quotes, total] = await Promise.all([
      prisma.quoteRequest.findMany({
        where,
        include: { customer: true, service: true, files: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.quoteRequest.count({ where }),
    ]);

    return NextResponse.json({ quotes, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, serviceId, quantity, size, material, notes } = body;

    // Generate quote number
    const now = new Date();
    const datePart = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");
    const count = await prisma.quoteRequest.count({
      where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) } },
    });
    const quoteNumber = `QR-${datePart}-${String(count + 1).padStart(4, "0")}`;

    // Find or create customer
    let customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      customer = await prisma.customer.create({ data: { name, email, phone, company } });
    } else {
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: { name, phone, company: company || null },
      });
    }

    // Create quote
    const quote = await prisma.quoteRequest.create({
      data: {
        quoteNumber,
        customerId: customer.id,
        serviceId,
        quantity,
        size,
        material,
        notes,
      },
      include: { customer: true, service: true, files: true },
    });

    return NextResponse.json({ success: true, quote }, { status: 201 });
  } catch (error) {
    console.error("Failed to create quote:", error);
    return NextResponse.json({ error: "Failed to create quote" }, { status: 500 });
  }
}