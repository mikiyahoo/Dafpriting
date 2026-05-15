import { prisma } from "@/lib/prisma";
import type { PortfolioItemRecord } from "./types";

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
  featured?: boolean;
}) {
  return prisma.portfolioItem.create({
    data: {
      title: data.title,
      description: data.description || null,
      coverImage: data.coverImage || null,
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
    featured: boolean;
    sortOrder: number;
    isActive: boolean;
  }>
) {
  return prisma.portfolioItem.update({ where: { id }, data });
}

export async function deletePortfolioItem(id: string) {
  return prisma.portfolioItem.delete({ where: { id } });
}