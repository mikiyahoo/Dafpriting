"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Target, Eye, Heart } from "lucide-react";

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

const clientLogoFiles = [
  "ASMAM Coatings_Logo.webp",
  "BMET Energy Telecom Industry & Trade_Logo.webp",
  "BOSS Paints_Logo.webp",
  "Ethiopian National Theatre_Logo.webp",
  "Ethiopian Road Adminstration_Logo.webp",
  "FDRE Ministry of Education_Logo.webp",
  "Harmony Hotel_Logo.webp",
  "Jupiter Hotel_Logo.webp",
  "Kerchanish Trading_Logo.webp",
  "Marda Qartz_Logo.webp",
  "Ministry of Health Ethiopia_Logo.webp",
  "Ministry of Urban & Inf._Logo.webp",
  "MTSONS Trading_Logo.webp",
  "Oromia Land Bureau_Logo.webp",
  "Oromia Urban Development & Housing Bureau _Logo.webp",
  "Rhino Cable_Logo.webp",
];

const trustedCompanies = clientLogoFiles.map((file) => file.replace(/_Logo\.webp$/, "").replace(/_/g, " "));

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
                D.A.F Printing was founded with a simple mission: to provide premium 
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
                Why Choose D.A.F Printing?
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

        {/* Companies that trust us */}
        <section className="py-24 bg-bgLight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-textMuted">✦ Companies that trust us ✦</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {clientLogoFiles.map((file, i) => (
                <div
                  key={file}
                  className="group perspective"
                >
                  <div className="flip-card-inner relative w-full h-24 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front face - logo */}
                    <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 p-4 [backface-visibility:hidden]">
                      <Image
                        src={`/assets/Clients/${file}`}
                        alt={trustedCompanies[i]}
                        width={140}
                        height={56}
                        className="logo-grayscale h-14 w-auto object-contain"
                      />
                    </div>
                    {/* Back face - company name */}
                    <div className="absolute inset-0 flex items-center justify-center bg-primary rounded-xl shadow-sm p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span className="text-white text-sm font-bold text-center leading-tight">
                        {trustedCompanies[i]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Let's Build a Seamless Print Partnership CTA */}
        <section className="pb-24 bg-bgLight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-textMain text-bgPure p-10 md:p-14 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-4xl font-black leading-tight mb-4">
                  Let&rsquo;s Build a Seamless Print Partnership
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Looking for a reliable print partner to handle your company&rsquo;s ongoing print, branding, or stationery needs? Let&rsquo;s establish a long-term agreement that guarantees top-tier quality and unmatched corporate rates.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[240px]">
                <a
                  href="/request-quote"
                  className="w-full px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 text-center"
                >
                  ✨ Get a Free Quote ✨
                </a>
                <a
                  href="tel:+251930077432"
                  className="w-full px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 text-center"
                >
                  Call: +251 930 077432
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .logo-grayscale {
          filter: grayscale(100%);
          transition: all 300ms ease-in-out;
        }
        .group:hover .logo-grayscale {
          filter: grayscale(0%);
        }
        .perspective {
          perspective: 800px;
        }
      `}</style>
    </>
  );
}