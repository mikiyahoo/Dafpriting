import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { GALLERY_BUCKET, getGalleryStoragePath, getSupabaseAdminClient } from "@/lib/supabase";

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

    const { id } = await params;
    const body = await request.json();
    const data: { isFeatured?: boolean; sortOrder?: number } = {};

    if (typeof body.isFeatured === "boolean") {
      data.isFeatured = body.isFeatured;
    }

    if (typeof body.sortOrder === "number" && Number.isFinite(body.sortOrder)) {
      data.sortOrder = body.sortOrder;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const image = await prisma.galleryImage.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    console.error("GALLERY_PATCH_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to update gallery image" },
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

    const { id } = await params;
    const image = await prisma.galleryImage.delete({
      where: { id },
    });

    const paths = [
      image.imageUrl,
      image.beforeImageUrl,
      image.afterImageUrl,
    ].flatMap((url) => {
      if (!url) return [];

      const path = getGalleryStoragePath(url);
      return path ? [path] : [];
    });

    if (paths.length > 0) {
      const supabase = getSupabaseAdminClient();
      const { error } = await supabase.storage.from(GALLERY_BUCKET).remove(paths);

      if (error) {
        console.error("GALLERY_STORAGE_DELETE_ERROR", error);
      }
    }

    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    console.error("GALLERY_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery image" },
      { status: 500 }
    );
  }
}
