import { Metadata } from "next";
import { PackageViewer } from "@/components/admin/PackageViewer";

export const metadata: Metadata = {
  title: "Packages | Admin | Radiance",
  description: "View public service packages",
};

export default function AdminPackagesViewPage() {
  return <PackageViewer />;
}