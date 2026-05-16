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
        <section className="pt-32 pb-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                Crafting Impressions{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Through Print
                </span>
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                Daf Printing was founded with a simple mission: to provide premium 
                printing services that elevate brands and bring ideas to life. With 
                years of experience in the printing industry, we understand that 
                every detail matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="group p-8 bg-bgPure rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-textMain mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-hero rounded-3xl p-10 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                  backgroundSize: '200px 200px'
                }} />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-bgPure mb-4">
                  Why Choose Daf Printing?
                </h2>
                <p className="text-bgPure/80 mb-8 max-w-2xl">
                  We combine premium materials with expert craftsmanship to deliver exceptional results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Premium quality materials and finishes",
                    "State-of-the-art printing technology",
                    "Fast turnaround without compromising quality",
                    "Competitive pricing with no hidden fees",
                    "Free consultation and design support",
                    "100% satisfaction guarantee",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-highlight rounded-full mt-2 flex-shrink-0" />
                      <p className="text-bgPure/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}