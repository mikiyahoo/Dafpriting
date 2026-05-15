export interface OrderTrackingRecord {
  id: string;
  quoteRequestId: string;
  currentStage: string;
  notes: string | null;
  updatedAt: string;
  stages: OrderStageRecord[];
  quoteRequest?: {
    id: string;
    quoteNumber: string;
    customer: { name: string; email: string };
    service: { title: string };
    status: string;
  };
}

export interface OrderStageRecord {
  id: string;
  stage: string;
  label: string;
  completed: boolean;
  completedAt: string | null;
  note: string | null;
  sortOrder: number;
}

export const TRACKING_STAGES = [
  { stage: "ORDER_RECEIVED", label: "Order Received" },
  { stage: "DESIGN_REVIEW", label: "Design Review" },
  { stage: "PRODUCTION", label: "In Production" },
  { stage: "QUALITY_CHECK", label: "Quality Check" },
  { stage: "SHIPPED", label: "Shipped" },
  { stage: "DELIVERED", label: "Delivered" },
] as const;