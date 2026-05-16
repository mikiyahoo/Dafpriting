"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Menu,
  X,
  LogOut,
  Image,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Truck,
  Grid3X3,
  Layers,
  PanelTop,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Quotes", href: "/admin/quotes", icon: FileText },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Banner Ads", href: "/admin/banners", icon: PanelTop },
  { label: "Quick Orders", href: "/admin/quick-orders", icon: MessageCircle },
  { label: "Categories", href: "/admin/categories", icon: Grid3X3 },
  { label: "Collections", href: "/admin/collections", icon: Layers },
  { label: "Portfolio", href: "/admin/portfolio", icon: Image },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Order Tracking", href: "/admin/tracking", icon: Truck },
  { label: "Services", href: "/admin/services", icon: Package },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch unread quick orders count every 10 seconds
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch("/api/quick-requests/unread-count");
        if (!res.ok) return;
        const data = await res.json();
        setUnreadCount(data.count || 0);
      } catch {
        // silent
      }
    };
    fetchUnread();
    intervalRef.current = setInterval(fetchUnread, 10000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white text-gray-900 p-2 rounded-md border border-gray-200"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                D
              </div>
              <span className="text-gray-900 font-semibold text-lg">
                <span className="text-secondary">Daf</span> Printing
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-amber-50 text-amber-600 border border-amber-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <div className="relative flex items-center gap-3 flex-1">
                    <Icon className="w-5 h-5" />
                    {item.label}
                    {item.href === "/admin/quick-orders" && unreadCount > 0 && (
                      <span className="absolute -top-1 -left-3 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-sm">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
