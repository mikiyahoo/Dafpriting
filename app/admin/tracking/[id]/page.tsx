import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps { params: Promise<{ id: string }> }

export default async function AdminTrackingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const tracking = await prisma.orderTracking.findUnique({
    where: { id },
    include: {
      stages: { orderBy: { sortOrder: "asc" } },
      quoteRequest: { include: { customer: true, service: true } },
    },
  });

  if (!tracking) return notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/tracking" className="text-amber-600 hover:text-amber-700 text-sm font-medium">&larr; Back to Tracking</Link>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Order Tracking - {tracking.quoteRequest.quoteNumber}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
          <div><span className="font-medium text-gray-900">Customer:</span> {tracking.quoteRequest.customer.name}</div>
          <div><span className="font-medium text-gray-900">Service:</span> {tracking.quoteRequest.service.title}</div>
          <div><span className="font-medium text-gray-900">Status:</span> {tracking.quoteRequest.status}</div>
        </div>
        {tracking.notes && (
          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <span className="font-medium text-gray-900">Notes:</span> {tracking.notes}
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Timeline</h2>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {tracking.stages.map((stage, index) => {
          const isCompleted = stage.completed;
          const isCurrent = stage.stage === tracking.currentStage;
          return (
            <div key={stage.id} className="flex items-start gap-4 pb-6 last:pb-0 relative">
              {/* Connector line */}
              {index < tracking.stages.length - 1 && (
                <div className={`absolute left-[15px] top-8 w-0.5 h-full -z-10 ${isCompleted ? "bg-green-400" : "bg-gray-200"}`} />
              )}
              {/* Circle */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-amber-500 text-white ring-4 ring-amber-100" : "bg-gray-100 text-gray-400"}`}>
                {isCompleted ? "✓" : index + 1}
              </div>
              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className={`text-sm font-semibold ${isCompleted ? "text-green-700" : isCurrent ? "text-amber-700" : "text-gray-500"}`}>{stage.label}</h3>
                {stage.completedAt && <p className="text-xs text-gray-400 mt-0.5">{new Date(stage.completedAt).toLocaleDateString()}</p>}
                {stage.note && <p className="text-xs text-gray-500 mt-1 italic">{stage.note}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}