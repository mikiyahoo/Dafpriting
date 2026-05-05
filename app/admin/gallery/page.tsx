import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Admin | Radiance",
  description: "Manage gallery images",
};

export default function AdminGalleryPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-white mb-3">Gallery</h1>
      <p className="text-gray-400">Gallery management coming soon in Phase 2.</p>
    </div>
  );
}