"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ArrowRight, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bgPure/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/assets/daf-logo.png" 
              alt="Daf Printing Logo" 
              width={40} 
              height={40}
              priority
            />
            <span className="text-lg font-black text-textMain">Daf Printing</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-dark to-primary text-bgPure text-sm font-semibold tracking-wide rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Request Quote
              <ArrowRight size={16} />
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-textMain"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-textMain/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-bgPure shadow-2xl overflow-y-auto z-50">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/assets/daf-logo.png" 
                    alt="Daf Printing Logo" 
                    width={32} 
                    height={32}
                  />
                  <span className="text-base font-black text-textMain">Daf Printing</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-textMuted hover:text-textMain transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-4 text-base font-semibold text-textMain hover:bg-bgLight hover:text-primary rounded-xl transition-all duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/request-quote"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-primary-dark to-primary text-bgPure text-base font-bold tracking-wide rounded-xl hover:shadow-lg transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  Request a Free Quote
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-4">
                  Contact Us
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+251930077432"
                    className="flex items-center gap-3 text-sm text-textMuted hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Phone size={16} />
                    <span>+251 930 077432</span>
                  </a>
                  <a
                    href="mailto:dafprinting@gmail.com"
                    className="flex items-center gap-3 text-sm text-textMuted hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Mail size={16} />
                    <span>dafprinting@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Social/Telegram */}
              <div className="mt-6">
                <a
                  href="https://t.me/DAFPRINTING"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] font-semibold rounded-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Chat on Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}