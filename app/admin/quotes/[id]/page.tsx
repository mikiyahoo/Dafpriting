import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from "@/types/quote";
import { QuoteStatusUpdater } from "@/components/admin/QuoteStatusUpdater";

interface PageProps {
  params: { id: string };
}

export default async function QuoteDetailPage({ params }: PageProps) {
  const quote = await prisma.quoteRequest.findUnique({
    where: { id: params.id },
    include: {
      customer: true,
      service: true,
      files: true,
    },
  });

  if (!quote) notFound();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{quote.quoteNumber}</h1>
          <p className="text-gray-500 text-sm">
            Submitted on {new Date(quote.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${QUOTE_STATUS_COLORS[quote.status] || ""}`}>
          {QUOTE_STATUS_LABELS[quote.status] || quote.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</dt>
              <dd className="text-sm text-gray-900">{quote.customer.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</dt>
              <dd className="text-sm text-gray-900">{quote.customer.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</dt>
              <dd className="text-sm text-gray-900">{quote.customer.phone || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Company</dt>
              <dd className="text-sm text-gray-900">{quote.customer.company || "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quote Details</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Service</dt>
              <dd className="text-sm text-gray-900">{quote.service.title}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quantity</dt>
              <dd className="text-sm text-gray-900">{quote.quantity}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Size</dt>
              <dd className="text-sm text-gray-900">{quote.size || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Material</dt>
              <dd className="text-sm text-gray-900">{quote.material || "—"}</dd>
            </div>
            {quote.notes && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Notes</dt>
                <dd className="text-sm text-gray-900 whitespace-pre-wrap">{quote.notes}</dd>
              </div>
            )}
            {quote.quotedPrice && (
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quoted Price</dt>
                <dd className="text-sm text-gray-900 font-semibold">ETB {quote.quotedPrice.toLocaleString()}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Files */}
      {quote.files.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attached Files</h2>
          <div className="space-y-2">
            {quote.files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">{file.fileUrl.split("/").pop()}</p>
                  <p className="text-xs text-gray-400">{file.fileType}</p>
                </div>
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Update */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
        <QuoteStatusUpdater quoteId={quote.id} currentStatus={quote.status} />
      </div>
    </div>
  );
}