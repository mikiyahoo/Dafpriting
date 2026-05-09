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

export const INVITATION_THEMES = {
  FLORAL_LUXURY: "FLORAL_LUXURY",
  MODERN_MINIMAL: "MODERN_MINIMAL",
  ROYAL_GOLD: "ROYAL_GOLD",
  TRADITIONAL_ETHIOPIAN: "TRADITIONAL_ETHIOPIAN",
  ELEGANT_BLACK: "ELEGANT_BLACK",
  GARDEN_WEDDING: "GARDEN_WEDDING",
  LUXURY_WHITE: "LUXURY_WHITE",
  CLASSIC_SERIF: "CLASSIC_SERIF",
} as const;

export type InvitationTheme =
  (typeof INVITATION_THEMES)[keyof typeof INVITATION_THEMES];

export const INVITATION_THEME_LABELS: Record<string, string> = {
  FLORAL_LUXURY: "Floral Luxury",
  MODERN_MINIMAL: "Modern Minimal",
  ROYAL_GOLD: "Royal Gold",
  TRADITIONAL_ETHIOPIAN: "Traditional Ethiopian",
  ELEGANT_BLACK: "Elegant Black",
  GARDEN_WEDDING: "Garden Wedding",
  LUXURY_WHITE: "Luxury White",
  CLASSIC_SERIF: "Classic Serif",
};

export const RSVP_STATUS = {
  ATTENDING: "ACCEPTED",
  NOT_ATTENDING: "DECLINED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  MAYBE: "MAYBE",
} as const;

export type RSVPStatus = (typeof RSVP_STATUS)[keyof typeof RSVP_STATUS];

export const INVITATION_STATUS = {
  DRAFT: "DRAFT",
  REVIEW: "REVIEW",
  APPROVED: "APPROVED",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

export type InvitationStatus =
  (typeof INVITATION_STATUS)[keyof typeof INVITATION_STATUS];

export const GIFT_PRIORITIES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type GiftPriority = (typeof GIFT_PRIORITIES)[keyof typeof GIFT_PRIORITIES];

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
  invitations?: WeddingInvitationSummary[];
}

export interface WeddingInvitationSummary {
  id: string;
  slug: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  isPublished: boolean;
  status?: InvitationStatus;
  theme: string;
  templateKey?: string;
  _count?: {
    rsvps: number;
    gifts: number;
  };
}

export interface GiftRegistryItem {
  id: string;
  giftName: string;
  title?: string | null;
  description: string | null;
  imageUrl: string | null;
  priority: number;
  priorityLabel?: GiftPriority;
  allowDuplicates?: boolean;
  isReserved: boolean;
  reservedBy: string | null;
  reservedMessage?: string | null;
  createdAt: string;
}

export interface RSVPRecord {
  id: string;
  guestName: string;
  guestPhone: string | null;
  attendance: RSVPStatus;
  message: string | null;
  createdAt: string;
}

export interface WeddingInvitationRecord {
  id: string;
  bookingId: string;
  brideName: string;
  groomName: string;
  slug: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  dressCode: string | null;
  mapUrl: string | null;
  welcomeMessage?: string | null;
  story: string | null;
  heroImageUrl?: string | null;
  coverImage: string | null;
  galleryImages: string[];
  theme: InvitationTheme;
  templateKey?: string;
  themeColor?: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  customMessage: string | null;
  floralTopLeft?: string | null;
  floralTopRight?: string | null;
  floralBottomLeft?: string | null;
  floralBottomRight?: string | null;
  status?: InvitationStatus;
  allowRSVP?: boolean;
  allowGiftRegistry?: boolean;
  publishedAt?: string | null;
  isPublished: boolean;
  pdfUrl: string | null;
  createdAt: string;
  updatedAt: string;
  gifts: GiftRegistryItem[];
  rsvps?: RSVPRecord[];
}

export interface BookingMessage {
  id: string;
  bookingId: string;
  sender: "ADMIN" | "SYSTEM";
  content: string;
  createdAt: string;
}

export interface PackageCategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    packages: number;
  };
}

export interface PackageRecord {
  id: string;
  categoryId: string;
  category?: PackageCategoryRecord;
  name: string;
  shortDesc: string;
  description: string;
  price: number | null;
  priceLabel: string;
  features: string[];
  exclusions: string[];
  imageUrl: string | null;
  galleryImages: string[];
  isPopular: boolean;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
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
