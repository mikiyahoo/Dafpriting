import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-primary-navy py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="flex items-center">
              <img
                src="/assets/Radiance_Logo_Horizontal.svg"
                alt="Radiance"
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-secondary-white/70 text-sm leading-relaxed">
              Crafting extraordinary events that leave lasting impressions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-wide uppercase text-secondary-white mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {["About", "Services", "Experiences", "Insights", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-secondary-white/70 text-sm hover:text-secondary-white transition-colors"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-medium tracking-wide uppercase text-secondary-white mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-secondary-white/70 text-sm">
              <p>hello@radiance.events</p>
              <p>+1 (555) 123-4567</p>
              <p>New York, NY</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-secondary-white/10">
          <p className="text-secondary-white/50 text-xs text-center">
            &copy; {new Date().getFullYear()} Radiance Events. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
