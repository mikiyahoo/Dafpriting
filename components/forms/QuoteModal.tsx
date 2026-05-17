"use client";

import { useActionState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { submitQuoteRequest } from "@/actions/submit-quote";
import { useI18n } from "@/lib/i18n";

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
  { id: "business-cards", titleKey: "quote.service.businessCards" },
  { id: "brochures-flyers", titleKey: "quote.service.brochuresFlyers" },
  { id: "banners-posters", titleKey: "quote.service.bannersPosters" },
  { id: "t-shirts", titleKey: "quote.service.tshirts" },
  { id: "stickers-labels", titleKey: "quote.service.stickersLabels" },
  { id: "packaging", titleKey: "quote.service.packaging" },
  { id: "other", titleKey: "quote.service.other" },
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
  const { t } = useI18n();
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.35)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-800"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-br from-sky-50 via-white to-orange-50 px-6 pb-5 pt-6">
          <div className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
            {t("quote.projectBadge")}
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            {t("quote.title")}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {t("quote.subtitle")}
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
                {t("quote.submitted")}
              </h3>
              <p className="text-gray-600 mb-2">
                {t("quote.number")}{" "}
                <span className="font-bold text-amber-600">
                  {state.quoteNumber}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                {t("quote.response")}
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                {t("quote.close")}
              </button>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              {state.error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {state.error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("quote.name")}
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    placeholder={t("quote.placeholder.name")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("quote.email")}
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    placeholder={t("quote.placeholder.email")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modal-phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("quote.phone")}
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    placeholder={t("quote.placeholder.phone")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("quote.company")}
                  </label>
                  <input
                    type="text"
                    id="modal-company"
                    name="company"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    placeholder={t("quote.placeholder.company")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="modal-serviceId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("quote.serviceType")}
                </label>
                <select
                  id="modal-serviceId"
                  name="serviceId"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                >
                  <option value="">{t("quote.selectService")}</option>
                  {defaultServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {t(s.titleKey)}
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
                    {t("quote.quantity")}
                  </label>
                  <input
                    type="number"
                    id="modal-quantity"
                    name="quantity"
                    min="1"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    placeholder={t("quote.placeholder.quantity")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-size"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("quote.size")}
                  </label>
                  <select
                    id="modal-size"
                    name="size"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="">{t("quote.selectSize")}</option>
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
                    {t("quote.material")}
                  </label>
                  <select
                    id="modal-material"
                    name="material"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="">{t("quote.selectMaterial")}</option>
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
                  {t("quote.notes")}
                </label>
                <textarea
                  id="modal-notes"
                  name="notes"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  placeholder={t("quote.placeholder.notes")}
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-xl bg-gradient-to-r from-secondary to-secondary-light px-8 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(230,126,0,0.24)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(230,126,0,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pending ? t("quote.submitting") : t("quote.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
