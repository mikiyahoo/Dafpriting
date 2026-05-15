import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Portfolio | Admin | Daf Printing" };

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <button className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600">Add New Item</button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b">
            <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Description</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Featured</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Active</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Created</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr></thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">No portfolio items yet.</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{item.description}</td>
                <td className="px-4 py-3">{item.featured ? <span className="text-green-600 text-xs font-medium">Featured</span> : <span className="text-gray-400 text-xs">—</span>}</td>
                <td className="px-4 py-3">{item.isActive ? <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">Active</span> : <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded">Inactive</span>}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-amber-600 hover:text-amber-700 text-xs font-medium">Edit</button>
                  <button className="text-red-600 hover:text-red-700 text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}