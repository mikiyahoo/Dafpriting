import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#141414]">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 p-4 lg:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}