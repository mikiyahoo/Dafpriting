import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Printer, FileText, Image, Shirt, Stamp, Box, 
  BookOpen, Megaphone 
} from "lucide-react";
import { ArrowRight } from "lucide-react";

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
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                Comprehensive Printing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Services
                </span>
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                From business essentials to large format displays, we offer a complete 
                range of printing services tailored to your needs.
              </p>
            </div>

            <div className="space-y-12">
              {serviceCategories.map((cat, index) => (
                <div
                  key={cat.slug}
                  className="group relative p-8 md:p-10 bg-bgPure rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <cat.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-black text-textMain mb-3 group-hover:text-primary transition-colors">
                        {cat.title}
                      </h2>
                      <p className="text-textMuted text-sm leading-relaxed mb-6 max-w-2xl">
                        {cat.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {cat.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs font-medium uppercase tracking-wide text-textMuted bg-bgLight px-3 py-2 text-center rounded-lg"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/services/${cat.slug}`}
                        className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:text-secondary transition-colors"
                      >
                        Learn More
                        <ArrowRight size={16} />
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
