export type QuoteStatus =
  | "PENDING"
  | "REVIEWING"
  | "QUOTED"
  | "ACCEPTED"
  | "DECLINED"
  | "ARCHIVED";

export const QUOTE_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  REVIEWING: "Reviewing",
  QUOTED: "Quoted",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
  ARCHIVED: "Archived",
};

export const QUOTE_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  REVIEWING: "bg-blue-100 text-blue-800",
  QUOTED: "bg-green-100 text-green-800",
  ACCEPTED: "bg-emerald-100 text-emerald-800",
  DECLINED: "bg-red-100 text-red-800",
  ARCHIVED: "bg-gray-100 text-gray-800",
};

export interface QuoteFileRecord {
  id: string;
  quoteRequestId: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
}

export interface QuoteRecord {
  id: string;
  quoteNumber: string;
  customerId: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
  };
  serviceId: string;
  service: {
    id: string;
    title: string;
    slug: string;
  };
  quantity: number;
  size: string | null;
  material: string | null;
  notes: string | null;
  status: QuoteStatus;
  assignedTo: string | null;
  quotedPrice: number | null;
  validUntil: string | null;
  createdAt: string;
  updatedAt: string;
  files: QuoteFileRecord[];
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceId: string;
  quantity: number;
  size: string;
  material: string;
  notes?: string;
}