import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote | Daf Printing",
  description: "Get a free, no-obligation quote for your printing project. Fill out the form and we'll respond within 24 hours.",
};

export default function RequestQuotePage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24 bg-gradient-subtle">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Get a Free Quote
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-textMain mb-4 leading-tight">
                Request a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Quote
                </span>
              </h1>
              <p className="text-textMuted text-lg">
                Fill out the form below and we'll get back to you within 24 hours with a free, no-obligation quote.
              </p>
            </div>

            <div className="bg-bgPure rounded-2xl border border-gray-100 shadow-card p-8 md:p-10">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
