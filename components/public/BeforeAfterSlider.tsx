"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function BeforeAfterSlider({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  function handleMove(clientX: number) {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;

    setPosition(Math.max(0, Math.min(100, percent)));
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-black"
      onMouseMove={(event) => handleMove(event.clientX)}
      onTouchMove={(event) => handleMove(event.touches[0]?.clientX ?? 0)}
    >
      <Image
        src={before}
        alt={`${title} before`}
        fill
        sizes="(min-width: 1024px) 900px, 100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image
          src={after}
          alt={`${title} after`}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -left-4 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white text-neutral-black shadow-lg">
          <span className="h-3 w-px bg-neutral-black" />
        </div>
      </div>

      <div className="absolute left-4 top-4 bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
        Before
      </div>
      <div className="absolute right-4 top-4 bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
        After
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        aria-label="Comparison position"
        className="absolute bottom-4 left-1/2 w-[min(420px,calc(100%-48px))] -translate-x-1/2 accent-white"
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  );
}
