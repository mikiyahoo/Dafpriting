import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Testimonials | Admin | Daf Printing" };

interface PageProps { searchParams: { status?: string } }

export default async function AdminTestimonialsPage({ searchParams }: PageProps) {
  const statusFilter = searchParams.status || "all";
  const where = statusFilter === "approved" ? { isApproved: true }
    : statusFilter === "pending" ? { isApproved: false }
    : {};

  const testimonials = await prisma.testimonial.findMany({ where, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <button className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600">Add Testimonial</button>
      </div>
      <div className="flex gap-2 mb-6">
        {["all", "approved", "pending"].map((s) => (
          <a key={s} href={`/admin/testimonials?status=${s}`}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${statusFilter === s ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b">
            <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Company</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Review</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Rating</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Approved</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Featured</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr></thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-gray-400">No testimonials found.</td></tr>
            ) : testimonials.map((t) => (
              <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{t.customerName}</td>
                <td className="px-4 py-3 text-gray-600">{t.company || "—"}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{t.review}</td>
                <td className="px-4 py-3">{Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-amber-400">★</span>)}</td>
                <td className="px-4 py-3">{t.isApproved ? <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">Approved</span> : <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium">Pending</span>}</td>
                <td className="px-4 py-3">{t.isFeatured ? <span className="text-amber-600 font-medium">★ Featured</span> : "—"}</td>
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