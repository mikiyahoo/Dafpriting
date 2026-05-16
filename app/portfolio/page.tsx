import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Portfolio | Daf Printing",
  description: "Browse our portfolio of premium print projects. See the quality and craftsmanship that sets us apart.",
};

export default async function PortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <p className="text-secondary text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Our Work
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-6">
                Portfolio
              </h1>
              <p className="text-primary/70 text-lg leading-relaxed">
                A selection of projects we've brought to life. Each piece represents 
                our commitment to quality, precision, and customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.length === 0 ? (
                <p className="text-primary/50 col-span-2 text-center py-12">Portfolio items coming soon.</p>
              ) : items.map((item) => (
                <div
                  key={item.id}
                  className="group p-8 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  {item.coverImage && (
                    <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
