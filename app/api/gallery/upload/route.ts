import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { isGalleryCategory } from "@/lib/gallery";
import { GALLERY_BUCKET, getSupabaseAdminClient } from "@/lib/supabase";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalImage(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function validateImage(file: File, label: string) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return `${label} must be a JPEG, PNG, WebP, or AVIF image`;
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return `${label} must be smaller than 8MB`;
  }

  return null;
}

function safeStorageName(file: File, prefix: string) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExtension = extension.replace(/[^a-z0-9]/g, "") || "jpg";

  return `gallery/${prefix}-${Date.now()}-${crypto.randomUUID()}.${safeExtension}`;
}

async function uploadImage(file: File, prefix: string) {
  const supabase = getSupabaseAdminClient();
  const path = safeStorageName(file, prefix);

  const { error } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const title = readString(formData, "title");
    const description = readString(formData, "description");
    const category = readString(formData, "category");
    const isFeatured = formData.get("isFeatured") === "true";
    const isBeforeAfter = formData.get("isBeforeAfter") === "true";
    const sortOrderValue = readString(formData, "sortOrder");
    const sortOrder = sortOrderValue ? Number.parseInt(sortOrderValue, 10) : 0;
    const file = getOptionalImage(formData, "file");
    const beforeFile = getOptionalImage(formData, "beforeFile");
    const afterFile = getOptionalImage(formData, "afterFile");

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }

    if (!isGalleryCategory(category)) {
      return NextResponse.json(
        { success: false, error: "Valid category is required" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Main image is required" },
        { status: 400 }
      );
    }

    for (const [candidate, label] of [
      [file, "Main image"],
      [beforeFile, "Before image"],
      [afterFile, "After image"],
    ] as const) {
      if (!candidate) continue;

      const error = validateImage(candidate, label);
      if (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
      }
    }

    if (isBeforeAfter && (!beforeFile || !afterFile)) {
      return NextResponse.json(
        {
          success: false,
          error: "Before and after images are required for comparisons",
        },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(file, "image");
    const beforeImageUrl =
      isBeforeAfter && beforeFile
        ? await uploadImage(beforeFile, "before")
        : null;
    const afterImageUrl =
      isBeforeAfter && afterFile ? await uploadImage(afterFile, "after") : null;

    const image = await prisma.galleryImage.create({
      data: {
        title,
        description: description || null,
        imageUrl,
        category,
        isFeatured,
        isBeforeAfter,
        beforeImageUrl,
        afterImageUrl,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      },
    });

    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error) {
    console.error("GALLERY_UPLOAD_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
