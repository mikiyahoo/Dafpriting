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
      <section className="py-16 bg-bgPure">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Shop by collection
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-subtle relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="w-1 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full" />
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-textMain">
                Shop by Collection
              </h2>
              <p className="text-sm text-textMuted mt-1">
                Curated selections for every need
              </p>
            </div>
          </div>
          <Link
            href="/services"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors group"
          >
            See all collections
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                className={`group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:-translate-y-2 transition-all duration-500 ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                } ${isSplit ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div
                  className={`relative ${
                    isLarge ? "aspect-square md:aspect-auto md:h-full min-h-[300px]" : "aspect-[4/3]"
                  } overflow-hidden`}
                >
                  {collection.image ? (
                    <>
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient overlay - always visible but subtle */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-primary p-8">
                      <div className="text-center text-bgPure">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <p className="text-2xl font-black mb-2">{collection.name}</p>
                        {collection.description && (
                          <p className="text-sm text-white/80 max-w-xs mx-auto">{collection.description}</p>
                        )}
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-highlight">
                          Explore Now
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content overlay - always visible for images */}
                  {collection.image && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="backdrop-blur-md bg-black/30 rounded-2xl p-4 group-hover:bg-black/40 transition-colors duration-300">
                        <h3 className="text-lg font-bold text-bgPure mb-1">
                          {collection.name}
                        </h3>
                        {collection.description && (
                          <p className="text-sm text-white/80 line-clamp-2">
                            {collection.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-3 text-sm font-semibold text-secondary-light group-hover:text-highlight transition-colors">
                          <span>Explore Collection</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
          >
            See all collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
