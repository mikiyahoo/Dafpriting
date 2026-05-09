import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PackageExplorer } from "@/components/public/PackageExplorer";
import { prisma } from "@/lib/prisma";
import { PackageCategoryRecord, PackageRecord } from "@/types";

export const metadata: Metadata = {
  title: "Our Event Packages | Radiance",
  description: "Flexible Radiance event packages tailored to your celebration.",
};

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const [categories, packages] = await Promise.all([
    prisma.packageCategory.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            packages: { where: { isActive: true } },
          },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
    prisma.package.findMany({
      where: { isActive: true, category: { isActive: true } },
      include: { category: true },
      orderBy: [
        { isPopular: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    }),
  ]);

  return (
    <>
      <Header />
      <main>
        <Section className="pt-32">
          <Container>
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-radiance-navy/60">
                Packages
              </p>
              <h1 className="text-4xl font-light tracking-tight text-radiance-navy md:text-5xl lg:text-6xl">
                Our Event Packages
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-radiance-navy/70">
                Flexible solutions tailored to your celebration.
              </p>
            </div>

            <div className="mt-12">
              <PackageExplorer
                categories={JSON.parse(JSON.stringify(categories)) as PackageCategoryRecord[]}
                packages={JSON.parse(JSON.stringify(packages)) as PackageRecord[]}
              />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
