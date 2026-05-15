import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Blog | Daf Printing" };

const posts = [
  {
    title: "5 Tips for Choosing the Right Paper Stock for Your Print Project",
    excerpt: "The paper you choose can make or break your print project. Here's our guide to selecting the perfect paper stock for any application.",
    date: "Apr 28, 2026",
    category: "Tips",
    slug: "choosing-right-paper-stock",
  },
  {
    title: "Digital vs. Offset Printing: Which Is Right for You?",
    excerpt: "Understanding the differences between digital and offset printing can save you time and money. We break down the pros and cons of each method.",
    date: "Apr 15, 2026",
    category: "Education",
    slug: "digital-vs-offset-printing",
  },
  {
    title: "How to Prepare Print-Ready Files: A Complete Guide",
    excerpt: "Save time and avoid costly mistakes by following our step-by-step guide to preparing print-ready files for your next project.",
    date: "Mar 30, 2026",
    category: "Guide",
    slug: "prepare-print-ready-files",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">Our Blog</h1>
            <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
              Insights, tips, and guides from the Daf Printing team.
            </p>
            <div className="grid gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-amber-200 transition-colors">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded font-medium">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-block mt-4 text-amber-600 hover:text-amber-700 font-medium text-sm">
                    Read More &rarr;
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}