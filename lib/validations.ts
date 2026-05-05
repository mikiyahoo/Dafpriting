import { z } from "zod";
import { BOOKING_STATUS, EVENT_TYPES, BUDGET_RANGES } from "@/types";

export const bookingFormSchema = z.object({
  clientName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  clientEmail: z.string().email("Please enter a valid email address"),
  clientPhone: z.string().min(6, "Phone number is required"),
  eventType: z.enum([
    EVENT_TYPES.WEDDING,
    EVENT_TYPES.BIRTHDAY,
    EVENT_TYPES.CORPORATE,
    EVENT_TYPES.GRADUATION,
    EVENT_TYPES.ENGAGEMENT,
    EVENT_TYPES.ANNIVERSARY,
    EVENT_TYPES.CULTURAL,
    EVENT_TYPES.OTHER,
  ]),
  eventDate: z.string().refine(
    (val) => {
      if (!val) return false;
      const date = new Date(val);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return date >= now;
    },
    { message: "Event date must be today or in the future" }
  ),
  location: z.string().min(1, "Location is required"),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1").optional(),
  budgetRange: z.enum([
    BUDGET_RANGES.UNDER_50K,
    BUDGET_RANGES.RANGE_50K_100K,
    BUDGET_RANGES.RANGE_100K_200K,
    BUDGET_RANGES.RANGE_200K_500K,
    BUDGET_RANGES.ABOVE_500K,
  ]),
  notes: z.string().optional().default(""),
});

export const bookingStatusSchema = z.object({
  status: z.enum([
    BOOKING_STATUS.NEW_REQUEST,
    BOOKING_STATUS.CONTACTED,
    BOOKING_STATUS.CONFIRMED,
    BOOKING_STATUS.PLANNED,
    BOOKING_STATUS.COMPLETED,
    BOOKING_STATUS.CANCELLED,
  ]),
});

export const bookingMessageSchema = z.object({
  sender: z.enum(["ADMIN", "SYSTEM"]),
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(2000, "Message is too long"),
});

export type BookingFormInput = z.infer<typeof bookingFormSchema>;
export type BookingStatusInput = z.infer<typeof bookingStatusSchema>;
export type BookingMessageInput = z.infer<typeof bookingMessageSchema>;