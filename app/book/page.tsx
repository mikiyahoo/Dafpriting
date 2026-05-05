import { Metadata } from "next";
import { BookingForm } from "@/components/public/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Event | Radiance",
  description:
    "Plan your perfect event with Radiance. Submit a booking request and our team will get back to you within 24 hours.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-radiance-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Event
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Tell us about your event and we'll create something
            unforgettable. Fill out the form below and our team will contact you
            within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </section>
    </main>
  );
}