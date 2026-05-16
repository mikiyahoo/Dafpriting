import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Track Your Order | Daf Printing",
  description: "Track the status of your printing order",
};

export default function TrackOrderPage() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bgPure/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-lg font-black text-textMain">
              <span className="text-secondary">Daf</span> Printing
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-primary transition-colors">About</Link>
              <Link href="/services" className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-primary transition-colors">Services</Link>
              <Link href="/contact" className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 bg-gradient-subtle">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Track
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-textMain mb-4 leading-tight">
              Track Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Order
              </span>
            </h1>
            <p className="text-textMuted text-lg">
              Enter your quote number to check the status of your order.
            </p>
          </div>

          <div className="bg-bgPure rounded-2xl border border-gray-100 shadow-card p-8 md:p-10">
            <form className="space-y-6">
              <div>
                <label htmlFor="quoteNumber" className="block text-sm font-semibold text-textMain mb-2">
                  Quote Number *
                </label>
                <input
                  type="text"
                  id="quoteNumber"
                  required
                  className="w-full px-4 py-3 bg-bgLight border border-gray-200 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. QR-20260512-0001"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-textMain mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 bg-bgLight border border-gray-200 text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-bgPure text-sm font-bold tracking-wide uppercase rounded-full shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search size={16} />
                Track Order
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-textMuted">
              Need help? <Link href="/contact" className="text-primary font-semibold hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-hero text-bgPure">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="border-t border-bgPure/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-bgPure/40">© 2026 Daf Printing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}