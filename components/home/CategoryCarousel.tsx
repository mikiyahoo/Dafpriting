"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
}

export function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.filter((c: Category) => c.isActive));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const defaultImages = [
    "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1562109277-6e28313eaaaf?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1588854337236-6889d631f771?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=200&h=200&fit=crop",
  ];

  return (
    <section className="py-16 bg-soft-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy">
            Explore all categories
          </h2>
          {categories.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-primary-navy/20 flex items-center justify-center text-primary-navy hover:bg-primary-navy hover:text-secondary-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-primary-navy/20 flex items-center justify-center text-primary-navy hover:bg-primary-navy hover:text-secondary-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[180px] h-[220px] bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No categories available yet.</p>
        ) : (
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/services/${category.slug}`}
                className="flex-shrink-0 w-[180px] group"
              >
                <div className="bg-secondary-white rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-lg transition-all duration-300 border border-primary-navy/5 hover:border-primary-brown/20">
                  <div className="w-[120px] h-[120px] rounded-xl bg-overlay-light flex items-center justify-center overflow-hidden">
                    <img
                      src={category.image || defaultImages[index % defaultImages.length]}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-primary-navy text-center group-hover:text-primary-brown transition-colors">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}