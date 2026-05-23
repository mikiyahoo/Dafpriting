"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from "@/features/quotes/types";

interface QuoteItem {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  customerCompany: string | null;
  service: { title: string };
  quantity: number;
  status: string;
  createdAt: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [services, setServices] = useState<{ id: string; title: string }[]>([]);

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerCompany: "",
    serviceId: "",
    quantity: "1",
    size: "",
    material: "",
    notes: "",
  });

  const totalPages = useMemo(() => Math.ceil(total / 20), [total]);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (statusFilter) params.set("status", statusFilter);
      if (search) params.set("search", search);
      const res = await fetch(`/api/quotes?${params}`);
      const data = await res.json();
      setQuotes(data.quotes || []);
      setTotal(data.total || 0);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data.services || []);
    } catch {
      // silent
    }
  };

  useEffect(() => { fetchQuotes(); }, [page, statusFilter]);
  useEffect(() => { if (showCreateModal) fetchServices(); }, [showCreateModal]);

  const handleSubmit = async () => {
    if (!form.customerName || !form.customerEmail || !form.serviceId || !form.quantity) {
      alert("Name, email, service, and quantity are required");
      return;
    }
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setForm({ customerName: "", customerEmail: "", customerPhone: "", customerCompany: "", serviceId: "", quantity: "1", size: "", material: "", notes: "" });
        fetchQuotes();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create quote");
      }
    } catch {
      alert("Failed to create quote");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchQuotes();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"
        >
          <Plus className="w-4 h-4" /> New Quote
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, email, or quote #"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Statuses</option>
              {Object.entries(QUOTE_STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
            Filter
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Quote #</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Service</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Qty</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">Loading...</td></tr>
              ) : quotes.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No quote requests found.</td></tr>
              ) : (
                quotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{quote.quoteNumber}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{quote.customerName}</div>
                      <div className="text-gray-400 text-xs">{quote.customerEmail}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{quote.service.title}</td>
                    <td className="px-4 py-3 text-gray-600">{quote.quantity}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${QUOTE_STATUS_COLORS[quote.status] || ""}`}>
                        {QUOTE_STATUS_LABELS[quote.status] || quote.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/quotes/${quote.id}`} className="text-amber-600 hover:text-amber-700 font-medium">View</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <p className="text-gray-500">Page {page} of {totalPages} ({total} total)</p>
          <div className="flex gap-2">
            {page > 1 && (
              <button onClick={() => setPage(page - 1)} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Previous</button>
            )}
            {page < totalPages && (
              <button onClick={() => setPage(page + 1)} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
            )}
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setShowCreateModal(false); }}>
          <div className="bg-white w-[90%] max-w-lg rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Create Quote</h2>
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                  <input type="text" value={form.customerName} onChange={(e) => setForm({...form, customerName: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                  <input type="email" value={form.customerEmail} onChange={(e) => setForm({...form, customerEmail: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <input type="text" value={form.customerPhone} onChange={(e) => setForm({...form, customerPhone: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
                  <input type="text" value={form.customerCompany} onChange={(e) => setForm({...form, customerCompany: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service *</label>
                <select value={form.serviceId} onChange={(e) => setForm({...form, serviceId: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm">
                  <option value="">Select service...</option>
                  {services.map((s) => (<option key={s.id} value={s.id}>{s.title}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity *</label>
                  <input type="number" value={form.quantity} onChange={(e) => setForm({...form, quantity: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Size</label>
                  <input type="text" value={form.size} onChange={(e) => setForm({...form, size: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Material</label>
                  <input type="text" value={form.material} onChange={(e) => setForm({...form, material: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm">Cancel</button>
              <button onClick={handleSubmit} className="px-5 py-2.5 bg-amber-500 text-white font-bold rounded-lg text-sm hover:bg-amber-600">Create Quote</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}