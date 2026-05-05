"use client";

import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function HeaderOverlay() {
  return (
    <header className="bg-transparent">
      <Container>
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/assets/Radiance_Logo_Horizontal.svg"
              alt="Radiance"
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>

          {/* Center: Navigation */}
          <NavMenu variant="light" />

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:block">
              <Button variant="outline-white" size="default">
                Book Your Date
              </Button>
            </Link>
            <MobileMenu variant="light" />
          </div>
        </div>
      </Container>
    </header>
  );
}