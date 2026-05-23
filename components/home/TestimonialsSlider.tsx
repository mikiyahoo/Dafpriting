"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { TestimonialRecord } from "@/features/testimonials/types";

/* ── fixed positions matching the reference design (percentage-based) ── */
interface BubblePosition {
  x: number;   // % from left
  y: number;   // % from top
  size: number; // px diameter
}

const BUBBLE_POSITIONS: BubblePosition[] = [
  // Top-left glasses guy
  { x: 8,  y: 28, size: 72 },
  // Upper-left dark guy
  { x: 24, y: 10, size: 60 },
  // CENTER – hero avatar (largest)
  { x: 42, y: 22, size: 120 },
  // Mid-left woman
  { x: 18, y: 52, size: 56 },
  // Right upper woman
  { x: 66, y: 18, size: 56 },
  // Far top-right
  { x: 86, y: 6,  size: 68 },
  // Right mid
  { x: 72, y: 42, size: 56 },
  // Far right woman stripes
  { x: 88, y: 48, size: 72 },
  // Bottom-left
  { x: 4,  y: 74, size: 56 },
];

/* ── connecting lines between bubbles (index pairs) ── */
const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 4],
  [2, 3],
  [4, 5],
  [4, 6],
  [6, 7],
  [0, 3],
  [3, 8],
];

const GRADIENT_COLORS = [
  "from-blue-400 to-blue-600",
  "from-amber-400 to-orange-600",
  "from-green-400 to-emerald-600",
  "from-purple-400 to-violet-600",
  "from-pink-400 to-rose-600",
  "from-cyan-400 to-teal-600",
  "from-red-400 to-rose-600",
  "from-indigo-400 to-purple-600",
  "from-orange-400 to-amber-600",
];

// ── Sample testimonials ──
const SAMPLE_TESTIMONIALS: TestimonialRecord[] = [
  {
    id: "sample-1",
    customerName: "Sarah Johnson",
    company: "Bright Ideas Agency",
    review:
      "Exceptional quality and lightning-fast turnaround. They printed our marketing materials better than we imagined. Will definitely be coming back!",
    rating: 5,
    isApproved: true,
    isFeatured: true,
    avatarUrl: "",
    avatarType: "none",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    customerName: "Michael Tadese",
    company: "Unity Events",
    review:
      "I've been using DAF Printing for all our event materials for over two years now. The consistency in quality is remarkable. Highly recommend their service.",
    rating: 5,
    isApproved: true,
    isFeatured: true,
    avatarUrl: "",
    avatarType: "none",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-3",
    customerName: "Priya Patel",
    company: "DesignCraft Studio",
    review:
      "The attention to detail is outstanding. They helped us choose the perfect paper stock and finish for our wedding invitation suite. Stunning results!",
    rating: 5,
    isApproved: true,
    isFeatured: true,
    avatarUrl: "",
    avatarType: "none",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-4",
    customerName: "David Ochieng",
    company: "Premier Realty",
    review:
      "Fast delivery, competitive pricing, and excellent customer service. Our brochures arrived ahead of schedule and looked fantastic.",
    rating: 4,
    isApproved: true,
    isFeatured: true,
    avatarUrl: "",
    avatarType: "none",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-5",
    customerName: "Amara Williams",
    company: "GreenLeaf Organics",
    review:
      "Great quality products and helpful customer support. Highly recommended.",
    rating: 5,
    isApproved: true,
    isFeatured: true,
    avatarUrl: "",
    avatarType: "none",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ── Stars (orange filled) ── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill={i < rating ? "#F97316" : "#D1D5DB"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // ── Fetch testimonials ──
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/testimonials?approved=true&featured=true");
        if (res.ok) {
          const data = await res.json();
          const items = data.items || [];
          if (items.length > 0) {
            setTestimonials(items);
            return;
          }
        }
        const res2 = await fetch("/api/testimonials?approved=true");
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2.items && data2.items.length > 0) {
            setTestimonials(data2.items);
            return;
          }
        }
      } catch {
        // silent
      }
      setTestimonials(SAMPLE_TESTIMONIALS);
    })();
  }, []);

  // ── Intersection observer ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Autoplay ──
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.max(testimonials.length, 1));
    }, 5000);
  }, [testimonials.length]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) startAutoplay();
    return () => stopAutoplay();
  }, [testimonials.length, startAutoplay, stopAutoplay]);

  const active = testimonials[activeIndex];

  // ── Resolve avatar for a bubble index ──
  function getBubbleAvatar(_bubbleIdx: number, testimonial?: TestimonialRecord) {
    // If we have a real testimonial with uploaded/clipart avatar, use it
    if (
      testimonial?.avatarUrl &&
      (testimonial.avatarType === "upload" ||
        testimonial.avatarType === "clipart" ||
        testimonial.avatarUrl.startsWith("http"))
    ) {
      return { type: "image" as const, src: testimonial.avatarUrl };
    }
    // Fallback to initials (no static avatar images)
    return { type: "initials" as const, src: "" };
  }

  const CENTER_INDEX = 2; // The large center bubble

  /* Build the bubble list: merge testimonials with fixed positions */
  const bubbleCount = Math.max(BUBBLE_POSITIONS.length, testimonials.length);

  // Pairwise swap so active testimonial is always shown at CENTER_INDEX (index 2)
  const displayedTestimonials = Array.from({ length: bubbleCount }).map((_, i) => {
    if (testimonials.length === 0) return undefined;
    
    if (i === CENTER_INDEX) {
      return testimonials[activeIndex];
    }
    if (i === activeIndex) {
      return testimonials[CENTER_INDEX] || testimonials[0];
    }
    return testimonials[i];
  });

  const bubbles = Array.from({ length: bubbleCount }).map((_, i) => {
    const pos = BUBBLE_POSITIONS[i] || {
      x: 15 + (i * 23) % 70,
      y: 15 + (i * 31) % 60,
      size: 56,
    };
    const testimonial = displayedTestimonials[i];
    const avatar = getBubbleAvatar(i, testimonial);
    return { pos, testimonial, avatar, index: i };
  });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{ background: "#f5f5f5" }}
      className="relative overflow-hidden py-16"
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-textMain mb-6 leading-tight">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Customers Say
            </span>
          </h2>
          <p className="text-textMuted text-lg max-w-2xl mx-auto leading-relaxed">
            See how our customers share their real experiences with DAF Printing
            and why they continue to trust us for their everyday printing needs.
          </p>
        </div>

        {/* ── Bubble Map ── */}
        <div
          className="relative mx-auto"
          style={{
            width: "100%",
            maxWidth: "850px",
            height: "clamp(280px, 40vw, 360px)",
          }}
        >
          {/* SVG connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {CONNECTIONS.map(([a, b], i) => {
              const pa = BUBBLE_POSITIONS[a];
              const pb = BUBBLE_POSITIONS[b];
              if (!pa || !pb) return null;
              return (
                <line
                  key={i}
                  x1={`${pa.x + (pa.size / 850) * 50}%`}
                  y1={`${pa.y + (pa.size / 360) * 50}%`}
                  x2={`${pb.x + (pb.size / 850) * 50}%`}
                  y2={`${pb.y + (pb.size / 360) * 50}%`}
                  stroke="#D4D4D4"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
              );
            })}
          </svg>

          {/* Bubbles */}
          {bubbles.map((bubble, i) => {
            const isCenter = i === CENTER_INDEX;
            const isActive =
              bubble.testimonial && bubble.index === activeIndex;
            const size = bubble.pos.size;

            return (
              <button
                key={i}
                onClick={() => {
                  if (bubble.testimonial) {
                    const originalIdx = testimonials.findIndex(t => t.id === bubble.testimonial?.id);
                    if (originalIdx !== -1) {
                      setActiveIndex(originalIdx);
                      stopAutoplay();
                      startAutoplay();
                    }
                  }
                }}
                className="absolute group hover:scale-110 active:scale-95"
                style={{
                  left: `${bubble.pos.x}%`,
                  top: `${bubble.pos.y}%`,
                  width: size,
                  height: size,
                  zIndex: isCenter ? 10 : 1,
                  transition: "width 0.5s ease, height 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, transform 0.3s ease",
                  cursor: bubble.testimonial ? "pointer" : "default",
                  animation: isCenter
                    ? "float-gentle-center 8s ease-in-out infinite"
                    : i % 2 === 0
                    ? "float-gentle 6s ease-in-out infinite"
                    : "float-gentle-reverse 6s ease-in-out infinite",
                  animationDelay: `${i * 0.45}s`,
                }}
              >
                {/* Glow ring for center / active */}
                {isCenter && (
                  <div
                    className="absolute rounded-full animate-pulse"
                    style={{
                      inset: "-12px",
                      background:
                        "radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)",
                      zIndex: -1,
                    }}
                  />
                )}

                {/* Avatar circle */}
                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{
                    border: isCenter
                      ? "4px solid #F97316"
                      : "2px solid rgba(249, 115, 22, 0.25)",
                    boxShadow: isCenter
                      ? "0 0 15px rgba(249, 115, 22, 0.45), 0 8px 30px rgba(0,0,0,0.15)"
                      : "0 2px 10px rgba(0,0,0,0.06)",
                    transition:
                      "border-color 0.4s ease, box-shadow 0.4s ease",
                  }}
                >
                  {bubble.avatar.type === "image" ? (
                    <img
                      src={bubble.avatar.src}
                      alt={bubble.testimonial?.customerName || `Customer ${i + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${GRADIENT_COLORS[i % GRADIENT_COLORS.length]} flex items-center justify-center text-white font-bold`}
                      style={{ fontSize: size * 0.3 }}
                    >
                      {bubble.testimonial
                        ? getInitials(bubble.testimonial.customerName)
                        : "?"}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Active Testimonial Quote Card ── */}
        {active && (
          <div
            className="mx-auto relative"
            style={{
              maxWidth: "760px",
              marginTop: "-2rem",
              zIndex: 20,
            }}
          >
            <div
              key={active.id}
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                padding: "1rem 2.5rem 1rem",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.04)",
                textAlign: "center",
                animation: "fadeSlideUp 0.5s ease forwards",
              }}
            >
              {/* Orange quote marks surrounding the text in a unified wrapper */}
              <div className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "2.5rem",
                    lineHeight: "1",
                    color: "#E67E00",
                    fontWeight: 700,
                    alignSelf: "flex-start",
                    marginTop: "-0.5rem",
                  }}
                >
                  &ldquo;
                </span>
                
                <p
                  style={{
                    color: "#374151",
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                    margin: 0,
                    fontStyle: "normal",
                    display: "inline",
                  }}
                >
                  {active.review}
                </p>

                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "2.5rem",
                    lineHeight: "1",
                    color: "#E67E00",
                    fontWeight: 700,
                    alignSelf: "flex-end",
                    marginBottom: "-0.75rem",
                  }}
                >
                  &rdquo;
                </span>
              </div>

              {/* Author Info & Rating inline below */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-3 pt-2 border-t border-gray-100/50">
                <p
                  style={{
                    fontWeight: 700,
                    color: "#1A1A1A",
                    fontSize: "0.95rem",
                    margin: 0,
                  }}
                >
                  {active.customerName}
                </p>
                <div className="hidden sm:block text-gray-300">|</div>
                <StarRating rating={active.rating} />
              </div>

              {/* Dot navigation */}
              <div
                className="flex items-center justify-center gap-2"
                style={{ marginTop: "0.75rem" }}
              >
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      stopAutoplay();
                      startAutoplay();
                    }}
                    style={{
                      width: i === activeIndex ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      background: i === activeIndex ? "#E67E00" : "#D1D5DB",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                    }}
                    title={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS keyframe for quote card entrance */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float-gentle {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-7px);
          }
        }
        @keyframes float-gentle-reverse {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(7px);
          }
        }
        @keyframes float-gentle-center {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-3px) scale(1.02);
          }
        }
      `}} />
    </section>
  );
}