"use client";

import { useState, useEffect } from "react";
import { megaMenuCategories } from "@/components/layout/headerData";
import type { PortfolioItemRecord } from "@/features/portfolio/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const defaultForm = {
  title: "",
  description: "",
  coverImage: "",
  category: "",
  itemType: "",
  clientName: "",
  featured: false,
  isActive: true,
};

export default function AdminWorksPage() {
  const [items, setItems] = useState<PortfolioItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const selectedCategory = megaMenuCategories.find((c) => c.id === form.category);
  const subItems = selectedCategory?.subItems || [];

  const openCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const openEdit = (item: PortfolioItemRecord) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description || "",
      coverImage: item.coverImage || "",
      category: item.category,
      itemType: item.itemType,
      clientName: item.clientName || "",
      featured: item.featured,
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  const refetch = () => {
    (async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
        }
      } catch {
        // silent
      }
    })();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        clientName: form.clientName ? toTitleCase(form.clientName) : "",
      };

      let res;
      if (editingId) {
        res = await fetch(`/api/portfolio/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setShowModal(false);
        refetch();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save");
      }
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this work item?")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) refetch();
    } catch {
      // silent
    }
  };

  if (loading) return <div className="text-gray-500 p-6">Loading works...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Works</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"
        >
          <Plus className="w-4 h-4" /> Add New Work
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Item Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Client</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Featured</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Active</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-gray-400">No works yet.</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3 text-gray-600">{selectedCategory?.label || item.category}</td>
                <td className="px-4 py-3 text-gray-600">{item.itemType}</td>
                <td className="px-4 py-3 text-gray-600">{item.clientName || "—"}</td>
                <td className="px-4 py-3">{item.featured ? <span className="text-green-600 text-xs font-medium">Featured</span> : <span className="text-gray-400 text-xs">—</span>}</td>
                <td className="px-4 py-3">{item.isActive ? <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">Active</span> : <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded">Inactive</span>}</td>
                <td className="px-4 py-3 space-x-2">
                  <button onClick={() => openEdit(item)} className="text-amber-600 hover:text-amber-700 text-xs font-medium inline-flex items-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 text-xs font-medium inline-flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="bg-white w-[90%] max-w-lg rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? "Edit Work" : "Add New Work"}</h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="e.g. Premium Corporate Business Cards" />
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image URL</label>
                <input type="text" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="/assets/Works/Business Card.jpg" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="Brief description..." />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value, itemType: "" })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="">Select a category...</option>
                  {megaMenuCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Item Type Dropdown (populated based on category) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Item Type *</label>
                <select
                  value={form.itemType}
                  onChange={(e) => setForm({ ...form, itemType: e.target.value })}
                  disabled={!form.category}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">{form.category ? "Select item type..." : "Choose a category first"}</option>
                  {subItems.map((sub) => (
                    <option key={sub.label} value={sub.label}>{sub.label}</option>
                  ))}
                </select>
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Client Name (optional)</label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. abc company → Abc Company (auto-formatted)"
                />
                {form.clientName && (
                  <p className="text-xs text-gray-400 mt-1">Preview: <span className="font-medium text-gray-600">{toTitleCase(form.clientName)}</span></p>
                )}
              </div>

              {/* Featured & Active Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.category || !form.itemType} className="px-5 py-2.5 bg-amber-500 text-white font-bold rounded-lg text-sm hover:bg-amber-600 disabled:opacity-50">
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}