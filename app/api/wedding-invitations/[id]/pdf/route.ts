import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
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
      select: { slug: true, isPublished: true },
    });

    if (!invitation) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    const exportUrls = {
      a4: `/wedding/${invitation.slug}/print/a4`,
      story: `/wedding/${invitation.slug}/print/story`,
      square: `/wedding/${invitation.slug}/print/square`,
    };

    await prisma.weddingInvitation.update({
      where: { id },
      data: { pdfUrl: exportUrls.a4 },
    });

    return NextResponse.json({
      success: true,
      data: {
        pdfUrl: exportUrls.a4,
        exportUrls,
        note: "Print-ready export pages generated. Save as PDF from the browser print dialog.",
      },
    });
  } catch (error) {
    console.error("WEDDING_PDF_EXPORT_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not prepare PDF export" },
      { status: 500 }
    );
  }
}
