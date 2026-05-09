import { Metadata } from "next";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const metadata: Metadata = {
  title: "Gallery | Admin | Radiance",
  description: "Manage gallery images",
};

export default function AdminGalleryPage() {
  return <GalleryManager />;
}
