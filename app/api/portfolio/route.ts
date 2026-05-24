import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

type PortfolioImageRecord = {
  id: string;
  portfolioItemId: string;
  imageUrl: string;
  caption: string | null;
  sortOrder: number;
  createdAt: string;
};

type PortfolioItemRecord = {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  category: string;
  itemType: string;
  clientName: string | null;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  images?: PortfolioImageRecord[];
  _count?: { images: number };
};

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function fetchSupabaseTable<T>(
  tableName: string,
  params: Record<string, string>
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  const url = new URL(`${supabaseUrl}/rest/v1/${tableName}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase ${tableName} returned ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? (data as T[]) : null;
}

async function getPortfolioFromSupabase() {
  const items = await fetchSupabaseTable<PortfolioItemRecord>("PortfolioItem", {
    select:
      "id,title,description,coverImage,category,itemType,clientName,featured,sortOrder,isActive,createdAt,updatedAt",
    isActive: "eq.true",
    order: "sortOrder.asc",
  });

  if (!items) return null;

  const images = await fetchSupabaseTable<PortfolioImageRecord>(
    "PortfolioImage",
    {
      select: "id,portfolioItemId,imageUrl,caption,sortOrder,createdAt",
      order: "sortOrder.asc",
    }
  );

  const imagesByItem = new Map<string, PortfolioImageRecord[]>();
  for (const image of images ?? []) {
    const itemImages = imagesByItem.get(image.portfolioItemId) ?? [];
    itemImages.push(image);
    imagesByItem.set(image.portfolioItemId, itemImages);
  }

  return items.map((item) => {
    const itemImages = imagesByItem.get(item.id) ?? [];
    return {
      ...item,
      category: item.category || "",
      itemType: item.itemType || "",
      clientName: item.clientName || null,
      images: itemImages,
      _count: { images: itemImages.length },
    };
  });
}

export async function GET() {
  try {
    const supabaseItems = await getPortfolioFromSupabase();
    if (supabaseItems) {
      return NextResponse.json({ items: supabaseItems });
    }

    const items = await prisma.portfolioItem.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        _count: { select: { images: true } },
      },
    });
    // Map to ensure all fields are present
    const mapped = items.map((item) => ({
      ...item,
      category: item.category || "",
      itemType: item.itemType || "",
      clientName: item.clientName || null,
    }));
    return NextResponse.json({ items: mapped });
  } catch (error) {
    console.error("Failed to fetch portfolio items:", error);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { title, description, coverImage, category, itemType, clientName, featured, isActive } = body;

    const item = await prisma.portfolioItem.create({
      data: {
        title,
        description: description || null,
        coverImage: coverImage || null,
        category: category || "",
        itemType: itemType || "",
        clientName: clientName ? toTitleCase(clientName) : null,
        featured: featured || false,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error("Failed to create portfolio item:", error);
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}
