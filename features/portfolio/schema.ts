import { z } from "zod";

export const portfolioItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const portfolioImageSchema = z.object({
  imageUrl: z.string().url("Invalid image URL"),
  caption: z.string().optional(),
  sortOrder: z.number().int().default(0),
});