import { Metadata } from "next";
import { WeddingInvitationBuilder } from "@/components/admin/WeddingInvitationBuilder";

export const metadata: Metadata = {
  title: "Wedding Experience Builder | Admin | Radiance",
  description: "Create and publish a Radiance wedding invitation microsite",
};

export default async function AdminWeddingBuilderPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  return <WeddingInvitationBuilder bookingId={bookingId} />;
}
