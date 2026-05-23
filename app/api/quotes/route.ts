import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(request: Request) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: "insensitive" } },
        { customerEmail: { contains: search, mode: "insensitive" } },
        { quoteNumber: { contains: search, mode: "insensitive" } },
      ];
    }

    const [quotes, total] = await Promise.all([
      prisma.quoteRequest.findMany({
        where,
        include: { service: true, files: true },
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
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, customerCompany, serviceId, quantity, size, material, notes } = body;

    if (!customerName || !customerEmail || !serviceId || !quantity) {
      return NextResponse.json({ error: "Name, email, service, and quantity are required" }, { status: 400 });
    }

    // Generate quote number
    const now = new Date();
    const datePart = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");
    const count = await prisma.quoteRequest.count({
      where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) } },
    });
    const quoteNumber = `QR-${datePart}-${String(count + 1).padStart(4, "0")}`;

    const quote = await prisma.quoteRequest.create({
      data: {
        quoteNumber,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        customerCompany: customerCompany || null,
        serviceId,
        quantity: parseInt(quantity),
        size: size || null,
        material: material || null,
        notes: notes || null,
      },
      include: { service: true, files: true },
    });

    return NextResponse.json({ success: true, quote }, { status: 201 });
  } catch (error) {
    console.error("Failed to create quote:", error);
    return NextResponse.json({ error: "Failed to create quote" }, { status: 500 });
  }
}