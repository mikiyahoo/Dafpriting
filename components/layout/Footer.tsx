import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react";

export function Footer() {
  const contactInfo = {
    email: "dafprinting@gmail.com",
    phones: [
      { label: "Mob.", number: "+251 930 077432" },
      { label: "Mob.", number: "+251 911 25 7669" },
      { label: "Mob.", number: "+251 911 25 7668" },
      { label: "Tel.", number: "+251 115 57 52 07" },
    ],
    locations: [
      {
        name: "ሰንትራል ነጋዴዎች",
        address: "2ኛ ፎቅ ቢሮ ቁ. 0039",
      },
      {
        name: "ፒያሳ ሁናን ሕንፃ",
        address: "3ኛ ፎቅ ቢሮ ቁ. 310",
      },
    ],
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Works", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <footer className="bg-textMain text-bgPure relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image 
                src="/assets/daf-logo.png" 
                alt="Daf Printing Logo" 
                width={40} 
                height={40}
              />
              <span className="text-2xl font-black tracking-tight">
                <span className="text-secondary">D.A.F</span> Printing
              </span>
            </Link>
            <p className="text-bgPure/60 text-sm leading-relaxed max-w-xs">
              Premium printing services for businesses and individuals. 
              From business cards to banners, we deliver quality that makes an impression.
            </p>
            
            {/* Telegram Link */}
            <a
              href="https://t.me/DAFPRINTING"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-[#229ED9]/20 hover:bg-[#229ED9]/30 rounded-full text-sm font-semibold transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              @DAFPRINTING
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-5 text-bgPure/70">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-bgPure/60 hover:text-secondary transition-all duration-200"
                  >
                    <ArrowRight className="w-3 h-3 text-secondary flex-shrink-0" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-5 text-bgPure/70">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {/* Email */}
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 text-sm text-bgPure/60 hover:text-secondary transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary group-hover:scale-110 transition-transform" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>

              {/* Phones */}
              {contactInfo.phones.map((phone, i) => (
                <li key={i}>
                  <a
                    href={`tel:${phone.number.replace(/\s/g, "")}`}
                    className="flex items-start gap-3 text-sm text-bgPure/60 hover:text-secondary transition-colors group"
                  >
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary group-hover:scale-110 transition-transform" />
                    <span>
                      <span className="text-bgPure/40">{phone.label} </span>
                      {phone.number}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-5 text-bgPure/70">
              Our Locations
            </h4>
            <ul className="space-y-4">
              {contactInfo.locations.map((location, i) => (
                <li key={i}>
                  <div className="flex items-start gap-3 text-sm text-bgPure/60">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                    <div>
                      <p className="font-semibold text-bgPure/80">{location.name}</p>
                      <p className="text-bgPure/50">{location.address}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bgPure/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-bgPure/40">
            © {new Date().getFullYear()} D.A.F Printing PLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm text-bgPure/40 hover:text-bgPure transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-bgPure/40 hover:text-bgPure transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}