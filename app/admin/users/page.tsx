import { Metadata } from "next";
import { UserManagement } from "@/components/admin/UserManagement";

export const metadata: Metadata = {
  title: "Admin Users | Radiance",
  description: "Manage admin users and permissions",
};

export default function AdminUsersPage() {
  return <UserManagement />;
}