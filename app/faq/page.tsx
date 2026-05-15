import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "FAQ | Daf Printing" };

const faqs = [
  { q: "What file formats do you accept?", a: "We accept AI, PSD, PDF, EPS, CDR, INDD, TIFF, JPEG, and PNG. For best results, we recommend high-resolution PDF or AI files with embedded fonts and images." },
  { q: "How long does printing take?", a: "Turnaround time depends on the project scope. Typically, standard orders take 2-5 business days. Rush orders can be completed within 24-48 hours at an additional cost." },
  { q: "Do you offer design services?", a: "Yes! Our in-house design team can help with layout, branding, and artwork preparation. We offer custom design services starting from KES 3,000 per project." },
  { q: "What is your minimum order quantity?", a: "There is no minimum order for most products. We handle everything from single prints to bulk orders. However, bulk discounts apply for quantities above 100 units." },
  { q: "Can I see a sample before full production?", a: "Absolutely. We offer physical samples and digital proofs before full production. A sample fee may apply, which is refundable upon placing the full order." },
  { q: "Do you offer delivery services?", a: "Yes, we deliver within Nairobi and across Kenya. Delivery within Nairobi CBD takes 1-2 business days, while upcountry delivery takes 3-5 business days." },
  { q: "How can I request a quote?", a: "You can use our online quote request form, call us directly, or send an email with your project details. We typically respond within 2-4 hours during business hours." },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
              Everything you need to know about our printing services and processes.
            </p>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 text-gray-900 font-medium cursor-pointer list-none hover:bg-gray-100 transition-colors">
                    {faq.q}
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}