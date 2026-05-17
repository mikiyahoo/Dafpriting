"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Pencil, Trash2, X, GripVertical, ChevronDown, Link2, Globe } from "lucide-react";

interface Banner {
  id: string;
  title: string | null;
  imageUrl: string;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

interface SiteLink {
  label: string;
  url: string;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    linkUrl: "",
    sortOrder: 0,
  });
  const [saving, setSaving] = useState(false);

  // Link dropdown state
  const [siteLinks, setSiteLinks] = useState<SiteLink[]>([]);
  const [linkDropdownOpen, setLinkDropdownOpen] = useState(false);
  const [linksLoading, setLinksLoading] = useState(false);
  const linkDropdownRef = useRef<HTMLDivElement>(null);

  const fetchBanners = useCallback(async () => {
    try {
      const res = await fetch("/api/banners");
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Fetch available site links for the dropdown
  const fetchSiteLinks = useCallback(async () => {
    setLinksLoading(true);
    try {
      const res = await fetch("/api/site-links");
      const data = await res.json();
      setSiteLinks(data);
    } catch (error) {
      console.error("Failed to fetch site links:", error);
    } finally {
      setLinksLoading(false);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (linkDropdownRef.current && !linkDropdownRef.current.contains(event.target as Node)) {
        setLinkDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", imageUrl: "", linkUrl: "", sortOrder: banners.length });
    setShowModal(true);
    fetchSiteLinks();
  };

  const openEdit = (banner: Banner) => {
    setEditing(banner);
    setForm({
      title: banner.title || "",
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl || "",
      sortOrder: banner.sortOrder,
    });
    setShowModal(true);
    fetchSiteLinks();
  };

  const selectLink = (url: string) => {
    setForm((prev) => ({ ...prev, linkUrl: url }));
    setLinkDropdownOpen(false);
  };

  const filteredLinks = siteLinks.filter(
    (link) =>
      !form.linkUrl ||
      link.label.toLowerCase().includes(form.linkUrl.toLowerCase()) ||
      link.url.toLowerCase().includes(form.linkUrl.toLowerCase())
  );

  const getLinkLabel = () => {
    if (!form.linkUrl) return "Select a page or enter custom URL...";
    const match = siteLinks.find((l) => l.url === form.linkUrl);
    if (match) return match.label;
    return `Custom: ${form.linkUrl}`;
  };

  const handleSave = async () => {
    if (!form.imageUrl) return;
    setSaving(true);

    try {
      const url = editing ? `/api/banners/${editing.id}` : "/api/banners";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");

      setShowModal(false);
      fetchBanners();
    } catch (error) {
      console.error("Failed to save banner:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteConfirm(null);
      fetchBanners();
    } catch (error) {
      console.error("Failed to delete banner:", error);
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    try {
      await fetch(`/api/banners/${banner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !banner.isActive }),
      });
      fetchBanners();
    } catch (error) {
      console.error("Failed to toggle banner:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Ads</h1>
          <p className="text-gray-500 mt-1">Manage homepage hero slider banners</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Banner
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {banners.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium mb-1">No banners yet</p>
            <p className="text-sm">Add your first banner ad to display on the homepage hero slider.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
                <div className="w-24 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {banner.imageUrl ? (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title || "Banner"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-gray-300">?</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {banner.title || "Untitled Banner"}
                    </h3>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        banner.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{banner.imageUrl}</p>
                  {banner.linkUrl && (
                    <p className="text-xs text-blue-500 mt-1 truncate">
                      <Link2 className="w-3 h-3 inline mr-1" />
                      {banner.linkUrl}
                    </p>
                  )}
                  {!banner.imageUrl && (
                    <p className="text-xs text-red-400 mt-1">⚠ No image URL set</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    Slide {banner.sortOrder + 1}
                  </span>
                  <button
                    onClick={() => handleToggleActive(banner)}
                    className={`p-2 rounded-lg transition-colors ${
                      banner.isActive
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                    title={banner.isActive ? "Deactivate" : "Activate"}
                  >
                    <span className="w-4 h-4 block rounded-full border-2 border-current" />
                  </button>
                  <button
                    onClick={() => openEdit(banner)}
                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(banner.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {editing ? "Edit Banner" : "Add Banner Slide"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="https://example.com/banner.jpg or /assets/banners/..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  <span className="text-amber-600 font-medium">Recommended size:</span> 1920×600px. Max 2MB. JPG, PNG or WebP.
                </p>
                {form.imageUrl && (
                  <div className="mt-2 w-full h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="e.g. High-impact print campaigns"
                />
              </div>

              {/* Link URL Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Link2 className="w-4 h-4 inline mr-1" />
                  Link URL
                </label>
                <div className="relative" ref={linkDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkDropdownOpen(!linkDropdownOpen);
                      if (!linkDropdownOpen && siteLinks.length === 0) fetchSiteLinks();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-left"
                  >
                    <span className={`truncate ${form.linkUrl ? "text-gray-900" : "text-gray-400"}`}>
                      {getLinkLabel()}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${linkDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {linkDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          type="text"
                          value={form.linkUrl}
                          onChange={(e) => setForm((prev) => ({ ...prev, linkUrl: e.target.value }))}
                          placeholder="Search or type custom URL..."
                          className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-amber-500 outline-none"
                          autoFocus
                        />
                      </div>

                      {linksLoading ? (
                        <div className="p-4 text-center text-sm text-gray-400">Loading links...</div>
                      ) : (
                        <div>
                          {/* Custom URL option */}
                          {form.linkUrl && !siteLinks.some((l) => l.url === form.linkUrl) && (
                            <button
                              onClick={() => selectLink(form.linkUrl)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 font-medium"
                            >
                              <Globe className="w-4 h-4" />
                              Link to: {form.linkUrl}
                            </button>
                          )}

                          {/* Divider */}
                          <div className="px-3 py-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Site Pages
                          </div>

                          {filteredLinks.length === 0 ? (
                            <div className="p-4 text-center text-sm text-gray-400">
                              No matching pages found
                            </div>
                          ) : (
                            filteredLinks.map((link) => (
                              <button
                                key={link.url}
                                onClick={() => selectLink(link.url)}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                                  form.linkUrl === link.url
                                    ? "bg-amber-50 text-amber-700 font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                <Link2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                <span className="truncate">{link.label}</span>
                                <span className="text-xs text-gray-400 ml-auto flex-shrink-0 truncate max-w-[100px]">
                                  {link.url}
                                </span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Choose a page from the dropdown or type a custom URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order (position)</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  min={0}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Lower numbers appear first. Set to 0, 1, 2 for 3 slides.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.imageUrl}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
              >
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Banner</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this banner? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}