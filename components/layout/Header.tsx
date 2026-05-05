"use client";

import { useScrollHeader } from "@/hooks/useScrollHeader";
import { HeaderOverlay } from "./HeaderOverlay";
import { HeaderSolid } from "./HeaderSolid";

export function Header() {
  const { isAtTop, scrollDirection } = useScrollHeader(100);

  // Determine which header to show based on scroll position and direction
  const showOverlay = isAtTop;
  const showSolid = !isAtTop && scrollDirection === "up";

  return (
    <>
      {/* Header 1: Overlay - Only visible at top (Hero section) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          showOverlay
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <HeaderOverlay />
      </div>

      {/* Header 2: Solid - Only visible when scrolling up on light sections */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          showSolid
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <HeaderSolid />
      </div>
    </>
  );
}