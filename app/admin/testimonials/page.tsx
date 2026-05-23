"use client";

import { useState, useEffect } from "react";
import type { TestimonialRecord } from "@/features/testimonials/types";
import { Star, Pencil, Trash2, X, Plus, Upload, Check, Eye, Image as ImageIcon, User, Sparkles } from "lucide-react";

const CLIPART_AVATARS = [
  { id: "bottts-1", label: "Robot #1", url: "https://api.dicebear.com/7.x/bottts/svg?seed=Michael", style: "bottts" },
  { id: "bottts-2", label: "Robot #2", url: "https://api.dicebear.com/7.x/bottts/svg?seed=Jane", style: "bottts" },
  { id: "fun-1", label: "Fun Emoji #1", url: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Happy", style: "fun-emoji" },
  { id: "fun-2", label: "Fun Emoji #2", url: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Smile", style: "fun-emoji" },
  { id: "adventurer-1", label: "Adventurer #1", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice", style: "adventurer" },
  { id: "adventurer-2", label: "Adventurer #2", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bob", style: "adventurer" },
  { id: "adventurer-3", label: "Adventurer #3", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie", style: "adventurer" },
  { id: "adventurer-4", label: "Adventurer #4", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=Diana", style: "adventurer" },
];

const RATING_LABELS: Record<number, string> = {
  1: "Poor", 2: "Fair", 3: "Good", 4: "Great", 5: "Excellent",
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarTab, setAvatarTab] = useState<"upload" | "clipart" | "initials">("upload");

  const [form, setForm] = useState({
    customerName: "", company: "", review: "", rating: 5,
    isApproved: false, isFeatured: false,
    avatarUrl: "", avatarType: "none",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (statusFilter === "approved") params.set("approved", "true");
        else if (statusFilter === "pending") params.set("approved", "false");
        const res = await fetch(`/api/testimonials?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setTestimonials(data.items || []);
        }
      } catch (err) {
        if (!cancelled) console.error("Failed to fetch:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [statusFilter]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ customerName: "", company: "", review: "", rating: 5, isApproved: false, isFeatured: false, avatarUrl: "", avatarType: "none" });
    setAvatarTab("upload");
    setErrors({});
    setModalOpen(true);
  };

  const openEditModal = (t: TestimonialRecord) => {
    setEditingId(t.id);
    setForm({
      customerName: t.customerName, company: t.company || "", review: t.review,
      rating: t.rating, isApproved: t.isApproved, isFeatured: t.isFeatured,
      avatarUrl: t.avatarUrl || "", avatarType: t.avatarType || "none",
    });
    setAvatarTab(t.avatarType === "upload" ? "upload" : t.avatarType === "clipart" ? "clipart" : "initials");
    setErrors({});
    setModalOpen(true);
  };

  const reloadTestimonials = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter === "approved") params.set("approved", "true");
      else if (statusFilter === "pending") params.set("approved", "false");
      const res = await fetch(`/api/testimonials?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.items || []);
      }
    } catch (err) {
      console.error("Failed to reload:", err);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.customerName.trim()) errs.customerName = "Name is required";
    else if (form.customerName.trim().length < 2) errs.customerName = "Name must be at least 2 characters";
    if (!form.review.trim()) errs.review = "Review is required";
    else if (form.review.trim().length < 10) errs.review = "Review must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        customerName: form.customerName.trim(),
        company: form.company.trim() || null,
        review: form.review.trim(),
        rating: form.rating,
        isApproved: form.isApproved,
        isFeatured: form.isFeatured,
        avatarUrl: form.avatarType === "none" ? null : (form.avatarUrl || null),
        avatarType: form.avatarType,
      };

      let res;
      if (editingId) {
        res = await fetch(`/api/testimonials/${editingId}`, {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/testimonials", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
      }

      if (res.ok) { setModalOpen(false); await reloadTestimonials(); }
      else { const errData = await res.json(); setErrors({ form: errData.error || "Failed to save" }); }
    } catch { setErrors({ form: "Network error" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) await reloadTestimonials();
    } catch (err) { console.error("Delete failed:", err); }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, avatarUrl: data.url, avatarType: "upload" }));
      }
    } catch (err) { console.error("Upload failed:", err); }
    finally { setUploading(false); }
  };

  const selectClipart = (url: string) => {
    setForm((prev) => ({ ...prev, avatarUrl: url, avatarType: "clipart" }));
  };

  const selectInitials = () => {
    setForm((prev) => ({ ...prev, avatarUrl: "", avatarType: "none" }));
  };

  const renderAvatar = (t: { customerName: string; avatarUrl?: string | null; avatarType?: string | null }) => {
    if (t.avatarUrl && (t.avatarType === "upload" || t.avatarType === "clipart")) {
      const isSvg = t.avatarUrl.includes("dicebear");
      return (
        <img src={t.avatarUrl} alt={t.customerName}
          className={`${isSvg ? "w-10 h-10 bg-gray-100 p-1" : "w-10 h-10 object-cover"} rounded-full border-2 border-gray-100`}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      );
    }
    const initials = getInitials(t.customerName);
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
        {initials}
      </div>
    );
  };

  const renderAvatarPreview = () => {
    const { avatarUrl, avatarType, customerName } = form;
    if (avatarType === "none" || !avatarUrl) {
      const initials = getInitials(customerName || "?");
      return (
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-lg font-bold border-2 border-gray-200">
          {initials}
        </div>
      );
    }
    const isSvg = avatarUrl.includes("dicebear");
    return (
      <img src={avatarUrl} alt="Preview"
        className={`${isSvg ? "w-16 h-16 bg-gray-50 p-1.5" : "w-16 h-16 object-cover"} rounded-full border-2 border-gray-200`}
      />
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer reviews and testimonials</p>
        </div>
        <button onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6">
        {["all", "approved", "pending"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              statusFilter === s ? "bg-gray-900 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Company</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Review</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Rating</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Featured</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-12 text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /> Loading...
                </div>
              </td></tr>
            ) : testimonials.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12">
                  <p className="text-gray-400 mb-2">No testimonials found in the database.</p>
                  <p className="text-xs text-gray-400">
                    Add your first testimonial above, or run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-amber-600 font-mono">npx tsx prisma/seed.ts</code> to seed sample data.
                  </p>
                </td>
              </tr>
            ) : testimonials.map((t) => (
              <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">{renderAvatar(t)}</div>
                    <span className="font-medium text-gray-900">{t.customerName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{t.company || "—"}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs"><span className="line-clamp-2">{t.review}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {t.isApproved ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                      <Check className="w-3 h-3" /> Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                      <Eye className="w-3 h-3" /> Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {t.isFeatured ? (
                    <span className="text-amber-600 font-medium text-xs bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">★ Featured</span>
                  ) : <span className="text-gray-400 text-xs">—</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(t)} className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {errors.form && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{errors.form}</div>}

              {/* Avatar Section with Tabs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Avatar</label>
                <div className="flex items-center gap-4 mb-4">
                  {renderAvatarPreview()}
                  <div className="text-sm text-gray-500">
                    {form.avatarType === "upload" && <span className="text-primary font-medium">Custom Upload</span>}
                    {form.avatarType === "clipart" && <span className="text-purple-600 font-medium">Clipart Mascot</span>}
                    {form.avatarType === "none" && <span className="text-gray-400">Initials Fallback</span>}
                  </div>
                </div>

                {/* Tab buttons */}
                <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg">
                  <button onClick={() => setAvatarTab("upload")}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      avatarTab === "upload" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}>
                    <Upload className="w-3.5 h-3.5" /> Upload
                  </button>
                  <button onClick={() => setAvatarTab("clipart")}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      avatarTab === "clipart" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}>
                    <Sparkles className="w-3.5 h-3.5" /> Clipart
                  </button>
                  <button onClick={() => { selectInitials(); setAvatarTab("initials"); }}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      avatarTab === "initials" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}>
                    <User className="w-3.5 h-3.5" /> Initials
                  </button>
                </div>

                {/* Upload Tab */}
                {avatarTab === "upload" && (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-primary/30 transition-colors">
                    <label className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-1">{uploading ? "Uploading..." : "Click to upload a photo"}</p>
                      <p className="text-xs text-gray-400">JPG, PNG, WebP • 300×300px recommended</p>
                      <input type="file" accept="image/*" className="hidden" onChange={handleUploadImage} disabled={uploading} />
                    </label>
                    {form.avatarUrl && form.avatarType === "upload" && (
                      <button onClick={() => setForm((prev) => ({ ...prev, avatarUrl: "", avatarType: "none" }))}
                        className="mt-3 text-xs text-red-500 hover:text-red-600">Remove</button>
                    )}
                  </div>
                )}

                {/* Clipart Tab */}
                {avatarTab === "clipart" && (
                  <div>
                    <p className="text-xs text-gray-500 mb-3">Choose a Discord-style illustrated avatar:</p>
                    <div className="grid grid-cols-4 gap-3">
                      {CLIPART_AVATARS.map((av) => (
                        <button key={av.id} onClick={() => selectClipart(av.url)}
                          className={`p-2 rounded-lg border-2 transition-all ${
                            form.avatarUrl === av.url
                              ? "border-amber-500 bg-amber-50 scale-105 shadow-md"
                              : "border-gray-100 hover:border-gray-300 hover:shadow-sm"
                          }`}>
                          <img src={av.url} alt={av.label} className="w-full aspect-square bg-gray-50 rounded-md" />
                          <p className="text-[10px] text-gray-500 mt-1 truncate">{av.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Initials Tab */}
                {avatarTab === "initials" && (
                  <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-lg font-bold mx-auto mb-2 border-2 border-white shadow-sm">
                      {getInitials(form.customerName || "?")}
                    </div>
                    <p className="text-sm text-gray-600">Dynamic initials will be generated from the customer name</p>
                    <p className="text-xs text-gray-400 mt-1">Color is auto-assigned based on index</p>
                  </div>
                )}
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name <span className="text-red-500">*</span></label>
                <input type="text" value={form.customerName} onChange={(e) => setForm((prev) => ({ ...prev, customerName: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.customerName ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                  placeholder="John Doe" />
                {errors.customerName && <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" value={form.company} onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  placeholder="Acme Corp (optional)" />
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review <span className="text-red-500">*</span></label>
                <textarea value={form.review} onChange={(e) => setForm((prev) => ({ ...prev, review: e.target.value }))}
                  rows={3} className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none ${errors.review ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                  placeholder="Amazing service! They delivered exactly what I needed..." />
                {errors.review && <p className="text-xs text-red-500 mt-1">{errors.review}</p>}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setForm((prev) => ({ ...prev, rating: star }))} className="transition-transform hover:scale-110">
                      <Star className={`w-8 h-8 ${star <= form.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 hover:text-gray-300"}`} />
                    </button>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">{RATING_LABELS[form.rating]}</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setForm((prev) => ({ ...prev, isApproved: !prev.isApproved }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${form.isApproved ? "bg-green-500" : "bg-gray-200"}`}>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isApproved ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Approved</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setForm((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${form.isFeatured ? "bg-amber-500" : "bg-gray-200"}`}>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isFeatured ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Featured</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
              <button onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                ) : (
                  <><Check className="w-4 h-4" /> {editingId ? "Update" : "Create"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}