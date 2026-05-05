"use client";

import { useScrollHeader } from "@/hooks/useScrollHeader";
import { HeaderOverlay } from "./HeaderOverlay";
import { HeaderSolid } from "./HeaderSolid";

export function Header() {
  const { isAtTop } = useScrollHeader(80);

  return (
    <>
      {/* Header 1: Overlay - Only visible at top (Hero section) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isAtTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <HeaderOverlay />
      </div>

      {/* Header 2: Solid - Visible when scrolled down, stays on scroll up */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          !isAtTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <HeaderSolid />
      </div>
    </>
  );
}