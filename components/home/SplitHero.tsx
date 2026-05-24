"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, ShoppingCart, Sparkles } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isActive?: boolean;
}

interface Banner {
  id: string;
  title?: string | null;
  imageUrl: string;
  linkUrl?: string | null;
  isActive?: boolean;
}

export default function SplitHero() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeBanner, setActiveBanner] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const edgeArrowsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error(`Categories API returned ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        if (Array.isArray(data)) {
          setCategories(data.filter((c: Category) => c.isActive !== false));
        } else {
          throw new Error("Categories API returned invalid data");
        }
      } catch (e) {
        console.error("Failed to load categories", e);
        if (mounted) setError("Unable to load categories from the database.");
      }
    })();

    (async () => {
      try {
        const res = await fetch("/api/banners");
        if (!res.ok) throw new Error(`Banners API returned ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        if (Array.isArray(data)) {
          setBanners(data.filter((b: Banner) => b.isActive !== false));
        }
      } catch (e) {
        console.error("Failed to load banners", e);
      }
    })();

    return () => { mounted = false; };
  }, []);

  const fallbackBanners: Banner[] = [
    { id: "fallback-1", title: "High-impact print campaigns", imageUrl: "/assets/Banners/Daf-Banner-1.png", linkUrl: "/request-quote" },
    { id: "fallback-2", title: "Fast turnaround for every order", imageUrl: "/assets/Banners/Daf-Banner-2.png", linkUrl: "/services" },
    { id: "fallback-3", title: "Custom packaging & stationery", imageUrl: "/assets/Banners/Daf-Banner-3.png", linkUrl: "/categories/packaging" },
  ];

  const displayBanners = useMemo(() => (banners.length > 0 ? banners : fallbackBanners), [banners]);

  // Banner autoplay
  useEffect(() => {
    if (!displayBanners || displayBanners.length === 0) return;
    const t = setInterval(() => setActiveBanner((s) => (s + 1) % displayBanners.length), 4500);
    return () => clearInterval(t);
  }, [displayBanners]);

  // Auto-scroll for categories carousel
  useEffect(() => {
    if (categories.length <= 4) return;

    const startAutoScroll = () => {
      if (isHovering) return;
      
      autoScrollRef.current = window.setInterval(() => {
        if (!scrollRef.current) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 540, behavior: "smooth" });
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [categories.length, isHovering]);

  const scrollCategories = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 520 + 20;
    const scrollAmount = direction === "left" ? -cardWidth * 4 : cardWidth * 4;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="bg-transparent min-h-screen pt-6">
      {/* TOP HERO BANNER SLIDER */}
      <div className="w-full bg-gradient-to-b from-transparent to-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            {displayBanners && displayBanners.length > 0 ? (
              <div className="w-full h-[280px] md:h-[340px] lg:h-[380px] relative">
                {displayBanners.map((b, i) => (
                  <div
                    key={b.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      i === activeBanner ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={b.imageUrl}
                      alt={b.title || "Banner"}
                      className="w-full h-full object-cover object-center rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent rounded-2xl" />
                    {b.title && (
                      <div className="absolute left-6 md:left-8 bottom-6 md:bottom-8 text-white max-w-lg">
                        <div className="rounded-2xl p-4 md:p-6">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-black drop-shadow-lg">
                            {b.title}
                          </h3>
                          <Link
                            href={b.linkUrl || "/request-quote"}
                            className="inline-flex items-center gap-2 mt-4 rounded-full bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-light hover:to-secondary px-6 py-3 text-bgPure font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                          >
                            <ShoppingCart size={16} />
                            Order Now
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Slide indicator dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {displayBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveBanner(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === activeBanner ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-[280px] md:h-[340px] lg:h-[380px] bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400">No banners yet</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 👇 SHOP BY CATEGORIES — edge arrows, no title, full width */}
      <div className="w-full relative py-12 bg-gradient-to-b from-white via-[#f8fbfd] to-white">
        {/* Left arrow at viewport edge */}
        {categories.length > 4 && (
          <button
            onClick={() => scrollCategories("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 border border-gray-200 shadow-lg flex items-center justify-center text-textMuted hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-5 scroll-smooth scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              maskImage: "linear-gradient(to right, transparent 0%, #000 3%, #000 97%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 3%, #000 97%, transparent 100%)",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsHovering(false), 3000);
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex-shrink-0 w-[460px] sm:w-[520px] group bg-bgPure border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_8px_28px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_42px_rgba(0,119,182,0.16)] hover:-translate-y-1 transition-all duration-300 flex"
              >
                {/* Square image on the left — doubled height */}
                  <div className="relative w-[210px] sm:w-[240px] h-[220px] sm:h-[240px] flex-shrink-0 overflow-hidden rounded-2xl m-3 bg-gradient-to-br from-slate-50 to-sky-50">
                    <img
                      src={cat.image || "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&h=400&fit=crop"}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent opacity-80 pointer-events-none" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary shadow-sm">
                    <Sparkles size={13} />
                    Custom
                  </span>
                </div>
                {/* Details on the right */}
                <div className="p-5 pr-6 flex min-h-[220px] sm:min-h-[240px] flex-1 flex-col min-w-0">
                  <h3 className="text-lg sm:text-xl font-extrabold text-textMain group-hover:text-primary transition-colors leading-tight break-words hyphens-auto">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-textMuted mt-2 line-clamp-2 leading-relaxed">
                    {cat.description || "Explore our collection"}
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-sm font-extrabold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ShoppingCart size={15} />
                      Shop Now
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-textMuted group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Inline empty state */}
            {categories.length === 0 && (
              <div className="w-full py-16 text-center text-textMuted">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-gray-500">No categories yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Right arrow at viewport edge */}
        {categories.length > 4 && (
          <button
            onClick={() => scrollCategories("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 border border-gray-200 shadow-lg flex items-center justify-center text-textMuted hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
}
