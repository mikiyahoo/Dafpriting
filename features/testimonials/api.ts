import { prisma } from "@/lib/prisma";

export async function getTestimonials(params?: { approved?: boolean; featured?: boolean }) {
  const where: Record<string, unknown> = {};
  if (params?.approved !== undefined) where.isApproved = params.approved;
  if (params?.featured) where.isFeatured = true;

  return prisma.testimonial.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedTestimonials() {
  return prisma.testimonial.findMany({
    where: { isApproved: true, isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function createTestimonial(data: {
  customerName: string;
  company?: string;
  review: string;
  rating: number;
  avatarUrl?: string | null;
  avatarType?: string | null;
}) {
  return prisma.testimonial.create({ data });
}

export async function updateTestimonial(
  id: string,
  data: Partial<{
    customerName: string;
    company: string;
    review: string;
    rating: number;
    isApproved: boolean;
    isFeatured: boolean;
    avatarUrl: string | null;
    avatarType: string | null;
  }>
) {
  return prisma.testimonial.update({ where: { id }, data });
}

export async function deleteTestimonial(id: string) {
  return prisma.testimonial.delete({ where: { id } });
}

export async function toggleTestimonialApproval(id: string, isApproved: boolean) {
  return prisma.testimonial.update({ where: { id }, data: { isApproved } });
}