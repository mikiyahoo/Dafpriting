"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { BookingFormData } from "@/types";

const eventTypes = [
  "Corporate Event",
  "Wedding",
  "Private Party",
  "Brand Activation",
  "Gala",
  "Other",
];

const budgetRanges = [
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
];

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    event_date: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) return false;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return false;
    if (!formData.event_type) return false;
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields with valid information.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        event_type: "",
        event_date: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit booking"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-radiance-navy mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-radiance-navy/20 bg-transparent text-radiance-navy placeholder:text-radiance-navy/40 focus:outline-none focus:border-radiance-navy transition-colors"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-radiance-navy mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-radiance-navy/20 bg-transparent text-radiance-navy placeholder:text-radiance-navy/40 focus:outline-none focus:border-radiance-navy transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-radiance-navy mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-radiance-navy/20 bg-transparent text-radiance-navy placeholder:text-radiance-navy/40 focus:outline-none focus:border-radiance-navy transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label
            htmlFor="event_type"
            className="block text-sm font-medium text-radiance-navy mb-2"
          >
            Event Type <span className="text-red-500">*</span>
          </label>
          <select
            id="event_type"
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-radiance-navy/20 bg-transparent text-radiance-navy focus:outline-none focus:border-radiance-navy transition-colors appearance-none"
          >
            <option value="">Select event type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="event_date"
            className="block text-sm font-medium text-radiance-navy mb-2"
          >
            Event Date
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-radiance-navy/20 bg-transparent text-radiance-navy focus:outline-none focus:border-radiance-navy transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-radiance-navy mb-2"
          >
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-radiance-navy/20 bg-transparent text-radiance-navy focus:outline-none focus:border-radiance-navy transition-colors appearance-none"
          >
            <option value="">Select budget range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-radiance-navy mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 border border-radiance-navy/20 bg-transparent text-radiance-navy placeholder:text-radiance-navy/40 focus:outline-none focus:border-radiance-navy transition-colors resize-none"
          placeholder="Tell us about your vision..."
        />
      </div>

      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm">
          Thank you! Your booking request has been submitted successfully. We will
          be in touch shortly.
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full md:w-auto"
      >
        {status === "loading" ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
