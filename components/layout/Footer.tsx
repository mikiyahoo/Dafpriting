import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary-navy text-secondary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold tracking-tight mb-4">
              <span className="text-primary-brown">Daf</span> Printing
            </h3>
            <p className="text-secondary-white/60 text-sm leading-relaxed max-w-md">
              Premium printing services for businesses and individuals. 
              From business cards to banners, we deliver quality that makes an impression.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-4 text-secondary-white/80">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-white/60 hover:text-secondary-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-4 text-secondary-white/80">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-secondary-white/60">
              <li>info@dafprinting.com</li>
              <li>+251 911 234 567</li>
              <li>Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-white/40">
            &copy; {new Date().getFullYear()} Daf Printing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}