import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { FileText, Users, ShoppingBag, MessageSquare, Truck } from "lucide-react";
import Link from "next/link";
import { DatabaseSeedButton } from "@/components/admin/DatabaseSeedButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Admin | Daf Printing",
  description: "Admin dashboard overview",
};

async function getStats() {
  try {
    const [
      totalQuotes,
      pendingQuotes,
      totalCustomers,
      totalServices,
      totalTestimonials,
      totalOrders,
      recentQuotes,
    ] = await Promise.all([
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({ where: { status: "PENDING" } }),
      prisma.customer.count(),
      prisma.service.count({ where: { isActive: true } }),
      prisma.testimonial.count({ where: { isApproved: true } }),
      prisma.quoteRequest.count({ where: { status: { in: ["ACCEPTED", "QUOTED"] } } }),
      prisma.quoteRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { customer: true, service: true },
      }),
    ]);

    return { totalQuotes, pendingQuotes, totalCustomers, totalServices, totalTestimonials, totalOrders, recentQuotes };
  } catch {
    return { totalQuotes: 0, pendingQuotes: 0, totalCustomers: 0, totalServices: 0, totalTestimonials: 0, totalOrders: 0, recentQuotes: [] };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      label: "Total Quotes",
      value: stats.totalQuotes,
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
      href: "/admin/quotes",
    },
    {
      label: "Pending Quotes",
      value: stats.pendingQuotes,
      icon: ShoppingBag,
      color: "bg-amber-50 text-amber-600",
      href: "/admin/quotes?status=PENDING",
    },
    {
      label: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "bg-green-50 text-green-600",
      href: "/admin/customers",
    },
    {
      label: "Active Services",
      value: stats.totalServices,
      icon: ShoppingBag,
      color: "bg-purple-50 text-purple-600",
      href: "/admin/services",
    },
    {
      label: "Active Orders",
      value: stats.totalOrders,
      icon: Truck,
      color: "bg-indigo-50 text-indigo-600",
      href: "/admin/quotes?status=ACCEPTED",
    },
    {
      label: "Testimonials",
      value: stats.totalTestimonials,
      icon: MessageSquare,
      color: "bg-pink-50 text-pink-600",
      href: "/admin/testimonials",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your printing business</p>
      </div>

      {/* Database Setup */}
      <DatabaseSeedButton />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Quotes */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Quote Requests</h2>
          <Link
            href="/admin/quotes"
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          {stats.recentQuotes.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No quote requests yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Quote #</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Service</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentQuotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{quote.quoteNumber}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{quote.customer.name}</div>
                      <div className="text-gray-400 text-xs">{quote.customer.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{quote.service.title}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/quotes/${quote.id}`}
                        className="text-amber-600 hover:text-amber-700 font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}