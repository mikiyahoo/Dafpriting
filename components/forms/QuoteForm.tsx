"use client";

import { useActionState } from "react";
import { submitQuoteRequest } from "@/actions/submit-quote";

const sizes = ["A5", "A4", "A3", "A2", "A1", "Custom"];
const materials = [
  "Glossy Paper",
  "Matte Paper",
  "Cardstock",
  "Vinyl",
  "Canvas",
  "Fabric",
  "Other",
];

const defaultServices = [
  { id: "business-cards", title: "Business Cards" },
  { id: "brochures-flyers", title: "Brochures & Flyers" },
  { id: "banners-posters", title: "Banners & Posters" },
  { id: "t-shirts", title: "T-Shirt Printing" },
  { id: "stickers-labels", title: "Stickers & Labels" },
  { id: "packaging", title: "Packaging" },
  { id: "other", title: "Other" },
];

type QuoteState = {
  success: boolean;
  error?: string;
  quoteNumber?: string;
};

const initialState: QuoteState = { success: false };

export function QuoteForm() {
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(
    submitQuoteRequest,
    initialState
  );

  if (state.success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-primary-navy mb-2">
          Quote Request Submitted!
        </h3>
        <p className="text-primary-navy/60 mb-2">
          Your quote number is:{" "}
          <span className="font-bold text-primary-brown">{state.quoteNumber}</span>
        </p>
        <p className="text-primary-navy/60 text-sm">
          We'll review your request and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary-navy mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy placeholder-primary-navy/40 focus:outline-none focus:border-primary-brown transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary-navy mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy placeholder-primary-navy/40 focus:outline-none focus:border-primary-brown transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary-navy mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy placeholder-primary-navy/40 focus:outline-none focus:border-primary-brown transition-colors"
            placeholder="+251 911 234 567"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-primary-navy mb-1">
            Company (optional)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy placeholder-primary-navy/40 focus:outline-none focus:border-primary-brown transition-colors"
            placeholder="Your company"
          />
        </div>
      </div>

      <div>
        <label htmlFor="serviceId" className="block text-sm font-medium text-primary-navy mb-1">
          Service Type *
        </label>
        <select
          id="serviceId"
          name="serviceId"
          required
          className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy focus:outline-none focus:border-primary-brown transition-colors"
        >
          <option value="">Select a service</option>
          {defaultServices.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-primary-navy mb-1">
            Quantity *
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            required
            className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy placeholder-primary-navy/40 focus:outline-none focus:border-primary-brown transition-colors"
            placeholder="100"
          />
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-primary-navy mb-1">
            Size *
          </label>
          <select
            id="size"
            name="size"
            required
            className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy focus:outline-none focus:border-primary-brown transition-colors"
          >
            <option value="">Select size</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="material" className="block text-sm font-medium text-primary-navy mb-1">
            Material *
          </label>
          <select
            id="material"
            name="material"
            required
            className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy focus:outline-none focus:border-primary-brown transition-colors"
          >
            <option value="">Select material</option>
            {materials.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-primary-navy mb-1">
          Additional Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full px-4 py-3 border border-primary-navy/20 bg-white text-primary-navy placeholder-primary-navy/40 focus:outline-none focus:border-primary-brown transition-colors resize-none"
          placeholder="Describe your project, special requirements, or questions..."
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full px-8 py-4 bg-primary-navy text-white text-sm font-semibold tracking-wide uppercase hover:bg-primary-navy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Submitting..." : "Submit Quote Request"}
      </button>
    </form>
  );
}