"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Phone, Mail, Eye, EyeOff, Bell } from "lucide-react";

interface QuickRequest {
  id: string;
  phone: string;
  email: string | null;
  company: string | null;
  firstName: string;
  magazineType: string;
  quantity: number;
  isRead: boolean;
  createdAt: string;
}

export default function AdminQuickOrdersPage() {
  const [requests, setRequests] = useState<QuickRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await fetch("/api/quick-requests");
      const data = await res.json();
      if (!res.ok || !Array.isArray(data)) {
        console.error("Invalid response from quick-requests API:", data);
        setRequests([]);
        setUnreadCount(0);
        return;
      }
      setRequests(data);
      const unread = data.filter((r: QuickRequest) => !r.isRead).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Failed to fetch quick requests:", error);
      setRequests([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleToggleRead = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/quick-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !current }),
      });
      fetchRequests();
    } catch (error) {
      console.error("Failed to toggle read status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quick request?")) return;
    try {
      await fetch(`/api/quick-requests/${id}`, { method: "DELETE" });
      fetchRequests();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Quick Orders</h1>
            {unreadCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                <Bell className="w-3 h-3" />
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-gray-500 mt-1">Quick order requests from category pages</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {requests.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium mb-1">No quick orders yet</p>
            <p className="text-sm">Requests from the quick order form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Qty</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className={`border-b border-gray-100 hover:bg-gray-50 ${!req.isRead ? "bg-amber-50/50" : ""}`}>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${req.isRead ? "bg-gray-100 text-gray-500" : "bg-red-100 text-red-700"}`}>
                        {req.isRead ? "Read" : "New"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{req.firstName}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${req.phone}`} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {req.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {req.email ? (
                        <a href={`mailto:${req.email}`} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {req.email}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{req.company || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{req.magazineType}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{req.quantity}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleRead(req.id, req.isRead)}
                          className={`p-1.5 rounded-lg transition-colors ${req.isRead ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100" : "text-amber-600 hover:text-amber-700 hover:bg-amber-50"}`}
                          title={req.isRead ? "Mark as unread" : "Mark as read"}
                        >
                          {req.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(req.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}