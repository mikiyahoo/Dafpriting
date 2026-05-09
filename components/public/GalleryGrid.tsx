"use client";

import Image from "next/image";
import { useState } from "react";
import { Columns3, ImageIcon } from "lucide-react";
import { GalleryImageDto, formatGalleryCategory } from "@/lib/gallery";
import { Lightbox } from "@/components/public/Lightbox";

export function GalleryGrid({ images }: { images: GalleryImageDto[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="mt-16 flex min-h-72 flex-col items-center justify-center border border-radiance-navy/10 bg-white/45 px-6 text-center">
        <ImageIcon className="h-10 w-10 text-radiance-navy/35" />
        <h2 className="mt-5 text-2xl text-radiance-navy">No images yet</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-radiance-navy/60">
          Gallery images uploaded from the admin dashboard will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-16 columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="group relative block w-full break-inside-avoid overflow-hidden bg-radiance-navy text-left"
            onClick={() => setSelected(index)}
          >
            <Image
              src={image.imageUrl}
              alt={image.title}
              width={900}
              height={1100}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                  <Columns3 className="h-3.5 w-3.5" />
                  {formatGalleryCategory(image.category)}
                </div>
                <h3 className="text-xl text-white">{image.title}</h3>
                {image.isBeforeAfter && (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                    Before / After
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <Lightbox
          images={images}
          selected={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
