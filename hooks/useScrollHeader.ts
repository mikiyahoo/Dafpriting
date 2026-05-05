"use client";

import { useState, useEffect, useRef } from "react";

export interface ScrollHeaderState {
  isScrolled: boolean;
  scrollDirection: "up" | "down" | null;
  isAtTop: boolean;
}

export function useScrollHeader(threshold: number = 50): ScrollHeaderState {
  const [state, setState] = useState<ScrollHeaderState>({
    isScrolled: false,
    scrollDirection: null,
    isAtTop: true,
  });
  
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY < threshold;
      const scrollDirection =
        currentScrollY > lastScrollY.current ? "down" : "up";

      setState({
        isScrolled: currentScrollY > threshold,
        scrollDirection,
        isAtTop,
      });

      lastScrollY.current = currentScrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return state;
}