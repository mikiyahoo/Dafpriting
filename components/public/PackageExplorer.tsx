"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles, X } from "lucide-react";
import { PackageCategoryRecord, PackageRecord } from "@/types";
import { cn } from "@/lib/utils";

interface PackageExplorerProps {
  categories: PackageCategoryRecord[];
  packages: PackageRecord[];
}

export function PackageExplorer({ categories, packages }: PackageExplorerProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPackage, setSelectedPackage] = useState<PackageRecord | null>(null);

  const visiblePackages = useMemo(() => {
    if (activeCategory === "all") return packages;
    return packages.filter((item) => item.category?.slug === activeCategory);
  }, [activeCategory, packages]);

  const tabs = [
    { slug: "all", name: "All" },
    ...categories.filter((category) => category._count?.packages !== 0),
  ];

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
              activeCategory === category.slug
                ? "border-radiance-navy bg-radiance-navy text-white"
                : "border-radiance-navy/15 bg-white text-radiance-navy hover:border-radiance-navy/40"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visiblePackages.map((item) => (
          <article
            key={item.id}
            className={cn(
              "group overflow-hidden rounded-lg border bg-white transition duration-300",
              item.isPopular
                ? "scale-[1.01] border-amber-400 shadow-xl shadow-amber-900/10"
                : "border-radiance-navy/10 shadow-sm hover:shadow-lg"
            )}
          >
            <div className="relative aspect-[4/3] bg-radiance-cream">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-radiance-navy/40">
                  <Sparkles className="h-10 w-10" />
                </div>
              )}
              {item.isPopular && (
                <div className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow">
                  Most Popular
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-radiance-navy/50">
                {item.category?.name}
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-radiance-navy">{item.name}</h2>
              <p className="mt-2 text-lg font-semibold text-amber-700">{item.priceLabel}</p>
              <p className="mt-3 text-sm leading-6 text-radiance-navy/65">{item.shortDesc}</p>

              <ul className="mt-5 space-y-2">
                {item.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-radiance-navy/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(item)}
                  className="rounded-lg border border-radiance-navy/20 px-4 py-2 text-sm font-semibold text-radiance-navy hover:bg-radiance-navy/5"
                >
                  View Details
                </button>
                <Link
                  href={`/book?package=${encodeURIComponent(item.name)}`}
                  className="rounded-lg bg-radiance-navy px-4 py-2 text-center text-sm font-semibold text-white hover:bg-radiance-navy/90"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visiblePackages.length === 0 && (
        <div className="mt-12 rounded-lg border border-radiance-navy/10 bg-white p-10 text-center text-radiance-navy/65">
          No active packages are available in this category yet.
        </div>
      )}

      {selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 px-4 py-8">
          <div className="mx-auto max-w-4xl rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-radiance-navy/10 p-6">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-radiance-navy/50">
                  {selectedPackage.category?.name}
                </div>
                <h2 className="mt-2 text-3xl font-semibold text-radiance-navy">
                  {selectedPackage.name}
                </h2>
                <p className="mt-2 text-lg font-semibold text-amber-700">
                  {selectedPackage.priceLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                className="rounded-full border border-radiance-navy/10 p-2 text-radiance-navy hover:bg-radiance-navy/5"
                aria-label="Close package details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-8 p-6 lg:grid-cols-[1fr_.9fr]">
              <div>
                {selectedPackage.imageUrl && (
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg bg-radiance-cream">
                    <Image
                      src={selectedPackage.imageUrl}
                      alt={selectedPackage.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="whitespace-pre-wrap text-sm leading-7 text-radiance-navy/70">
                  {selectedPackage.description}
                </p>
                {selectedPackage.galleryImages.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {selectedPackage.galleryImages.map((imageUrl) => (
                      <div key={imageUrl} className="relative aspect-square overflow-hidden rounded bg-radiance-cream">
                        <Image src={imageUrl} alt="" fill sizes="160px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-radiance-navy">Included</h3>
                  <ul className="mt-3 space-y-2">
                    {selectedPackage.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm text-radiance-navy/75">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedPackage.exclusions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-radiance-navy">Not Included</h3>
                    <ul className="mt-3 space-y-2">
                      {selectedPackage.exclusions.map((feature) => (
                        <li key={feature} className="flex gap-2 text-sm text-radiance-navy/60">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-radiance-navy/35" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link
                  href={`/book?package=${encodeURIComponent(selectedPackage.name)}`}
                  className="inline-flex w-full justify-center rounded-lg bg-radiance-navy px-5 py-3 text-sm font-semibold text-white hover:bg-radiance-navy/90"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
