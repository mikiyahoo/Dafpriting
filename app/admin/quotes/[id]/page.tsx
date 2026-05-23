"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from "@/features/quotes/types";

interface QuoteDetail {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  customerCompany: string | null;
  service: { title: string };
  quantity: number;
  size: string | null;
  material: string | null;
  notes: string | null;
  status: string;
  quotedPrice: number | null;
  createdAt: string;
  files: { id: string; fileUrl: string; fileType: string }[];
}

export default function QuoteDetailPage() {
  const params = useParams();
  const [quote, setQuote] = useState<QuoteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/quotes/${params.id}`);
        if (!res.ok) return;
        const data = await res.json();
        setQuote(data.quote);
        setStatus(data.quote.status);
        setPrice(data.quote.quotedPrice ? String(data.quote.quotedPrice) : "");
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/quotes/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          quotedPrice: price ? parseFloat(price) : undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setQuote(data.quote);
      }
    } catch {
      // silent
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-gray-500 p-6">Loading...</div>;
  if (!quote) return <div className="text-red-500 p-6">Quote not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/quotes" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{quote.quoteNumber}</h1>
          <p className="text-gray-500 text-sm">Submitted on {new Date(quote.createdAt).toLocaleDateString()}</p>
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
              <dd className="text-sm text-gray-900">{quote.customerName}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</dt>
              <dd className="text-sm text-gray-900">{quote.customerEmail}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</dt>
              <dd className="text-sm text-gray-900">{quote.customerPhone || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Company</dt>
              <dd className="text-sm text-gray-900">{quote.customerCompany || "—"}</dd>
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
                <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 text-sm font-medium">View</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Update */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
              {Object.entries(QUOTE_STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Price (ETB)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-40" />
          </div>
          <button onClick={handleUpdate} disabled={updating} className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 disabled:opacity-50">
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}