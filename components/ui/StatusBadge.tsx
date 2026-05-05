"use client";

import { cn } from "@/lib/utils";
import { BookingStatus, BOOKING_STATUS } from "@/types";

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  [BOOKING_STATUS.NEW_REQUEST]: {
    label: "New Request",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  [BOOKING_STATUS.CONTACTED]: {
    label: "Contacted",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  [BOOKING_STATUS.CONFIRMED]: {
    label: "Confirmed",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  [BOOKING_STATUS.PLANNED]: {
    label: "Planning",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
  [BOOKING_STATUS.COMPLETED]: {
    label: "Completed",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
  [BOOKING_STATUS.CANCELLED]: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig[BOOKING_STATUS.NEW_REQUEST];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}