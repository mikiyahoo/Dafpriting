import { SessionProvider } from "@/components/admin/SessionProvider";

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}