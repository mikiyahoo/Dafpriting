"use client";

import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function HeaderSolid() {
  return (
    <header className="bg-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/assets/Radiance_Logo_Horizontal.svg"
              alt="Radiance"
              className="h-8 w-auto"
            />
          </Link>

          {/* Center: Navigation */}
          <NavMenu variant="dark" />

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:block">
              <Button variant="primary" size="default">
                Book Your Date
              </Button>
            </Link>
            <MobileMenu variant="dark" />
          </div>
        </div>
      </Container>
    </header>
  );
}