import { Metadata } from "next";
import { AdminBookingCreateForm } from "@/components/admin/AdminBookingCreateForm";

export const metadata: Metadata = {
  title: "Create Booking | Admin | Radiance",
  description: "Create new bookings manually",
};

export default function AdminBookingCreatePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        <AdminBookingCreateForm />
      </div>
    </div>
  );
}