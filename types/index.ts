export const BOOKING_STATUS = {
  NEW_REQUEST: "NEW_REQUEST",
  CONTACTED: "CONTACTED",
  CONFIRMED: "CONFIRMED",
  PLANNED: "PLANNED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const EVENT_TYPES = {
  WEDDING: "WEDDING",
  BIRTHDAY: "BIRTHDAY",
  CORPORATE: "CORPORATE",
  GRADUATION: "GRADUATION",
  ENGAGEMENT: "ENGAGEMENT",
  ANNIVERSARY: "ANNIVERSARY",
  CULTURAL: "CULTURAL",
  OTHER: "OTHER",
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

export const BUDGET_RANGES = {
  UNDER_50K: "UNDER_50K",
  RANGE_50K_100K: "RANGE_50K_100K",
  RANGE_100K_200K: "RANGE_100K_200K",
  RANGE_200K_500K: "RANGE_200K_500K",
  ABOVE_500K: "ABOVE_500K",
} as const;

export type BudgetRange = (typeof BUDGET_RANGES)[keyof typeof BUDGET_RANGES];

export const BUDGET_LABELS: Record<string, string> = {
  UNDER_50K: "Under ETB 50,000",
  RANGE_50K_100K: "ETB 50,000 – 100,000",
  RANGE_100K_200K: "ETB 100,000 – 200,000",
  RANGE_200K_500K: "ETB 200,000 – 500,000",
  ABOVE_500K: "Above ETB 500,000",
};

export const EVENT_TYPE_LABELS: Record<string, string> = {
  WEDDING: "Wedding",
  BIRTHDAY: "Birthday",
  CORPORATE: "Corporate",
  GRADUATION: "Graduation",
  ENGAGEMENT: "Engagement",
  ANNIVERSARY: "Anniversary",
  CULTURAL: "Cultural",
  OTHER: "Other",
};

export const STATUS_LABELS: Record<string, string> = {
  NEW_REQUEST: "New Request",
  CONTACTED: "Contacted",
  CONFIRMED: "Confirmed",
  PLANNED: "Planning",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export interface BookingRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestCount: number | null;
  budgetRange: string;
  notes: string | null;
  status: string;
  internalNotes: string | null;
  assignedTo: string | null;
  agreedAmount: number | null;
  depositAmount: number | null;
  depositPaid: boolean;
  depositDate: string | null;
  balancePaid: boolean;
  balanceDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookingMessage {
  id: string;
  bookingId: string;
  sender: "ADMIN" | "SYSTEM";
  content: string;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  quality?: "auto" | number;
  format?: "auto" | "webp" | "jpg" | "png";
  crop?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}