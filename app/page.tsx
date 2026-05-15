import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { ChatWidget } from "@/components/home/ChatWidget";
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
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center bg-primary-navy overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-primary-navy to-muted-navy opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-3xl">
              <p className="text-primary-brown text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Premium Printing Services
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary-white leading-tight mb-6">
                Quality Print That
                <br />
                <span className="text-primary-brown">Makes an Impression</span>
              </h1>
              <p className="text-lg text-secondary-white/70 leading-relaxed mb-10 max-w-xl">
                From business cards to banners, we deliver exceptional print quality
                with fast turnaround times. Get a free quote in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/request-quote"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-brown text-secondary-white text-sm font-semibold tracking-wide uppercase hover:bg-primary-brown/90 transition-colors"
                >
                  Get a Free Quote
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center px-8 py-4 border-2 border-secondary-white/30 text-secondary-white text-sm font-semibold tracking-wide uppercase hover:bg-secondary-white/10 transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Carousel */}
        <CategoryCarousel />

        {/* Services Overview */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary-brown text-sm font-medium tracking-[0.2em] uppercase mb-3">
                What We Offer
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
                Our Printing Services
              </h2>
              <p className="text-primary-navy/60 max-w-2xl mx-auto">
                Comprehensive printing solutions tailored to your needs. 
                We combine premium materials with expert craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group p-8 bg-secondary-white border border-primary-navy/10 hover:border-primary-navy/30 hover:shadow-lg transition-all duration-300"
                >
                  <service.icon className="w-10 h-10 text-primary-brown mb-6" />
                  <h3 className="text-lg font-bold text-primary-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-primary-navy/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary-navy font-medium hover:text-primary-brown transition-colors"
              >
                View All Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <CollectionsGrid />

        {/* CTA */}
        <section className="py-24 bg-primary-navy">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-secondary-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Tell us what you need, and we will provide a free, no-obligation quote within 24 hours.
            </p>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-brown text-secondary-white text-sm font-semibold tracking-wide uppercase hover:bg-primary-brown/90 transition-colors"
            >
              Request a Free Quote
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}