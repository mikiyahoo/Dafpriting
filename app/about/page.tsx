import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Daf Printing",
  description: "Learn about Daf Printing — our mission, vision, and commitment to quality printing services.",
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To deliver exceptional print solutions that help businesses and individuals communicate their message with clarity, creativity, and impact.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the most trusted printing partner in Ethiopia, known for uncompromising quality, reliability, and customer-centric service.",
  },
  {
    icon: Heart,
    title: "Our Commitment",
    description:
      "We are committed to using premium materials, state-of-the-art equipment, and sustainable practices in every project we undertake.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <p className="text-primary-brown text-sm font-medium tracking-[0.2em] uppercase mb-3">
                About Us
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-navy tracking-tight mb-6">
                Crafting Impressions Through Print
              </h1>
              <p className="text-primary-navy/70 text-lg leading-relaxed">
                Daf Printing was founded with a simple mission: to provide premium 
                printing services that elevate brands and bring ideas to life. With 
                years of experience in the printing industry, we understand that 
                every detail matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-8 border border-primary-navy/10"
                >
                  <value.icon className="w-10 h-10 text-primary-brown mb-6" />
                  <h3 className="text-lg font-bold text-primary-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="text-primary-navy/60 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-primary-navy p-10 md:p-16">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-white mb-4">
                Why Choose Daf Printing?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {[
                  "Premium quality materials and finishes",
                  "State-of-the-art printing technology",
                  "Fast turnaround without compromising quality",
                  "Competitive pricing with no hidden fees",
                  "Free consultation and design support",
                  "100% satisfaction guarantee",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary-brown rounded-full mt-2 flex-shrink-0" />
                    <p className="text-secondary-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}