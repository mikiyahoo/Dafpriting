"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CustomCursor } from "@/components/ui/CustomCursor";
import Link from "next/link";

export function Hero() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Intersection Observer to detect when Hero is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show cursor when hero is intersecting, hide when it's not
        setCursorVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% of hero is visible
        rootMargin: "0px",
      }
    );

    // Get the hero section element
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-navy cursor-none"
    >
      <CustomCursor isVisible={cursorVisible} />

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/Hero-video-placeholder.jpg"
        aria-hidden="true"
      >
        <source src="/videos/Radiance Wedding Hero Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navy fade at top + deep navy at bottom for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,20,40,0.55) 0%, rgba(10,20,40,0.15) 35%, rgba(10,20,40,0.35) 70%, rgba(10,20,40,0.85) 100%)",
        }}
      />

      <Container className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-secondary-white tracking-tight leading-[1.1]">
          Radiance Weddings
        </h1>
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-secondary-white/70 max-w-2xl mx-auto leading-relaxed">
          Capturing your most precious moments forever.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/contact">
            <Button size="lg">Book Your Date</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}