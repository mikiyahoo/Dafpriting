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
        <section className="pt-32 pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-secondary text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Get a Free Quote
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
                Request a Quote
              </h1>
              <p className="text-primary/60 text-lg">
                Fill out the form below and we'll get back to you within 24 hours with a free, no-obligation quote.
              </p>
            </div>

            <div className="bg-white border border-primary/10 p-8 md:p-10">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
