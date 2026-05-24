import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const fallbackTestimonials = [
  {
    id: "fallback-sarah-jenkins",
    customerName: "Sarah Jenkins",
    company: "Vertex Agency",
    review:
      "Daf Printing delivered exceptional quality flyers and banners for our brand launch. Absolute lifesavers with their quick turnaround!",
    rating: 5,
    isApproved: true,
    isFeatured: true,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    avatarType: "upload",
    createdAt: "2026-05-10T10:00:00+03:00",
    updatedAt: "2026-05-10T10:00:00+03:00",
  },
  {
    id: "fallback-ethan-chan",
    customerName: "Ethan Chan",
    company: "ShopEase",
    review:
      "Great quality products and helpful customer support. Highly recommended for any e-commerce businesses needing fast prints.",
    rating: 5,
    isApproved: true,
    isFeatured: true,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    avatarType: "upload",
    createdAt: "2026-05-08T14:00:00+03:00",
    updatedAt: "2026-05-08T14:00:00+03:00",
  },
];

async function getTestimonialsFromSupabase(params: {
  approved?: string | null;
  featured?: string | null;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  const url = new URL(`${supabaseUrl}/rest/v1/Testimonial`);
  url.searchParams.set(
    "select",
    "id,customerName,company,review,rating,isApproved,isFeatured,avatarUrl,avatarType,createdAt,updatedAt"
  );
  url.searchParams.set("order", "createdAt.desc");

  if (params.approved === "true") {
    url.searchParams.set("isApproved", "eq.true");
  }
  if (params.featured === "true") {
    url.searchParams.set("isFeatured", "eq.true");
  }

  const response = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase testimonials returned ${response.status}`);
  }

  const testimonials = await response.json();
  return Array.isArray(testimonials) ? testimonials : null;
}

// GET /api/testimonials - Public: fetch approved testimonials; can filter by featured
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");
    const featured = searchParams.get("featured");

    const where: Record<string, unknown> = {};
    if (approved === "true") where.isApproved = true;
    if (featured === "true") where.isFeatured = true;

    const supabaseTestimonials = await getTestimonialsFromSupabase({
      approved,
      featured,
    });
    if (supabaseTestimonials) {
      return NextResponse.json({ items: supabaseTestimonials });
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    return NextResponse.json({
      items:
        featured === "true"
          ? fallbackTestimonials.filter((testimonial) => testimonial.isFeatured)
          : fallbackTestimonials,
    });
  }
}

// POST /api/testimonials - Admin: create a testimonial
export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { customerName, company, review, rating, isApproved, isFeatured, avatarUrl, avatarType } = body;

    if (!customerName || !review) {
      return NextResponse.json({ error: "customerName and review are required" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        customerName,
        company: company || null,
        review,
        rating: rating || 5,
        isApproved: isApproved ?? false,
        isFeatured: isFeatured ?? false,
        avatarUrl: avatarUrl || null,
        avatarType: avatarType || "none",
      } as any,
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
