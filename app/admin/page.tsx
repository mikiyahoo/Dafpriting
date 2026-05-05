import { Metadata } from "next";
import { Dashboard } from "@/components/admin/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Admin | Radiance",
  description: "Admin dashboard overview",
};

export default function AdminDashboardPage() {
  return <Dashboard />;
}