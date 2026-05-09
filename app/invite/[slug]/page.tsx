import { redirect } from "next/navigation";

export default async function InviteAliasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/wedding/${slug}`);
}
