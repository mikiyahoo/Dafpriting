import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Customers | Admin | Daf Printing" };

interface PageProps { searchParams: { search?: string; page?: string } }

export default async function AdminCustomersPage({ searchParams }: PageProps) {
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 20;
  const skip = (page - 1) * limit;

  const where = search
    ? { OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
      ] }
    : {};

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      include: { _count: { select: { quotes: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.customer.count({ where }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <form className="flex gap-3 items-end">
          <div className="flex-1">
            <input type="text" name="search" defaultValue={search} placeholder="Search by name or email..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <button type="submit" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg">Search</button>
        </form>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b">
            <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Phone</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Quotes</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Joined</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr></thead>
          <tbody>
            {customers.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">No customers found.</td></tr>
            ) : customers.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-gray-600">{c.email}</td>
                <td className="px-4 py-3 text-gray-600">{c.phone || "—"}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium">{c._count.quotes}</span></td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3"><Link href={`/admin/customers/${c.id}`} className="text-amber-600 hover:text-amber-700 font-medium">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}