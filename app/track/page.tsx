import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Track Your Order | Daf Printing",
  description: "Track the status of your printing order",
};

export default function TrackOrderPage() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bgPure/95 backdrop-blur-sm border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-black tracking-tight text-textMain">
              <span className="text-secondary">Daf</span> Printing
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-textMain transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-textMain transition-colors">About</Link>
              <Link href="/services" className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-textMain transition-colors">Services</Link>
              <Link href="/contact" className="text-sm font-medium tracking-wide uppercase text-textMuted hover:text-textMain transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-4">Track Your Order</h1>
            <p className="text-textMuted text-lg">
              Enter your quote number to check the status of your order.
            </p>
          </div>

          <div className="bg-bgPure border border-primary/10 p-8 md:p-10">
            <form className="space-y-6">
              <div>
                <label htmlFor="quoteNumber" className="block text-sm font-medium text-textMain mb-1">
                  Quote Number *
                </label>
                <input
                  type="text"
                  id="quoteNumber"
                  required
                  className="w-full px-4 py-3 border border-primary/20 bg-bgPure text-textMain placeholder-textMuted focus:outline-none focus:border-secondary transition-colors"
                  placeholder="e.g. QR-20260512-0001"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-textMain mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-primary/20 bg-bgPure text-textMain placeholder-textMuted focus:outline-none focus:border-secondary transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-bgPure text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors"
              >
                Track Order
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-textMuted">
              Need help? <Link href="/contact" className="text-secondary hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-bgPure">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="border-t border-bgPure/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-bgPure/40">© 2026 Daf Printing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}