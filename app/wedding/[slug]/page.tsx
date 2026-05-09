import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WeddingExperienceClient } from "@/components/wedding/WeddingExperienceClient";
import { WeddingInvitationRecord } from "@/types";

interface WeddingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WeddingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await prisma.weddingInvitation.findUnique({
    where: { slug },
    select: {
      brideName: true,
      groomName: true,
      customMessage: true,
      welcomeMessage: true,
      heroImageUrl: true,
      coverImage: true,
      isPublished: true,
      status: true,
    },
  });

  if (!invitation || (!invitation.isPublished && invitation.status !== "PUBLISHED")) {
    return { title: "Wedding Invitation | Radiance" };
  }

  return {
    title: `${invitation.brideName} & ${invitation.groomName} | Radiance Wedding`,
    description:
      invitation.customMessage ||
      invitation.welcomeMessage ||
      `Celebrate the wedding of ${invitation.brideName} and ${invitation.groomName}.`,
    openGraph: {
      title: `${invitation.brideName} & ${invitation.groomName}`,
      description: "A Radiance digital wedding invitation.",
      images: invitation.heroImageUrl || invitation.coverImage ? [invitation.heroImageUrl || invitation.coverImage || ""] : undefined,
    },
  };
}

export default async function WeddingPage({ params }: WeddingPageProps) {
  const { slug } = await params;
  const invitation = await prisma.weddingInvitation.findUnique({
    where: { slug },
    include: {
      gifts: { orderBy: [{ priority: "desc" }, { createdAt: "asc" }] },
    },
  });

  if (!invitation || (!invitation.isPublished && invitation.status !== "PUBLISHED")) {
    notFound();
  }

  return (
    <WeddingExperienceClient
      invitation={JSON.parse(JSON.stringify(invitation)) as WeddingInvitationRecord}
    />
  );
}
