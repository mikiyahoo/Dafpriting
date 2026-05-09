import { redirect } from "next/navigation";

export default async function AdminBookingInvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/admin/weddings/${id}`);
}
