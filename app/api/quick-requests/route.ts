import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/quick-requests
export async function GET() {
  try {
    const requests = await prisma.quickRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching quick requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch quick requests" },
      { status: 500 }
    );
  }
}

// POST /api/quick-requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, email, company, firstName, magazineType, quantity } = body;

    if (!phone || !firstName || !magazineType || !quantity) {
      return NextResponse.json(
        { error: "Phone, first name, magazine type, and quantity are required" },
        { status: 400 }
      );
    }

    const quickRequest = await prisma.quickRequest.create({
      data: {
        phone,
        email: email || null,
        company: company || null,
        firstName,
        magazineType,
        quantity: parseInt(quantity),
      },
    });

    return NextResponse.json({ success: true, quickRequest }, { status: 201 });
  } catch (error) {
    console.error("Error creating quick request:", error);
    return NextResponse.json(
      { error: "Failed to create quick request" },
      { status: 500 }
    );
  }
}