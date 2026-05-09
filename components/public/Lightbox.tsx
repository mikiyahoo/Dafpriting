"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GalleryImageDto, formatGalleryCategory } from "@/lib/gallery";
import { BeforeAfterSlider } from "@/components/public/BeforeAfterSlider";

export function Lightbox({
  images,
  selected,
  onClose,
}: {
  images: GalleryImageDto[];
  selected: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(selected);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goPrevious = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrevious();
    }

    window.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, [goNext, goPrevious, onClose]);

  const image = images[current];

  if (!image) return null;

  const hasComparison =
    image.isBeforeAfter && image.beforeImageUrl && image.afterImageUrl;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/92 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        <X className="h-6 w-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={goPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      <div className="w-full max-w-5xl">
        {hasComparison ? (
          <BeforeAfterSlider
            before={image.beforeImageUrl!}
            after={image.afterImageUrl!}
            title={image.title}
          />
        ) : (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-black">
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-contain"
            />
          </div>
        )}

        <div className="mx-auto mt-5 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            {formatGalleryCategory(image.category)}
          </p>
          <h2 className="mt-2 text-2xl text-white md:text-3xl">{image.title}</h2>
          {image.description && (
            <p className="mt-3 text-sm leading-6 text-white/70">
              {image.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
