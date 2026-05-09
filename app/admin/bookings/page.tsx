import { Metadata } from "next";
import { Suspense } from "react";
import { BookingTable } from "@/components/admin/BookingTable";

export const metadata: Metadata = {
  title: "Bookings | Admin | Radiance",
  description: "Manage booking requests",
};

export default function AdminBookingsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-radiance-navy">Bookings</h1>
        <p className="text-gray-600 mt-1">
          Manage and respond to event booking requests
        </p>
      </div>

      <Suspense fallback={<div className="py-12 text-sm text-gray-600">Loading bookings...</div>}>
        <BookingTable />
      </Suspense>
    </div>
  );
}
