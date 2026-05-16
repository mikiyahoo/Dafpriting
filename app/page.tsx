"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SplitHero from "@/components/home/SplitHero";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { ChatWidget } from "@/components/home/ChatWidget";
import { QuoteModal } from "@/components/forms/QuoteModal";
import { ArrowRight, Printer, FileText, Image, Shirt, Stamp, Box } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Business Cards",
    description: "Premium quality business cards with various finishes including matte, gloss, and spot UV.",
  },
  {
    icon: Printer,
    title: "Brochures & Flyers",
    description: "Eye-catching marketing materials for your business, from A5 flyers to A4 brochures.",
  },
  {
    icon: Image,
    title: "Banners & Posters",
    description: "Large format printing for indoor and outdoor use, with weather-resistant options.",
  },
  {
    icon: Shirt,
    title: "T-Shirt Printing",
    description: "Custom apparel printing with DTG and screen printing for events and businesses.",
  },
  {
    icon: Stamp,
    title: "Stickers & Labels",
    description: "Custom die-cut stickers, roll labels, and product labels in any shape or size.",
  },
  {
    icon: Box,
    title: "Packaging",
    description: "Custom packaging boxes, product sleeves, and branded packaging solutions.",
  },
];

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <>
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      <Header />
      <main>
        {/* Split Hero with ad banners + shop by categories */}
        <SplitHero />

        {/* Services Overview - Enhanced with modern design */}
        <section className="py-24 bg-gradient-subtle relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                Premium Printing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Services
                </span>
              </h2>
              <p className="text-textMuted text-lg max-w-2xl mx-auto leading-relaxed">
                Comprehensive printing solutions tailored to your needs. 
                We combine premium materials with expert craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="group relative p-8 bg-bgPure rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(0,123,204,0.1), rgba(230,126,0,0.1))', padding: '1px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }}
                  />
                  
                  {/* Icon with gradient background */}
                  <div className="relative w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-black text-textMain mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Arrow indicator on hover */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                View All Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <CollectionsGrid />

        {/* CTA - Enhanced with gradient and modern design */}
        <section className="py-24 bg-gradient-hero relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 40% 80%, white 1px, transparent 1px)',
              backgroundSize: '200px 200px',
              animation: 'float 20s ease-in-out infinite'
            }} />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-highlight rounded-full animate-pulse" />
              Fast Turnaround Available
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-bgPure mb-6 leading-tight">
              Ready to Bring Your{" "}
              <span className="text-highlight">Vision</span> to Life?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Tell us what you need, and we will provide a free, no-obligation quote within 24 hours. 
              Professional quality, competitive prices.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="inline-flex items-center gap-3 px-10 py-5 bg-secondary text-bgPure text-base font-bold tracking-wide rounded-full shadow-2xl hover:bg-secondary/90 hover:-translate-y-1 transition-all duration-300 group"
              >
                Request a Free Quote
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-5 bg-primary/20 text-white text-base font-semibold rounded-full border border-primary/30 hover:bg-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>5-Star Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}