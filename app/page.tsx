"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SplitHero from "@/components/home/SplitHero";
import PartnershipSection from "@/components/home/PartnershipSection";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import { ChatWidget } from "@/components/home/ChatWidget";
import { QuoteModal } from "@/components/forms/QuoteModal";
import { ArrowRight } from "lucide-react";
import type { PortfolioItemRecord } from "@/features/portfolio/types";

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [works, setWorks] = useState<PortfolioItemRecord[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setWorks((data.items || []).slice(0, 8));
        }
      } catch {
        // silent
      }
    })();
  }, []);

  return (
    <>
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      <Header />
      <main>
        {/* Split Hero with ad banners + shop by categories */}
        <SplitHero />

        {/* Partnership Section - Attraction + Trusted + CTA */}
        <PartnershipSection />

        {/* Our Works - 8 photos grid */}
        <section className="py-24 bg-gradient-subtle relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Our Works
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Portfolio
                </span>
              </h2>
              <p className="text-textMuted text-lg max-w-2xl mx-auto leading-relaxed">
                A glimpse of projects we have brought to life. Each piece reflects our commitment to quality and craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {works.slice(0, 8).map((item) => (
                <Link
                  key={item.id}
                  href="/portfolio"
                  className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <img
                    src={item.coverImage || "/assets/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/assets/placeholder.svg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <h3 className="text-white font-bold text-sm leading-tight mb-1">{item.title}</h3>
                    {item.clientName && (
                      <p className="text-primary-light text-xs font-medium">for {item.clientName}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                View All Portfolio
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSlider />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}