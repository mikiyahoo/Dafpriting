import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    // Only SUPER_ADMIN can update users
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user?.email ?? "" },
    });
    if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Only super admins can update users" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Prevent self-disable
    if (id === currentUser.id) {
      return NextResponse.json(
        { success: false, error: "You cannot modify your own account here" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, role, isActive, avatarUrl } = body;

    // Validate role if provided
    const validRoles = ["SUPER_ADMIN", "ADMIN", "STAFF"];
    if (role && !validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }

    // Check email uniqueness if changing
    if (email) {
      const existing = await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase() },
      });
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { success: false, error: "Email already in use" },
          { status: 409 }
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name.trim();
    if (email !== undefined) updateData.email = email.trim().toLowerCase();
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl || null;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("ADMIN_USERS_PATCH_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
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

    // Only SUPER_ADMIN can delete users
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user?.email ?? "" },
    });
    if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: "Only super admins can delete users" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Cannot delete self
    if (id === currentUser.id) {
      return NextResponse.json(
        { success: false, error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    // Prevent deleting the last SUPER_ADMIN
    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (targetUser?.role === "SUPER_ADMIN") {
      const superAdminCount = await prisma.user.count({
        where: { role: "SUPER_ADMIN" },
      });
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { success: false, error: "Cannot delete the last super admin" },
          { status: 400 }
        );
      }
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ADMIN_USERS_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not delete user" },
      { status: 500 }
    );
  }
}