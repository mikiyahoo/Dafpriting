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
        <section className="pt-32 pb-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Our Work
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                  Portfolio
                </span>
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                A selection of projects we've brought to life. Each piece represents 
                our commitment to quality, precision, and customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {items.length === 0 ? (
                <p className="text-textMuted col-span-2 text-center py-16">Portfolio items coming soon.</p>
              ) : items.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative p-8 bg-bgPure rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.coverImage && (
                    <div className="w-full h-48 bg-gray-100 rounded-xl mb-6 overflow-hidden">
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <h3 className="text-xl font-black text-textMain mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-textMuted text-sm leading-relaxed">
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
