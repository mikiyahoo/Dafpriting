import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const fallbackBanners = [
  {
    id: "fallback-banner-1",
    title: "High-impact print campaigns",
    imageUrl: "/assets/Banners/Daf-Banner-1.png",
    linkUrl: "/request-quote",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "fallback-banner-2",
    title: "Fast turnaround for every order",
    imageUrl: "/assets/Banners/Daf-Banner-2.png",
    linkUrl: "/services",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "fallback-banner-3",
    title: "Custom packaging & stationery",
    imageUrl: "/assets/Banners/Daf-Banner-3.png",
    linkUrl: "/categories/packaging",
    isActive: true,
    sortOrder: 3,
  },
];

function normalizeBannerImage(imageUrl: string) {
  const normalized = imageUrl
    .replace("/assets/banners/banner-1.jpg", "/assets/Banners/Daf-Banner-1.png")
    .replace("/assets/banners/banner-2.jpg", "/assets/Banners/Daf-Banner-2.png")
    .replace("/assets/banners/banner-3.jpg", "/assets/Banners/Daf-Banner-3.png");

  return normalized.startsWith("assets/") ? `/${normalized}` : normalized;
}

async function getBannersFromSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  const url = new URL(`${supabaseUrl}/rest/v1/Banner`);
  url.searchParams.set(
    "select",
    "id,title,imageUrl,linkUrl,sortOrder,isActive,createdAt,updatedAt"
  );
  url.searchParams.set("isActive", "eq.true");
  url.searchParams.set("order", "sortOrder.asc");

  const response = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase banners returned ${response.status}`);
  }

  const banners = await response.json();
  if (!Array.isArray(banners)) return null;

  return banners.map((banner) => ({
    ...banner,
    imageUrl: normalizeBannerImage(banner.imageUrl),
  }));
}

// GET /api/banners
export async function GET() {
  try {
    const supabaseBanners = await getBannersFromSupabase();
    if (supabaseBanners?.length) {
      return NextResponse.json(supabaseBanners);
    }

    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    const normalizedBanners = banners.map((banner) => ({
      ...banner,
      imageUrl: normalizeBannerImage(banner.imageUrl),
    }));
    return NextResponse.json(
      normalizedBanners.length > 0 ? normalizedBanners : fallbackBanners
    );
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(fallbackBanners);
  }
}

// POST /api/banners - simple create (admin UI should call this with imageUrl)
export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { title, imageUrl, linkUrl, sortOrder, isActive } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        imageUrl,
        linkUrl,
        sortOrder: sortOrder || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, banner }, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}
