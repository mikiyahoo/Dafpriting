"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CursorFollowerProps {
  /**
   * SVG icon to use. Defaults to the Radiance star icon.
   */
  iconSrc?: string;
  /**
   * Selector of the element to watch for scroll visibility. If provided, the cursor will be hidden when this element is not in view.
   */
  triggerElement?: string;
  /**
   * Whether to hide the cursor on mobile (screen width < 640px). Defaults to true.
   */
  disableOnMobile?: boolean;
}

export const CursorFollower: React.FC<CursorFollowerProps> = ({
  iconSrc = '/assets/Radiance Star Icon_color.svg',
  triggerElement,
  disableOnMobile = true,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // Update windowWidth on resize and on initial mount (client-only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    // Set initial width
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Compute isEnabled based on windowWidth and disableOnMobile
  const isEnabled = !(disableOnMobile && windowWidth < 640);

  // Set up or tear down the cursor follower based on isEnabled
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    // Hide default cursor
    const bodyStyle = window.getComputedStyle(document.body);
    const originalCursor = bodyStyle.cursor;
    document.body.style.cursor = 'none';

    // State for mouse position
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Update target position on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // GSAP ticker for smooth lag effect
    const lerp = 0.1; // 10% of the distance per frame
    const ticker = () => {
      // Linear interpolation
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;
      gsap.set(cursorRef.current, { x: currentX, y: currentY });
    };

    gsap.ticker.add(ticker);

    // ScrollTrigger logic to hide/show cursor based on element visibility
    let scrollTriggerInstance: ScrollTrigger | null = null;
    if (triggerElement) {
      const triggerElem = document.querySelector(triggerElement);
      if (triggerElem) {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: triggerElem,
          start: 'top 80%', // when top of trigger hits 80% from top of viewport
          end: 'bottom 20%', // when bottom of trigger hits 20% from top of viewport
          onEnter: () => gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3 }),
          onLeave: () => gsap.to(cursorRef.current, { opacity: 0, scale: 0, duration: 0.3 }),
          onEnterBack: () => gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3 }),
          onLeaveBack: () => gsap.to(cursorRef.current, { opacity: 0, scale: 0, duration: 0.3 }),
        });
      }
    }

    // Cleanup function
    return () => {
      // Restore original cursor
      document.body.style.cursor = originalCursor;
      // Remove mousemove listener
      window.removeEventListener('mousemove', handleMouseMove);
      // Kill GSAP ticker
      gsap.ticker.remove(ticker);
      // Kill ScrollTrigger instance if it exists
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [isEnabled, iconSrc, triggerElement]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed left-0 top-0 pointer-events-none z-[9999]"
      style={{
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={iconSrc}
        alt="Cursor"
        className="w-6 h-6"
        style={{ 
          // Ensure the SVG uses the current text color for stroke
          color: 'inherit', 
        }}
      />
    </div>
  );
};