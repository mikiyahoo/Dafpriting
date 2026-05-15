import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { TRACKING_STAGES } from "@/features/order-tracking/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order Tracking | Admin | Daf Printing" };

const stageLabelMap = Object.fromEntries(TRACKING_STAGES.map((s) => [s.stage, s.label]));

export default async function AdminTrackingPage() {
  const records = await prisma.orderTracking.findMany({
    include: {
      quoteRequest: { include: { customer: true, service: true } },
      stages: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Tracking</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b">
            <th className="text-left px-4 py-3 font-medium text-gray-500">Quote #</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Service</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Current Stage</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Last Updated</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr></thead>
          <tbody>
            {records.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">No tracking records found.</td></tr>
            ) : records.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{r.quoteRequest.quoteNumber}</td>
                <td className="px-4 py-3 text-gray-600">{r.quoteRequest.customer.name}</td>
                <td className="px-4 py-3 text-gray-600">{r.quoteRequest.service.title}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded">
                    {stageLabelMap[r.currentStage] || r.currentStage}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(r.updatedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/tracking/${r.id}`} className="text-amber-600 hover:text-amber-700 text-xs font-medium">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}