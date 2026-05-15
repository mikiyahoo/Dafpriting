import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Printer, FileText, Image, Shirt, Stamp, Box, 
  BookOpen, Tag, Building, Shapes, Megaphone 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Daf Printing",
  description: "Explore our comprehensive printing services — from business cards to banners and everything in between.",
};

const serviceCategories = [
  {
    title: "Business Stationery",
    slug: "business-stationery",
    icon: FileText,
    description: "Professional business cards, letterheads, envelopes, and notepads that represent your brand with distinction.",
    items: ["Business Cards", "Letterheads", "Envelopes", "Notepads", "Compliment Slips"],
  },
  {
    title: "Marketing Materials",
    slug: "marketing-materials",
    icon: Megaphone,
    description: "Eye-catching brochures, flyers, catalogs, and posters to promote your products and services.",
    items: ["Brochures", "Flyers", "Catalogs", "Posters", "Door Hangers"],
  },
  {
    title: "Large Format Printing",
    slug: "large-format",
    icon: Image,
    description: "High-impact banners, roll-ups, signage, and displays for indoor and outdoor use.",
    items: ["Banners", "Roll-up Banners", "Signage", "Billboards", "Window Graphics"],
  },
  {
    title: "Apparel Printing",
    slug: "apparel-printing",
    icon: Shirt,
    description: "Custom t-shirts, hoodies, and uniforms with DTG, screen printing, or heat transfer.",
    items: ["T-Shirts", "Hoodies", "Polos", "Uniforms", "Caps"],
  },
  {
    title: "Labels & Stickers",
    slug: "labels-stickers",
    icon: Stamp,
    description: "Custom die-cut stickers, roll labels, and product labels in various materials and finishes.",
    items: ["Product Labels", "Stickers", "Roll Labels", "Bumper Stickers", "Seals"],
  },
  {
    title: "Packaging Solutions",
    slug: "packaging",
    icon: Box,
    description: "Custom boxes, sleeves, and packaging materials that enhance your product presentation.",
    items: ["Gift Boxes", "Product Boxes", "Sleeves", "Bags", "Rigid Boxes"],
  },
  {
    title: "Books & Publications",
    slug: "books-publications",
    icon: BookOpen,
    description: "Professional book printing, magazines, catalogs, and bound documents.",
    items: ["Books", "Magazines", "Catalogs", "Brochures", "Manuals"],
  },
  {
    title: "Event Materials",
    slug: "event-materials",
    icon: Building,
    description: "Invitations, programs, menus, place cards, and all your event stationery needs.",
    items: ["Invitations", "Programs", "Menus", "Tickets", "Name Badges"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <p className="text-primary-brown text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Our Services
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-navy tracking-tight mb-6">
                Comprehensive Printing Services
              </h1>
              <p className="text-primary-navy/70 text-lg leading-relaxed">
                From business essentials to large format displays, we offer a complete 
                range of printing services tailored to your needs.
              </p>
            </div>

            <div className="space-y-12">
              {serviceCategories.map((cat, index) => (
                <div
                  key={cat.slug}
                  className="group p-8 md:p-10 border border-primary-navy/10 hover:border-primary-navy/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <cat.icon className="w-10 h-10 text-primary-brown" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-primary-navy mb-3">
                        {cat.title}
                      </h2>
                      <p className="text-primary-navy/60 text-sm leading-relaxed mb-6 max-w-2xl">
                        {cat.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {cat.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs font-medium uppercase tracking-wide text-primary-navy/70 bg-primary-navy/5 px-3 py-2 text-center"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/services/${cat.slug}`}
                        className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary-brown hover:text-primary-navy transition-colors"
                      >
                        Learn More &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}