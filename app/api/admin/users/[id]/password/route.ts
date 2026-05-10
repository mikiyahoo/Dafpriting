import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

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

    // Only SUPER_ADMIN can reset passwords
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user?.email ?? "" },
    });
    if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Only super admins can reset passwords" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { password } = body;

    if (!password?.trim() || password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("ADMIN_USERS_PASSWORD_RESET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not reset password" },
      { status: 500 }
    );
  }
}