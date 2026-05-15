"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  linkUrl: string | null;
  isFeatured: boolean;
  sortOrder: number;
  isActive: boolean;
}

const fallbackCollections = [
  {
    id: "1",
    name: "Top Products",
    slug: "top-products",
    description: "Our most popular printing products",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop",
    linkUrl: "/services",
    isFeatured: true,
    sortOrder: 0,
    isActive: true,
  },
  {
    id: "2",
    name: "Business Essentials",
    slug: "business-essentials",
    description: "Everything your business needs",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    linkUrl: "/services",
    isFeatured: true,
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "3",
    name: "Wedding & Events",
    slug: "wedding-events",
    description: "Make your special day unforgettable",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop",
    linkUrl: "/services",
    isFeatured: false,
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "4",
    name: "Custom Merchandise",
    slug: "custom-merchandise",
    description: "Branded products for your team",
    image: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&h=400&fit=crop",
    linkUrl: "/services",
    isFeatured: false,
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "5",
    name: "2-Day Delivery",
    slug: "express-printing",
    description: "Fast turnaround printing services",
    image: null,
    linkUrl: "/services",
    isFeatured: true,
    sortOrder: 4,
    isActive: true,
  },
  {
    id: "6",
    name: "Prepare for Professional Events",
    slug: "professional-events",
    description: "Stand out at your next event",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop",
    linkUrl: "/services",
    isFeatured: true,
    sortOrder: 5,
    isActive: true,
  },
];

export function CollectionsGrid() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();
        const active = data.filter((c: Collection) => c.isActive);
        setCollections(active.length > 0 ? active : fallbackCollections);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
        setCollections(fallbackCollections);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-secondary-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-navy">
              Shop by collection
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy">
            Shop by collection
          </h2>
          <Link
            href="/services"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-brown hover:text-primary-brown/80 transition-colors"
          >
            See all collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => {
            const isLarge = index % 3 === 0;
            const isSplit = index % 3 === 2;

            return (
              <Link
                key={collection.id}
                href={collection.linkUrl || `/services/${collection.slug}`}
                className={`group relative rounded-2xl overflow-hidden ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                } ${isSplit ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div
                  className={`relative ${
                    isLarge ? "aspect-square md:aspect-auto md:h-full min-h-[300px]" : "aspect-[4/3]"
                  } bg-overlay-light overflow-hidden`}
                >
                  {collection.image ? (
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-navy to-muted-navy p-8">
                      <div className="text-center text-secondary-white">
                        <p className="text-3xl font-bold mb-2">{collection.name}</p>
                        {collection.description && (
                          <p className="text-sm opacity-80">{collection.description}</p>
                        )}
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-brown">
                          Explore Now
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content overlay */}
                  {collection.image && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-bold text-secondary-white mb-1">
                        {collection.name}
                      </h3>
                      {collection.description && (
                        <p className="text-sm text-secondary-white/80 line-clamp-2">
                          {collection.description}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-brown mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="sm:hidden text-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-brown hover:text-primary-brown/80 transition-colors"
          >
            See all collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}