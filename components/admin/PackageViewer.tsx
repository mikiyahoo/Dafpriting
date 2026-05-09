"use client";

import { FormEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { PackageRecord, PackageCategoryRecord } from "@/types";

export function PackageViewer() {
  const [packages, setPackages] = useState<PackageRecord[]>([]);
  const [categories, setCategories] = useState<PackageCategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeCategories = useMemo(
    () => categories.filter((category) => category.isActive),
    [categories]
  );

  async function load() {
    setLoading(true);
    setError("");

    try {
      const [packagesResponse, categoriesResponse] = await Promise.all([
        fetch("/api/admin/packages"),
        fetch("/api/admin/package-categories"),
      ]);

      const [packagesData, categoriesData] = await Promise.all([
        packagesResponse.json(),
        categoriesResponse.json(),
      ]);

      if (!packagesResponse.ok) throw new Error(packagesData.error || "Could not load packages");
      if (!categoriesResponse.ok) throw new Error(categoriesData.error || "Could not load categories");

      setPackages(packagesData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">Categories</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">/{category.slug}</div>
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-xs", category.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600")}>
                  {category.isActive ? "Active" : "Hidden"}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600">{category.description || "No description"}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{category._count?.packages ?? 0} packages</span>
              </div>
            </div>
          ))}
          {categories.length === 0 && <p className="text-sm text-gray-600">No categories created yet.</p>}
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">Packages</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-600">
                <th className="px-3 py-3 font-medium">Thumbnail</th>
                <th className="px-3 py-3 font-medium">Package Name</th>
                <th className="px-3 py-3 font-medium">Category</th>
                <th className="px-3 py-3 font-medium">Price</th>
                <th className="px-3 py-3 font-medium">Popular</th>
                <th className="px-3 py-3 font-medium">Active</th>
                <th className="px-3 py-3 font-medium">Updated</th>
                <th className="px-3 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="px-3 py-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded bg-gray-100">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt="" fill className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">No img</div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="max-w-[220px] truncate text-xs text-gray-500">{item.shortDesc}</div>
                  </td>
                  <td className="px-3 py-3 text-gray-700">{item.category?.name ?? "Uncategorized"}</td>
                  <td className="px-3 py-3 text-gray-700">{item.priceLabel}</td>
                  <td className="px-3 py-3">{item.isPopular ? <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> : "-"}</td>
                  <td className="px-3 py-3">{item.isActive ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-gray-400" />}</td>
                  <td className="px-3 py-3 text-gray-600">{new Date(item.updatedAt).toLocaleDateString()}</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end gap-2">
                      {/* View link would go here in a real implementation */}
                    </td>
                  </tr>
                ))}
                {packages.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-gray-600">
                      No packages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Image({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} />;
}

function Star({ className }: { className?: string }) {
  return <svg className={cn("h-4 w-4", className)} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02l1.18 5.28a.75.75 0 00.59.91l2.15.48a.75.75 0 01.65.1l1.3-6.26a.75.75 0 011.01-.52l2.07.5a.75.75 0 01.66.02l1.18-5.28a.75.75 0 00-.14-1.04L11.95 4.05a.75.75 0 01-.64-.31L9.95 3.55a.75.75 0 00-1.1.02l-1.3 6.26a.75.75 0 01-.63.97l-2.15-.47a.75.75 0 00-.59.91l-1.18 5.28a.75.75 0 00-.06 1.06z" clipRule="evenodd" /></svg>;
}

function Eye({ className }: { className?: string }) {
  return <svg className={cn("h-4 w-4", className)} fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 7.542 7c-1.096.596-2.397 1.08-3.435 1.406l-1.497 1.497a1.012 1.012 0 01-1.413 0l-1.497-1.497a3.004 3.004 0 01-.454-2.949z" clipRule="evenodd" /></svg>;
}

function EyeOff({ className }: { className?: string }) {
  return <svg className={cn("h-4 w-4", className)} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 4.293a1 1 0 00-1.414-1.414L8.343 8.343a1 1 0 01-1.414 0l-1.293 1.293a1 1 0 00-1.414 1.414l7.072 7.072a1 1 0 001.414 0l1.293-1.293a1 1 0 011.414 0l1.293-1.293a1 1 0 001.414-1.414zM5.293 2.293a1 1 0 011.414 0l1.293 1.293a1 1 0 001.414 1.414l7.072 7.072a1 1 0 010 1.414l-1.293 1.293a1 1 0 00-1.414 1.414l-7.072-7.072a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
}