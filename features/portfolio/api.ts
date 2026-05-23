import { prisma } from "@/lib/prisma";
import type { PortfolioItemRecord } from "./types";

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function getPortfolioItems(): Promise<PortfolioItemRecord[]> {
  const items = await prisma.portfolioItem.findMany({
    where: { isActive: true },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      _count: { select: { images: true } },
    },
    orderBy: { sortOrder: "asc" },
  });
  return JSON.parse(JSON.stringify(items));
}

export async function getPortfolioItem(id: string) {
  const item = await prisma.portfolioItem.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
  return item;
}

export async function getFeaturedItems() {
  const items = await prisma.portfolioItem.findMany({
    where: { isActive: true, featured: true },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });
  return JSON.parse(JSON.stringify(items));
}

export async function createPortfolioItem(data: {
  title: string;
  description?: string;
  coverImage?: string;
  category?: string;
  itemType?: string;
  clientName?: string;
  featured?: boolean;
}) {
  return prisma.portfolioItem.create({
    data: {
      title: data.title,
      description: data.description || null,
      coverImage: data.coverImage || null,
      category: data.category || "",
      itemType: data.itemType || "",
      clientName: data.clientName ? toTitleCase(data.clientName) : null,
      featured: data.featured || false,
    },
  });
}

export async function updatePortfolioItem(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    coverImage: string;
    category: string;
    itemType: string;
    clientName: string;
    featured: boolean;
    sortOrder: number;
    isActive: boolean;
  }>
) {
  const updateData = { ...data };
  if (updateData.clientName) {
    updateData.clientName = toTitleCase(updateData.clientName);
  }
  return prisma.portfolioItem.update({ where: { id }, data: updateData });
}

export async function deletePortfolioItem(id: string) {
  return prisma.portfolioItem.delete({ where: { id } });
}