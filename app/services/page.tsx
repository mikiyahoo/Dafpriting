import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Sun, Shirt, BookOpen, Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Daf Printing",
  description:
    "Premium Design and Printing Service in Addis Ababa — UV Printing, DTF, Offset & Screen Printing.",
};

const services = [
  {
    title: "UV Printing Services",
    slug: "uv-printing",
    icon: Sun,
    description:
      "Our state-of-the-art UV printing technology, makes us the preferred choice for businesses looking to make a visual impact. Elevate your prints with our UV Printing Service and let your ideas shine.",
  },
  {
    title: "DTF Printing Service",
    slug: "dtf-printing",
    icon: Shirt,
    description:
      "We've embraced DTF printing technology to offer you a cutting-edge solution for all your customization needs. Our commitment to quality and innovation ensures that your prints stand out.",
  },
  {
    title: "Offset Printing",
    slug: "offset-printing",
    icon: BookOpen,
    description:
      "Whether you're a business in need of marketing or an author publishing your masterpiece, our offset printing services guarantee excellence at every print.",
  },
  {
    title: "Screen Printing",
    slug: "screen-printing",
    icon: Palette,
    description:
      "We merge artistic flair with technical precision. Our team of screen printing experts ensures every print is a testament to quality and craftsmanship.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* ───── Hero Section ───── */}
        <section className="pt-32 pb-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Services
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                Premium Design and Printing Service{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  in Addis Ababa
                </span>
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                We take pride in our dedication to excellence and commitment to
                delivering top-notch printing solutions and be the Best Printing
                Company.
              </p>
            </div>

            {/* ───── 2‑Column Service Grid ───── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((svc, index) => (
                <div
                  key={svc.slug}
                  className="group relative p-8 md:p-10 bg-bgPure rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col gap-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svc.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-textMain mb-3 group-hover:text-primary transition-colors">
                        {svc.title}
                      </h2>
                      <p className="text-textMuted text-sm leading-relaxed mb-6">
                        {svc.description}
                      </p>
                      <Link
                        href={`/services/${svc.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
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