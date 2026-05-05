"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MessageThread } from "@/components/admin/MessageThread";
import { PaymentTracker } from "@/components/admin/PaymentTracker";
import { BookingRecord, BookingStatus, BOOKING_STATUS, EVENT_TYPE_LABELS, BUDGET_LABELS } from "@/types";
import { Loader2, ArrowLeft, Calendar, Phone, Mail, DollarSign, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingDetailProps {
  bookingId: string;
}

export function BookingDetail({ bookingId }: BookingDetailProps) {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const fetchBooking = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/bookings?search=${bookingId}`);
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      const found = (result.data ?? []).find(
        (b: BookingRecord) => b.id === bookingId
      );
      if (!found) throw new Error("Booking not found");

      setBooking(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const updateStatus = async (newStatus: string) => {
    if (!booking || updating) return;

    setUpdating(true);

    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setBooking(result.data);
      setToastMessage("Status updated successfully");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      setToastMessage("Failed to update status");
      setTimeout(() => setToastMessage(""), 3000);
      console.error("STATUS_UPDATE_ERROR", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error || "Booking not found"}</p>
        <button
          onClick={() => router.push("/admin/bookings")}
          className="text-amber-400 underline hover:no-underline"
        >
          Back to bookings
        </button>
      </div>
    );
  }

  const statusTransitions: Record<string, string[]> = {
    [BOOKING_STATUS.NEW_REQUEST]: [BOOKING_STATUS.CONTACTED, BOOKING_STATUS.CANCELLED],
    [BOOKING_STATUS.CONTACTED]: [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.CANCELLED],
    [BOOKING_STATUS.CONFIRMED]: [BOOKING_STATUS.PLANNED, BOOKING_STATUS.CANCELLED],
    [BOOKING_STATUS.PLANNED]: [BOOKING_STATUS.COMPLETED, BOOKING_STATUS.CANCELLED],
    [BOOKING_STATUS.COMPLETED]: [],
    [BOOKING_STATUS.CANCELLED]: [],
  };

  const availableTransitions = statusTransitions[booking.status] ?? [];

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {toastMessage}
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.push("/admin/bookings")}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to bookings
          </button>
          <h1 className="text-2xl font-bold text-white">{booking.clientName}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Created {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>
        <StatusBadge status={booking.status as BookingStatus} className="text-sm px-3 py-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Client Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <a href={`mailto:${booking.clientEmail}`} className="text-amber-400 hover:text-amber-300">
                {booking.clientEmail}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <a href={`tel:${booking.clientPhone}`} className="text-amber-400 hover:text-amber-300">
                {booking.clientPhone}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Event Details</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400 w-24">Type</span>
              <span className="font-medium text-white">{EVENT_TYPE_LABELS[booking.eventType] || booking.eventType}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">
                {booking.eventDate
                  ? new Date(booking.eventDate).toLocaleDateString("en-US", {
                      weekday: "long", year: "numeric", month: "long", day: "numeric",
                    })
                  : "Not specified"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{booking.location || "Not specified"}</span>
            </div>
            {booking.guestCount && (
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{booking.guestCount} guests</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{BUDGET_LABELS[booking.budgetRange] || booking.budgetRange}</span>
            </div>
          </div>
        </div>
      </div>

      {booking.notes && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Client Notes</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{booking.notes}</p>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Status Control</h2>
        {availableTransitions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {availableTransitions.map((transition) => (
              <button
                key={transition}
                onClick={() => updateStatus(transition)}
                disabled={updating}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg transition-colors border font-medium",
                  transition === BOOKING_STATUS.CANCELLED
                    ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                    : "border-amber-500/30 text-amber-400 hover:bg-amber-500/10",
                  updating && "opacity-50 cursor-not-allowed"
                )}
              >
                {updating ? <Loader2 className="w-4 h-4 animate-spin inline mr-1" /> : null}
                Move to {transition.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No further status changes available.</p>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Payment Tracking</h2>
        <PaymentTracker bookingId={bookingId} />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Communication Log</h2>
        <MessageThread bookingId={bookingId} />
      </div>
    </div>
  );
}