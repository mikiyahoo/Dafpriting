import { GalleryCategory } from "@/generated/prisma";

export const galleryCategories = [
  "ALL",
  "WEDDINGS",
  "BIRTHDAYS",
  "CORPORATE",
  "DECORATIONS",
  "BEHIND_THE_SCENES",
] as const;

export const galleryCategoryValues = [
  "WEDDINGS",
  "BIRTHDAYS",
  "CORPORATE",
  "DECORATIONS",
  "BEHIND_THE_SCENES",
] as const satisfies readonly GalleryCategory[];

export type GalleryCategoryFilter = (typeof galleryCategories)[number];

export type GalleryImageDto = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: GalleryCategory;
  isFeatured: boolean;
  isBeforeAfter: boolean;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  sortOrder: number;
  createdAt: string;
};

export function isGalleryCategory(value: string): value is GalleryCategory {
  return galleryCategoryValues.includes(value as GalleryCategory);
}

export function formatGalleryCategory(category: string) {
  return category
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}
