"use client";

import { useState, useEffect } from "react";
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
  const [loading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.filter((c: Category) => c.isActive));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-soft-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
          Explore all categories
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-bgPure rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-lg transition-all duration-300 border border-primary/5"
              >
                <span className="text-sm font-semibold text-primary text-center group-hover:text-secondary transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
            {categories.length === 0 && (
              <p className="col-span-full text-center text-gray-400 py-12">
                No categories available yet.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
