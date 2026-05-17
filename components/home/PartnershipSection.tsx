"use client";

import { useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [
  { id: 1, name: "Marketing & Promotional Material" },
  { id: 2, name: "Corporate Stationery & Branding" },
  { id: 3, name: "Business Forms & Transactional Print" },
  { id: 4, name: "Books, Manuals & Documents" },
  { id: 5, name: "Signage & Displays" },
  { id: 6, name: "Events & Seasonal Print" },
  { id: 7, name: "Creative & Finishing Services" },
];

const trustedCompanies = [
  "Ethio Telecom", "Dashen Bank", "Habesha Brewery",
  "Ethiopian Airlines", "Sheger FM", "Zemen Bank",
  "Addis Ababa Uni.", "Kality Logistics",
];

export default function PartnershipSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setErrors([]);
  };

  const validateStep1 = () => {
    const errs: string[] = [];
    if (!contactName.trim()) errs.push("Contact person name is required");
    if (!phone.trim()) errs.push("Phone number is required");
    if (!company.trim()) errs.push("Company name is required");
    setErrors(errs);
    return errs.length === 0;
  };

  const goToStep2 = () => {
    if (!validateStep1()) return;
    setStep(2);
  };

  const goToStep1 = () => {
    setStep(1);
    setErrors([]);
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      setErrors(["Please select at least one service category"]);
      return;
    }
    setSubmitting(true);
    setErrors([]);

    const serviceNames = selectedCategories
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    try {
      const res = await fetch("/api/partnerships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName: contactName.trim(),
          phone: phone.trim(),
          company: company.trim(),
          services: serviceNames,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setModalOpen(false);
      resetForm();
      alert("✅ Partnership request sent!\n\nDAF Printing team will reach out shortly.");
    } catch {
      setErrors(["Failed to submit. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setContactName("");
    setPhone("");
    setCompany("");
    setSelectedCategories([]);
    setErrors([]);
  };

  return (
    <>
      {/* ============ ATTRACTION SECTION ============ */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Why Partner With Us
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-textMain mb-5 leading-tight">
              The Preferred Print Partner for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Addis Ababa&rsquo;s</span>{" "}
              Leading Brands
            </h2>
            <p className="text-textMuted text-lg leading-relaxed max-w-2xl mx-auto">
              Whether you are scaling your business, running a nationwide marketing campaign, or managing daily corporate operations, <strong>DAF Printing</strong> delivers premium, high-fidelity print solutions that balance flawless quality with competitive, business-friendly pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
            {/* Card 1 */}
            <div className="group p-8 bg-bgPure rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 mb-6 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-textMain mb-4">Uncompromised Premium Quality</h3>
              <p className="text-textMuted text-sm leading-relaxed">From crisp corporate manuals to vibrant wide-format marketing materials, we utilize state-of-the-art technology to guarantee technical precision and color accuracy every single time.</p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 bg-bgPure rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 mb-6 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0-.75A2.25 2.25 0 016 2.25h13.5A2.25 2.25 0 0121 4.5v12a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V4.5m0 12.75l2.25-1.5 2.25 1.5 2.25-1.5 2.25 1.5V4.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v11.25m-10.5-6h3.9m-3.9 3h3.9M15 7.5h.008v.008H15V7.5zm0 3h.008v.008H15v-.008zm0 3h.008v.008H15v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-textMain mb-4">Affordable, Value-Driven Pricing</h3>
              <p className="text-textMuted text-sm leading-relaxed">Premium results shouldn&rsquo;t come with a prohibitive price tag. We offer highly competitive corporate rates, optimizing your production costs without cutting corners on materials.</p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 bg-bgPure rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 mb-6 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-textMain mb-4">Corporate Contracts & Credits</h3>
              <p className="text-textMuted text-sm leading-relaxed">We specialize in long-term B2B partnerships. Enjoy dedicated account handling, priority production queuing, flexible bulk pricing schedules, and seamless delivery timelines.</p>
            </div>
          </div>

          {/* Trusted Companies */}
          <div className="text-center mb-8">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-textMuted">✦ Companies that trust us ✦</span>
          </div>
          <div className="relative overflow-hidden w-full">
            <div
              className="flex gap-10 animate-scroll-logos"
              style={{
                width: "max-content",
                maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              {[...trustedCompanies, ...trustedCompanies].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 h-12 flex items-center justify-center bg-white/50 px-6 rounded-full shadow-sm text-sm font-bold text-textMuted tracking-tight whitespace-nowrap"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="pb-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-textMain text-bgPure p-10 md:p-14 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-black leading-tight mb-4">
                Let&rsquo;s Build a Seamless Print Partnership
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Looking for a reliable print partner to handle your company&rsquo;s ongoing print, branding, or stationery needs? Let&rsquo;s establish a long-term agreement that guarantees top-tier quality and unmatched corporate rates.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto min-w-[240px]">
              <button
                onClick={() => { resetForm(); setModalOpen(true); }}
                className="w-full px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 text-center animate-blink-cta"
              >
                ✨ Request Partnership ✨
              </button>
              <a
                href="tel:+251930077432"
                className="w-full px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 text-center"
              >
                Call: +251 930 077432
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MODAL ============ */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) { setModalOpen(false); resetForm(); } }}
        >
          <div className="bg-bgPure w-[90%] max-w-lg rounded-3xl shadow-2xl overflow-hidden transform scale-100 transition-transform">
            {/* Header */}
            <div className="px-7 pt-6 pb-3 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-2xl font-black bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Partner with DAF
              </h3>
              <button
                onClick={() => { setModalOpen(false); resetForm(); }}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Progress */}
            <div className="px-7 pt-3 pb-1">
              <div className="h-1.5 bg-gray-200 rounded-full">
                <div
                  className="h-1.5 bg-primary rounded-full transition-all duration-300"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
              <div className="text-xs font-semibold text-primary text-right mt-1">
                Step {step} of 2: {step === 1 ? "Your details" : "Print services"}
              </div>
            </div>

            {/* Body */}
            <div className="px-7 py-5 max-h-[55vh] overflow-y-auto">
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-textMain mb-1.5">Contact Person Name *</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-textMain mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 XX XXX XXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-textMain mb-1.5">Company Name *</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your organization"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-sm font-semibold text-textMain mb-4">Select your printing interests:</p>
                  <div className="flex flex-wrap gap-2.5">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          selectedCategories.includes(cat.id)
                            ? "bg-primary text-white shadow-md shadow-primary/20 scale-98"
                            : "bg-gray-100 text-textMain hover:bg-gray-200"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Errors */}
              {errors.length > 0 && (
                <div className="mt-4 text-xs text-red-600 font-medium space-y-1">
                  {errors.map((err, i) => (
                    <p key={i}>{err}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-7 py-5 border-t border-gray-100 flex items-center gap-3">
              {step === 1 ? (
                <button
                  onClick={goToStep2}
                  className="ml-auto px-6 py-2.5 bg-primary text-white font-bold rounded-full text-sm hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  Continue →
                </button>
              ) : (
                <>
                  <button
                    onClick={goToStep1}
                    className="px-5 py-2.5 bg-gray-100 text-textMain font-semibold rounded-full text-sm hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="ml-auto px-6 py-2.5 bg-emerald-500 text-white font-bold rounded-full text-sm hover:bg-emerald-600 hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                  >
                    {submitting ? "Sending..." : "Send Request"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blink-cta {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,102,204,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(0,102,204,0.15); }
        }
        .animate-blink-cta {
          animation: blink-cta 1.2s infinite ease;
        }
        .animate-blink-cta:hover {
          animation: none;
        }
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-logos {
          animation: scrollLogos 28s linear infinite;
        }
        .animate-scroll-logos:hover {
          animation-play-state: paused;
        }
        .scale-98:active {
          transform: scale(0.96);
        }
      `}</style>
    </>
  );
}