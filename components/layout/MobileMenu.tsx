"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface MenuItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    number: "01",
    title: "CORPORATE",
    subtitle: "PROFESSIONAL EXCELLENCE",
    description:
      "Bespoke executive retreats and large-scale summits. Crafted for impact and authority.",
    image: "https://picsum.photos/id/20/600/450",
    href: "/services?category=corporate",
  },
  {
    number: "02",
    title: "SOCIAL",
    subtitle: "AUTHENTIC CONNECTIONS",
    description:
      "Curated private celebrations and milestone gatherings. Where intimacy meets artistry.",
    image: "https://picsum.photos/id/106/600/450",
    href: "/experiences?category=social",
  },
  {
    number: "03",
    title: "WEDDING",
    subtitle: "ETERNAL ELEGANCE",
    description:
      "Immersive storytelling through luxury matrimonial design. Every detail, a timeless memory.",
    image: "https://picsum.photos/id/98/600/450",
    href: "/experiences?category=wedding",
  },
  {
    number: "04",
    title: "DESTINATION",
    subtitle: "EXTRAORDINARY ESCAPES",
    description:
      "Global event management in the world's most remote locales. Seamless luxury, anywhere.",
    image: "https://picsum.photos/id/15/600/450",
    href: "/experiences?category=destination",
  },
  {
    number: "05",
    title: "PACKAGES",
    subtitle: "TAILORED SOLUTIONS",
    description:
      "Browse dynamic event packages with pricing, inclusions, and booking paths.",
    image: "https://picsum.photos/id/225/600/450",
    href: "/packages",
  },
  {
    number: "06",
    title: "CONSULTING",
    subtitle: "STRATEGIC VISION",
    description:
      "Strategic brand positioning for the modern event industry. Data-driven creativity.",
    image: "https://picsum.photos/id/152/600/450",
    href: "/services?category=consulting",
  },
];

interface MobileMenuProps {
  variant?: "light" | "dark";
}

export function MobileMenu({ variant: _variant = "dark" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setIsOpen(true);
    document.body.classList.add("menu-open");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("menu-open");
  };

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Horizontal wheel scroll support
  useEffect(() => {
    const scrollWrap = scrollContainerRef.current;
    if (!scrollWrap) return;
    const handleWheel = (e: WheelEvent) => {
      if (
        Math.abs(e.deltaY) > Math.abs(e.deltaX) &&
        scrollWrap.scrollWidth > scrollWrap.clientWidth
      ) {
        e.preventDefault();
        scrollWrap.scrollLeft += e.deltaY;
      }
    };
    scrollWrap.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollWrap.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  // Focus trap + initial focus on close button
  useEffect(() => {
    if (!isOpen) return;

    // Move focus to close button when menu opens
    closeBtnRef.current?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const overlay = document.getElementById("fullscreenMenu");
      if (!overlay) return;
      const focusable = overlay.querySelectorAll<HTMLElement>(
        'button, a, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  // Cleanup body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, []);

  return (
    <>
      {/* Hamburger trigger */}
      <button
        id="hamburgerTrigger"
        onClick={openMenu}
        className="hamburger-btn"
        aria-label="Open fullscreen menu"
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Fullscreen overlay menu */}
      <div
        id="fullscreenMenu"
        className={`menu-overlay${isOpen ? " open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="menu-header">
          <div className="header-left">
            <span>(6) EVENT CATEGORIES</span>
            <span>INTERNAL WORKS / 2026</span>
          </div>
          <div className="header-right">
            <button
              ref={closeBtnRef}
              id="closeMenuBtn"
              onClick={closeMenu}
              className="close-btn"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="menu-items-container"
          id="menuScrollContainer"
        >
          {menuItems.map((item) => (
            <div className="menu-item" key={item.number}>
              <div className="item-top">
                <span className="item-number">{item.number}</span>
                <div className="image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={`${item.title} event`}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="item-details">
                <div className="info-row">
                  <div className="title-group">
                    <h3>{item.title}</h3>
                    <p className="subtitle">{item.subtitle}</p>
                  </div>
                  <span className="year">©2026</span>
                </div>
                <div className="hover-content">
                  <p className="description">{item.description}</p>
                  <Link
                    href={item.href}
                    className="visit-link"
                    onClick={closeMenu}
                  >
                    Visit the Site →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-hint">⟷ scroll horizontally ⟷</div>
      </div>

      <style jsx>{`
        /* Hamburger Button */
        .hamburger-btn {
          pointer-events: auto;
          background: rgba(24, 40, 73, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(191, 143, 58, 0.35);
          cursor: pointer;
          width: 52px;
          height: 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 7px;
          border-radius: 60px;
          transition: all 0.25s ease;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          padding: 0;
        }
        .hamburger-btn:hover {
          background: #182849;
          border-color: #bf8f3a;
          transform: scale(0.96);
        }
        .hamburger-line {
          width: 26px;
          height: 2.5px;
          background-color: #f4f4f4;
          transition: all 0.3s ease;
          border-radius: 4px;
          display: block;
        }

        /* Fullscreen overlay */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #182849;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: translateY(-100%);
          transition: transform 0.7s cubic-bezier(0.77, 0, 0.18, 1);
          pointer-events: none;
          font-family:
            "Montserrat", system-ui, -apple-system, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
        }
        .menu-overlay.open {
          transform: translateY(0);
          pointer-events: auto;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 40px;
          border-bottom: 1px solid rgba(241, 214, 137, 0.3);
          background: #182849;
        }
        .header-left {
          display: flex;
          gap: 32px;
          font-family: "Montserrat", monospace;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
        }
        .header-left :global(span:first-child) {
          font-weight: 700;
          color: #bf8f3a;
          background: rgba(191, 143, 58, 0.18);
          padding: 4px 14px;
          border-radius: 40px;
          font-size: 11px;
        }
        .header-left :global(span:last-child) {
          color: #f1d689;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 30px;
          cursor: pointer;
          color: #f4f4f4;
          transition: all 0.2s ease;
          line-height: 1;
          padding: 6px 14px;
          border-radius: 100px;
          font-weight: 300;
        }
        .close-btn:hover {
          color: #bf8f3a;
          background: rgba(191, 143, 58, 0.2);
          transform: rotate(90deg);
        }

        /* Horizontal scroller */
        .menu-items-container {
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: #bf8f3a rgba(255, 255, 255, 0.12);
          padding-bottom: 20px;
        }
        .menu-items-container::-webkit-scrollbar {
          height: 5px;
        }
        .menu-items-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .menu-items-container::-webkit-scrollbar-thumb {
          background: #bf8f3a;
          border-radius: 10px;
        }

        /* Menu items */
        .menu-item {
          min-width: calc(100vw / 3.2);
          width: 420px;
          flex: 0 0 auto;
          scroll-snap-align: start;
          border-right: 1px solid rgba(241, 214, 137, 0.25);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          transition:
            background 0.3s ease,
            border-right-color 0.2s;
          background: #182849;
        }
        @media (min-width: 1400px) {
          .menu-item {
            min-width: 480px;
          }
        }
        @media (max-width: 1100px) {
          .menu-item {
            min-width: 380px;
          }
        }
        .menu-item:hover {
          background: rgba(47, 73, 124, 0.5);
          border-right-color: #bf8f3a;
        }

        .item-top {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 28px;
        }
        .item-number {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #bf8f3a;
          font-family: "Montserrat", monospace;
          background: rgba(191, 143, 58, 0.2);
          display: inline-block;
          width: fit-content;
          padding: 3px 16px;
          border-radius: 50px;
        }
        .image-wrapper {
          width: 100%;
          overflow: hidden;
          border-radius: 24px;
          box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(241, 214, 137, 0.35);
        }
        .image-wrapper :global(img) {
          width: 100%;
          height: 320px;
          object-fit: cover;
          filter: grayscale(100%);
          transition:
            filter 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1),
            transform 0.5s ease;
          display: block;
          border-radius: 24px;
        }
        .menu-item:hover .image-wrapper :global(img) {
          filter: grayscale(0%);
          transform: scale(1.02);
        }

        .item-details {
          margin-top: 8px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          border-bottom: 1px solid rgba(241, 214, 137, 0.4);
          padding-bottom: 18px;
          margin-bottom: 8px;
        }
        .title-group :global(h3) {
          font-family:
            "Kostic Serif", "Playfair Display", Georgia, "Times New Roman",
            serif;
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: -0.3px;
          color: #f4f4f4;
          margin-bottom: 6px;
        }
        .subtitle {
          font-family: "Montserrat", sans-serif;
          font-size: 0.7rem;
          letter-spacing: 2.8px;
          color: #f1d689;
          text-transform: uppercase;
          font-weight: 500;
        }
        .year {
          font-size: 0.85rem;
          color: #bf8f3a;
          font-family: monospace;
          font-weight: 500;
        }

        .hover-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.55s cubic-bezier(0.23, 1, 0.32, 1);
          margin-top: 0;
        }
        .menu-item:hover .hover-content {
          max-height: 220px;
          opacity: 1;
          margin-top: 24px;
        }
        .description {
          font-family: "Montserrat", sans-serif;
          font-size: 1rem;
          line-height: 1.5;
          color: #e9e2d4;
          margin-bottom: 18px;
          font-weight: 400;
          border-left: 3px solid #bf8f3a;
          padding-left: 18px;
        }
        .visit-link {
          font-family: "Montserrat", sans-serif;
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          color: #f1d689;
          border-bottom: 1.8px solid #bf8f3a;
          padding-bottom: 5px;
          transition: 0.25s ease;
        }
        .visit-link:hover {
          color: #bf8f3a;
          border-bottom-color: #e6b422;
          letter-spacing: 2.2px;
        }

        .scroll-hint {
          position: absolute;
          bottom: 20px;
          right: 30px;
          font-size: 11px;
          color: #bf8f3a;
          font-family: monospace;
          background: rgba(0, 0, 0, 0.45);
          padding: 6px 14px;
          border-radius: 60px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          letter-spacing: 0.8px;
          pointer-events: none;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .menu-header {
            padding: 20px 24px;
          }
          .menu-item {
            min-width: 85vw;
            padding: 30px 24px;
          }
          .image-wrapper :global(img) {
            height: 260px;
          }
          .title-group :global(h3) {
            font-size: 1.7rem;
          }
        }
      `}</style>

      <style jsx global>{`
        body.menu-open {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
