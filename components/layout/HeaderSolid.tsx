"use client";

import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";

export function HeaderSolid() {
  return (
    <header className="bg-secondary-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/Radiance_Logo_Horizontal.svg"
              alt="Radiance"
              className="h-8 w-auto"
            />
          </Link>

          <NavMenu variant="dark" />
          <MobileMenu variant="dark" />
        </div>
      </Container>
    </header>
  );
}