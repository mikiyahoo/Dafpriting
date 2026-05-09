import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | Admin | Radiance",
  description: "Manage service packages",
};

export default function AdminPackagesPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6">
          <Link href="/admin/packages/view" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg {`text-gray-900 bg-gray-50`}">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            View Packages
          </Link>
          
          <Link href="/admin/packages/manage" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-100">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Manage Packages & Categories
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-600">
            Manage your service packages, categories, pricing, and features.
          </p>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              Select an option from the sidebar to view or manage packages.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}