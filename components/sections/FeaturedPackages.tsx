import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

export async function FeaturedPackages() {
  const packages = await prisma.package.findMany({
    where: { isActive: true, isFeatured: true, category: { isActive: true } },
    include: { category: true },
    orderBy: [{ isPopular: "desc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
    take: 3,
  });

  if (packages.length === 0) return null;

  return (
    <Section className="bg-radiance-cream/40">
      <Container>
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-radiance-navy/60">
              Featured Packages
            </p>
            <h2 className="text-3xl font-light tracking-tight text-radiance-navy md:text-4xl">
              Curated ways to begin
            </h2>
          </div>
          <Link
            href="/packages"
            className="text-sm font-semibold text-amber-700 hover:text-amber-600"
          >
            View all packages
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((item) => (
            <Link
              key={item.id}
              href="/packages"
              className="group overflow-hidden rounded-lg border border-radiance-navy/10 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-white">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-radiance-navy/35">
                    <Star className="h-10 w-10" />
                  </div>
                )}
                {item.isPopular && (
                  <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-radiance-navy/50">
                  {item.category.name}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-radiance-navy">
                  {item.name}
                </h3>
                <p className="mt-2 font-semibold text-amber-700">{item.priceLabel}</p>
                <p className="mt-3 text-sm leading-6 text-radiance-navy/65">
                  {item.shortDesc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
