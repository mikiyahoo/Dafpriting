"use client";

import { useState, useEffect } from "react";
import { Database, CheckCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";

interface DatabaseStatus {
  users: number;
  categories: number;
  banners: number;
  services: number;
  adminExists: boolean;
}

export function DatabaseSeedButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [status, setStatus] = useState<DatabaseStatus | null>(null);
  const [checking, setChecking] = useState(false);

  const checkStatus = async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/admin/seed");
      const data = await res.json();
      if (data.status === "ok") {
        setStatus(data.database);
      }
    } catch (error) {
      console.error("Failed to check status:", error);
    } finally {
      setChecking(false);
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seed" }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        checkStatus();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to seed database" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check status on mount
  useEffect(() => {
    const init = async () => {
      setChecking(true);
      try {
        const res = await fetch("/api/admin/seed");
        const data = await res.json();
        if (data.status === "ok") {
          setStatus(data.database);
        }
      } catch (error) {
        console.error("Failed to check status:", error);
      } finally {
        setChecking(false);
      }
    };
    init();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-50">
          <Database className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">Database Setup</h3>
          <p className="text-sm text-gray-500 mt-1">
            Initialize your database with sample data and admin credentials.
          </p>

          {status && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Users</p>
                <p className="text-lg font-bold text-gray-900">{status.users}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Categories</p>
                <p className="text-lg font-bold text-gray-900">{status.categories}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Banners</p>
                <p className="text-lg font-bold text-gray-900">{status.banners}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Services</p>
                <p className="text-lg font-bold text-gray-900">{status.services}</p>
              </div>
            </div>
          )}

          {status?.adminExists ? (
            <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 rounded-lg px-4 py-2">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Admin user exists. You can log in with your credentials.</span>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 rounded-lg px-4 py-2">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">No admin user found. Click below to create one.</span>
            </div>
          )}

          {message && (
            <div
              className={`mt-4 rounded-lg px-4 py-3 ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSeed}
              disabled={loading || status?.adminExists}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  {status?.adminExists ? "Already Seeded" : "Seed Database"}
                </>
              )}
            </button>

            <button
              onClick={checkStatus}
              disabled={checking}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
              Refresh Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}