import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | Admin | Radiance",
  description: "Manage service packages",
};

export default function AdminPackagesPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Packages</h1>
      <p className="text-gray-600">Package management coming soon in Phase 2.</p>
    </div>
  );
}