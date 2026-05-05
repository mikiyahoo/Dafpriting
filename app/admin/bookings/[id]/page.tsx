import { Metadata } from "next";
import { BookingDetail } from "@/components/admin/BookingDetail";

export const metadata: Metadata = {
  title: "Booking Detail | Admin | Radiance",
  description: "View and manage booking details",
};

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto">
      <BookingDetail bookingId={id} />
    </div>
  );
}