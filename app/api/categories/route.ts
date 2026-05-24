import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const fallbackCategories = [
  {
    id: "fallback-magazines-books",
    name: "Magazines & Books",
    slug: "magazines-books",
    description:
      "Full-color magazine and book printing services including perfect binding, saddle stitching, hardcover, and softcover options.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "fallback-advertisement-banners",
    name: "Advertisement Banners",
    slug: "advertisement-banners",
    description:
      "High-impact banner printing for outdoor and indoor advertising.",
    image: "/assets/Works/Banner.jpg",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "fallback-apparel",
    name: "T-shirt/Cap (Apparel)",
    slug: "apparel",
    description:
      "Custom printed apparel including T-shirts, caps, polo shirts, and hoodies.",
    image: "/assets/Works/T-shirt.jpg",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "fallback-office-stationery",
    name: "Office Stationery",
    slug: "office-stationery",
    description:
      "Professional office stationery printing including letterheads, envelopes, notepads, and branded office supplies.",
    image: "/assets/Works/Envelope.jpg",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "fallback-flyers-brochures",
    name: "Flyers & Brochures",
    slug: "flyers-brochures",
    description:
      "Eye-catching flyer and brochure printing for campaigns, events, and promotions.",
    image: "/assets/Works/Flyer.jpg",
    isActive: true,
    sortOrder: 5,
  },
];

async function getCategoriesFromSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  const url = new URL(`${supabaseUrl}/rest/v1/Category`);
  url.searchParams.set(
    "select",
    "id,name,slug,description,image,sortOrder,isActive,createdAt,updatedAt"
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
    throw new Error(`Supabase categories returned ${response.status}`);
  }

  const categories = await response.json();
  return Array.isArray(categories) ? categories : null;
}

// GET /api/categories
export async function GET() {
  try {
    const supabaseCategories = await getCategoriesFromSupabase();
    if (supabaseCategories?.length) {
      return NextResponse.json(supabaseCategories);
    }

    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(
      categories.length > 0 ? categories : fallbackCategories
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(fallbackCategories);
  }
}

// POST /api/categories
export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { name, slug, description, image, sortOrder } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
