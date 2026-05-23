export interface TestimonialRecord {
  id: string;
  customerName: string;
  company: string | null;
  avatarUrl: string | null;
  avatarType: string | null;
  review: string;
  rating: number;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const TESTIMONIAL_RATINGS = [1, 2, 3, 4, 5] as const;
export type AvatarTier = "upload" | "clipart" | "none";
