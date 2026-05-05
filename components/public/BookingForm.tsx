"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { bookingFormSchema } from "@/lib/validations";
import { EVENT_TYPE_LABELS, BUDGET_LABELS } from "@/types";
import { Loader2, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

type FormData = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestCount: string;
  budgetRange: string;
  notes: string;
};

const initialFormData: FormData = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  eventType: "",
  eventDate: "",
  location: "",
  guestCount: "",
  budgetRange: "",
  notes: "",
};

interface FormErrors {
  [key: string]: string;
}

const steps = [
  { title: "Personal Info", fields: ["clientName", "clientEmail", "clientPhone"] },
  { title: "Event Details", fields: ["eventType", "eventDate", "location", "guestCount", "budgetRange"] },
  { title: "Notes", fields: ["notes"] },
];

const eventTypes = [
  "WEDDING", "BIRTHDAY", "CORPORATE", "GRADUATION",
  "ENGAGEMENT", "ANNIVERSARY", "CULTURAL", "OTHER",
];

const budgetRanges = [
  "UNDER_50K", "RANGE_50K_100K", "RANGE_100K_200K",
  "RANGE_200K_500K", "ABOVE_500K",
];

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const stepFields = steps[stepIndex].fields;
    const result = bookingFormSchema.safeParse(formData);

    if (result.success) return true;

    const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[] | undefined>;
    const stepErrors: FormErrors = {};

    stepFields.forEach((field) => {
      const fieldErrorsArr = fieldErrors[field];
      if (fieldErrorsArr && fieldErrorsArr.length > 0) {
        stepErrors[field] = fieldErrorsArr[0];
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit booking");
      }

      setIsSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-6"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-radiance-navy mb-3">
          Booking Request Sent!
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Thank you! We've received your event booking request and will get
          back to you within 24 hours.
        </p>
        <a
          href="https://wa.me/254700000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    index < currentStep
                      ? "bg-radiance-navy text-white"
                      : index === currentStep
                      ? "bg-radiance-navy text-white ring-4 ring-radiance-navy/20"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm hidden sm:block",
                    index <= currentStep
                      ? "text-radiance-navy font-medium"
                      : "text-gray-400"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-3",
                    index < currentStep ? "bg-radiance-navy" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="clientName"
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => updateField("clientName", e.target.value)}
                  placeholder="Your full name"
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                    errors.clientName ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-radiance-navy/20 focus:border-radiance-navy"
                  )}
                />
                {errors.clientName && <p className="mt-1 text-sm text-red-500">{errors.clientName}</p>}
              </div>
              <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => updateField("clientEmail", e.target.value)}
                  placeholder="your@email.com"
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                    errors.clientEmail ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-radiance-navy/20 focus:border-radiance-navy"
                  )}
                />
                {errors.clientEmail && <p className="mt-1 text-sm text-red-500">{errors.clientEmail}</p>}
              </div>
              <div>
                <label htmlFor="clientPhone" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="clientPhone"
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => updateField("clientPhone", e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                    errors.clientPhone ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-radiance-navy/20 focus:border-radiance-navy"
                  )}
                />
                {errors.clientPhone && <p className="mt-1 text-sm text-red-500">{errors.clientPhone}</p>}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="eventType"
                  value={formData.eventType}
                  onChange={(e) => updateField("eventType", e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                    errors.eventType ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-radiance-navy/20 focus:border-radiance-navy"
                  )}
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{EVENT_TYPE_LABELS[type]}</option>
                  ))}
                </select>
                {errors.eventType && <p className="mt-1 text-sm text-red-500">{errors.eventType}</p>}
              </div>
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => updateField("eventDate", e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                    errors.eventDate ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-radiance-navy/20 focus:border-radiance-navy"
                  )}
                />
                {errors.eventDate && <p className="mt-1 text-sm text-red-500">{errors.eventDate}</p>}
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Event venue or area"
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                    errors.location ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-radiance-navy/20 focus:border-radiance-navy"
                  )}
                />
                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
              </div>
              <div>
                <label htmlFor="guestCount" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Expected Guests
                </label>
                <input
                  id="guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => updateField("guestCount", e.target.value)}
                  placeholder="Approximate number of guests"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-radiance-navy/20 focus:border-radiance-navy transition-colors"
                />
              </div>
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Budget Range <span className="text-red-500">*</span>
                </label>
                <select
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => updateField("budgetRange", e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                    errors.budgetRange ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-radiance-navy/20 focus:border-radiance-navy"
                  )}
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>{BUDGET_LABELS[range]}</option>
                  ))}
                </select>
                {errors.budgetRange && <p className="mt-1 text-sm text-red-500">{errors.budgetRange}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-radiance-navy mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  rows={6}
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder="Tell us more about your event — theme, special requirements, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-radiance-navy/20 focus:border-radiance-navy transition-colors resize-none"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <div>
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={handlePrev} disabled={isSubmitting}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {submitError && <p className="text-sm text-red-500">{submitError}</p>}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
              ) : (
                "Submit Booking Request"
              )}
            </Button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        Having trouble?{" "}
        <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
          Chat with us on WhatsApp
        </a>
      </p>
    </form>
  );
}