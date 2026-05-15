import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from "@/features/quotes/types";

export const dynamic = "force-dynamic";

interface PageProps { params: Promise<{ id: string }> }

export default async function AdminCustomerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      quotes: {
        include: { service: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!customer) return notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/customers" className="text-amber-600 hover:text-amber-700 text-sm font-medium">&larr; Back to Customers</Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{customer.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <div><span className="font-medium text-gray-900">Email:</span> {customer.email}</div>
          <div><span className="font-medium text-gray-900">Phone:</span> {customer.phone || "—"}</div>
          <div><span className="font-medium text-gray-900">Company:</span> {customer.company || "—"}</div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quote History ({customer.quotes.length})</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b">
            <th className="text-left px-4 py-3 font-medium text-gray-500">Quote #</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Service</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Qty</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr></thead>
          <tbody>
            {customer.quotes.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">No quotes from this customer.</td></tr>
            ) : customer.quotes.map((q) => (
              <tr key={q.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{q.quoteNumber}</td>
                <td className="px-4 py-3 text-gray-600">{q.service.title}</td>
                <td className="px-4 py-3 text-gray-600">{q.quantity}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${QUOTE_STATUS_COLORS[q.status] || ""}`}>
                    {QUOTE_STATUS_LABELS[q.status] || q.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{new Date(q.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3"><Link href={`/admin/quotes/${q.id}`} className="text-amber-600 hover:text-amber-700 font-medium">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}