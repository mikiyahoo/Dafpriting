import { prisma } from "@/lib/prisma";

/**
 * Get all active services
 */
export async function getActiveServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

/**
 * Get a service by slug
 */
export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({
    where: { slug },
  });
}

/**
 * Create a service
 */
export async function createService(data: {
  title: string;
  slug: string;
  description: string;
  image?: string;
}) {
  return prisma.service.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      image: data.image ?? null,
    },
  });
}

/**
 * Update a service
 */
export async function updateService(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    image: string;
    isActive: boolean;
    sortOrder: number;
  }>
) {
  return prisma.service.update({
    where: { id },
    data,
  });
}

/**
 * Delete a service
 */
export async function deleteService(id: string) {
  return prisma.service.delete({ where: { id } });
}