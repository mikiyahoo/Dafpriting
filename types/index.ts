export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  budget: string;
  message: string;
}

export interface BookingRecord extends BookingFormData {
  id: string;
  created_at: string;
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
