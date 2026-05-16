"use client";

import { useActionState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
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

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(
    submitQuoteRequest,
    initialState
  );

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            Request a Free Quote
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Tell us what you need and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {state.success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Quote Request Submitted!
              </h3>
              <p className="text-gray-600 mb-2">
                Your quote number is:{" "}
                <span className="font-bold text-amber-600">
                  {state.quoteNumber}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                We'll review your request and get back to you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              {state.error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {state.error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modal-phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="+251 911 234 567"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    id="modal-company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="modal-serviceId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service Type *
                </label>
                <select
                  id="modal-serviceId"
                  name="serviceId"
                  required
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                >
                  <option value="">Select a service</option>
                  {defaultServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="modal-quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="modal-quantity"
                    name="quantity"
                    min="1"
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-size"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Size *
                  </label>
                  <select
                    id="modal-size"
                    name="size"
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
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
                  <label
                    htmlFor="modal-material"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Material *
                  </label>
                  <select
                    id="modal-material"
                    name="material"
                    required
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
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
                <label
                  htmlFor="modal-notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Notes (optional)
                </label>
                <textarea
                  id="modal-notes"
                  name="notes"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                  placeholder="Describe your project, special requirements, or questions..."
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {pending ? "Submitting..." : "Submit Quote Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}