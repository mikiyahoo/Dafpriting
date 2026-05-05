"use client";

import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";

export function HeaderOverlay() {
  return (
    <header className="bg-transparent">
      <Container>
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/Radiance_Logo_Horizontal.svg"
              alt="Radiance"
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>

          <NavMenu variant="light" />
          <MobileMenu variant="light" />
        </div>
      </Container>
    </header>
  );
}