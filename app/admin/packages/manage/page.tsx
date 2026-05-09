import { Metadata } from "next";
import { PackageManager } from "@/components/admin/PackageManager";

export const metadata: Metadata = {
  title: "Manage Packages | Admin | Radiance",
  description: "Create and edit service packages and categories",
};

export default function AdminPackagesManagePage() {
  return <PackageManager />;
}