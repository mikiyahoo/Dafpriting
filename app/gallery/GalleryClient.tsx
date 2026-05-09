"use client";

import { useEffect, useState } from "react";
import {
  GalleryCategoryFilter,
  GalleryImageDto,
  formatGalleryCategory,
  galleryCategories,
} from "@/lib/gallery";
import { GalleryGrid } from "@/components/public/GalleryGrid";

type GalleryResponse = {
  success: boolean;
  data?: GalleryImageDto[];
  error?: string;
};

export function GalleryClient() {
  const [images, setImages] = useState<GalleryImageDto[]>([]);
  const [active, setActive] = useState<GalleryCategoryFilter>("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/gallery?category=${active}`, { signal: controller.signal })
      .then((response) => response.json() as Promise<GalleryResponse>)
      .then((payload) => {
        if (!payload.success) {
          throw new Error(payload.error || "Failed to fetch gallery");
        }

        setImages(payload.data ?? []);
      })
      .catch((fetchError: Error) => {
        if (fetchError.name === "AbortError") return;
        setError(fetchError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [active]);

  function selectCategory(category: GalleryCategoryFilter) {
    setActive(category);
    setLoading(true);
    setError("");
  }

  return (
    <main className="min-h-screen bg-soft-sand pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-radiance-navy/55">
            Portfolio
          </p>
          <h1 className="mt-4 text-5xl text-radiance-navy md:text-6xl">
            Our Work
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-radiance-navy/65">
            Moments designed with texture, timing, and a clear sense of occasion.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                active === category
                  ? "border-radiance-navy bg-radiance-navy text-white"
                  : "border-radiance-navy/15 bg-white/70 text-radiance-navy hover:border-radiance-navy/35"
              }`}
            >
              {category === "ALL" ? "All" : formatGalleryCategory(category)}
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-10 text-center text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse bg-radiance-navy/10"
              />
            ))}
          </div>
        ) : (
          <GalleryGrid images={images} />
        )}
      </section>
    </main>
  );
}
