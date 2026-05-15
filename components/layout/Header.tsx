"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary-white/95 backdrop-blur-sm border-b border-primary-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary-navy">
            <span className="text-primary-brown">Daf</span> Printing
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase text-primary-navy/70 hover:text-primary-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-quote"
              className="inline-flex items-center px-5 py-2.5 bg-primary-navy text-secondary-white text-sm font-medium tracking-wide uppercase hover:bg-primary-navy/90 transition-colors"
            >
              Request Quote
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-primary-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-primary-navy/10 bg-secondary-white">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium tracking-wide uppercase text-primary-navy/70 hover:text-primary-navy py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-quote"
              className="block text-center px-5 py-3 bg-primary-navy text-secondary-white text-sm font-medium tracking-wide uppercase mt-4"
              onClick={() => setMobileOpen(false)}
            >
              Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}