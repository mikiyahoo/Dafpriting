import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

// GET /api/partnerships
export async function GET() {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const requests = await prisma.partnershipRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching partnership requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch partnership requests" },
      { status: 500 }
    );
  }
}

// POST /api/partnerships
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contactName, phone, company, services } = body;

    if (!contactName || !phone || !company || !services) {
      return NextResponse.json(
        { error: "Contact name, phone, company, and services are required" },
        { status: 400 }
      );
    }

    const partnership = await prisma.partnershipRequest.create({
      data: {
        contactName,
        phone,
        company,
        services,
      },
    });

    return NextResponse.json({ success: true, partnership }, { status: 201 });
  } catch (error) {
    console.error("Error creating partnership request:", error);
    return NextResponse.json(
      { error: "Failed to create partnership request" },
      { status: 500 }
    );
  }
}