"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface CustomCursorProps {
  isVisible: boolean;
}

export function CustomCursor({ isVisible }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const [opacity, setOpacity] = useState(0);

  // LERP (Linear Interpolation) for smooth movement
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  // Animation loop for smooth cursor movement
  const animate = useCallback(() => {
    if (!cursorRef.current) return;

    // Lerp factor controls the "lag" - lower = smoother/slower
    const lerpFactor = 0.12;

    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, lerpFactor);
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, lerpFactor);

    cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;

    rafId.current = requestAnimationFrame(animate);
  }, []); // Empty deps because animate doesn't depend on any props or state

  // Track mouse position and start animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [animate]); // Now animate is in the dependency array

  // Handle visibility with smooth transition
  useEffect(() => {
    // Use requestAnimationFrame to ensure the transition happens after render
    const id = requestAnimationFrame(() => {
      setOpacity(isVisible ? 1 : 0);
    });
    return () => cancelAnimationFrame(id);
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        width: "48px",
        height: "48px",
        opacity: opacity,
        transition: "opacity 0.3s ease-in-out",
        willChange: "transform, opacity",
      }}
    >
      <img
        src="/assets/Radiance Star Icon_color.svg"
        alt="Cursor"
        className="w-full h-full object-contain"
        style={{
          filter: "drop-shadow(0 4px 8px rgba(191, 143, 58, 0.3))",
        }}
      />
    </div>
  );
}
