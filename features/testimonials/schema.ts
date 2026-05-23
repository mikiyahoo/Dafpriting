import { z } from "zod";

export const testimonialSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  avatarType: z.string().optional().nullable().default("none"),
  review: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
});

export const testimonialAdminSchema = testimonialSchema.extend({
  isApproved: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});
