import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | Admin | Radiance",
  description: "Manage service packages",
};

export default function AdminPackagesPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-white mb-3">Packages</h1>
      <p className="text-gray-400">Package management coming soon in Phase 2.</p>
    </div>
  );
}