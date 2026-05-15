import { z } from "zod";

// ─────────────────────────────────────────
// DAF PRINTING — QUOTE FORM
// ─────────────────────────────────────────
export const quoteFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  company: z.string().max(200).optional(),
  serviceId: z.string().min(1, "Please select a service"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  size: z.string().min(1, "Please select a size"),
  material: z.string().min(1, "Please select a material"),
  notes: z
    .string()
    .max(2000, "Notes must be under 2000 characters")
    .optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

// ─────────────────────────────────────────
// DAF PRINTING — LOGIN
// ─────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ─────────────────────────────────────────
// LEGACY — RADIANCE BACKWARD COMPATIBILITY
// These will be removed in a future cleanup.
// ─────────────────────────────────────────

export const bookingFormSchema = z.object({
  clientName: z.string().min(1, "Name is required"),
  clientEmail: z.string().email("Valid email is required"),
  clientPhone: z.string().min(1, "Phone is required"),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  location: z.string().min(1, "Location is required"),
  guestCount: z.string().optional(),
  budgetRange: z.string().min(1, "Budget range is required"),
  notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const bookingStatusSchema = z.object({
  status: z.string().min(1),
  internalNotes: z.string().optional(),
  assignedTo: z.string().optional(),
  agreedAmount: z.number().optional(),
  depositAmount: z.number().optional(),
  depositPaid: z.boolean().optional(),
  balancePaid: z.boolean().optional(),
});

export const bookingMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  sender: z.enum(["ADMIN", "SYSTEM"]),
});

export const rsvpSchema = z.object({
  guestName: z.string().min(1, "Name is required"),
  guestPhone: z.string().optional(),
  attendance: z.enum(["ATTENDING", "NOT_ATTENDING", "MAYBE"]),
  message: z.string().optional(),
});

export const giftReservationSchema = z.object({
  giftId: z.string().min(1, "Gift is required"),
  reservedBy: z.string().min(1, "Your name is required"),
  reservedMessage: z.string().optional(),
});

export const packageCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  sortOrder: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const packageSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  shortDesc: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  price: z.number().nullable().optional(),
  priceLabel: z.string().min(1, "Price label is required"),
  features: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  isPopular: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const weddingInvitationSchema = z.object({
  brideName: z.string().min(1, "Bride name is required"),
  groomName: z.string().min(1, "Groom name is required"),
  slug: z.string().min(1, "Slug is required"),
  weddingDate: z.string().min(1, "Wedding date is required"),
  weddingTime: z.string().min(1, "Wedding time is required"),
  venueName: z.string().min(1, "Venue name is required"),
  venueAddress: z.string().min(1, "Venue address is required"),
  dressCode: z.string().optional(),
  mapUrl: z.string().optional(),
  welcomeMessage: z.string().optional(),
  story: z.string().optional(),
  heroImageUrl: z.string().optional(),
  coverImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  templateKey: z.string().optional(),
  themeColor: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  customMessage: z.string().optional(),
  floralTopLeft: z.string().optional(),
  floralTopRight: z.string().optional(),
  floralBottomLeft: z.string().optional(),
  floralBottomRight: z.string().optional(),
});