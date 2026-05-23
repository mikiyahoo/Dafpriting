"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { megaMenuCategories } from "@/components/layout/headerData";
import type { PortfolioItemRecord } from "@/features/portfolio/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItemRecord[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredItems = useMemo(() => {
    let list = items.filter((item) => item.isActive);
    if (activeTab !== "all") {
      list = list.filter((item) => item.category === activeTab);
    }
    return list;
  }, [items, activeTab]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };
  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard support for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, filteredItems.length]);

  const tabs = useMemo(() => {
    const cats = megaMenuCategories.map((c) => ({ id: c.id, label: c.label }));
    return [{ id: "all", label: "All" }, ...cats];
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24 bg-gradient-subtle min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Our Works
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Portfolio
                </span>
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                A selection of projects we've brought to life. Each piece represents 
                our commitment to quality, precision, and customer satisfaction.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-white text-textMain border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Square Grid Gallery */}
            {loading ? (
              <p className="text-textMuted text-center py-16">Loading works...</p>
            ) : filteredItems.length === 0 ? (
              <p className="text-textMuted text-center py-16">No works found for this category.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredItems.map((item, index) => {
                  const categoryLabel = megaMenuCategories.find((c) => c.id === item.category)?.label || item.category;
                  return (
                    <div
                      key={item.id}
                      className="group relative cursor-pointer aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={item.coverImage || "/assets/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/assets/placeholder.svg"; }}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <h3 className="text-white font-bold text-base leading-tight mb-1">{item.title}</h3>
                        <p className="text-white/70 text-xs">{item.itemType}</p>
                        {item.clientName && (
                          <p className="text-primary-light text-xs font-medium mt-1">for {item.clientName}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Fullscreen Lightbox */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center p-16">
              <img
                src={filteredItems[lightboxIndex].coverImage || "/assets/placeholder.svg"}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = "/assets/placeholder.svg"; }}
              />
            </div>

            {/* Caption */}
            <div className="absolute bottom-6 left-0 right-0 text-center px-4">
              <p className="text-white text-lg font-bold">{filteredItems[lightboxIndex].title}</p>
              <p className="text-white/60 text-sm mt-1">
                {filteredItems[lightboxIndex].itemType}
                {filteredItems[lightboxIndex].clientName && (
                  <> for <span className="text-primary-light font-medium">{filteredItems[lightboxIndex].clientName}</span></>
                )}
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}