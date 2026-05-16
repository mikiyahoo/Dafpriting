"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ShoppingCart, Phone, Mail, User, Book, Layers, FileText } from "lucide-react";
import Link from "next/link";

const heroImages = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600&h=600&fit=crop",
];

const bindingTypes = [
  { name: "Stapled Binding", desc: "Affordable for booklets, brochures and catalogues with up to 40 pages." },
  { name: "Perfect Binding", desc: "Professional lay-flat binding for magazines, catalogues and softcover books." },
  { name: "Wire-o Binding", desc: "Lay-flat binding that allows 360-degree rotation for notebooks and reports." },
  { name: "Sewn Binding", desc: "Durable sewn binding for premium books and publications." },
  { name: "Large print-run magazines", desc: "High-volume magazine printing with optimized production workflow." },
];

const productTypes = [
  "Books", "Catalogues", "Magazines", "Brochures", "Premium Magazines",
  "Instruction manuals", "Menus", "Unbound Sheets", "Paper Sample Pack",
  "Bookmarks", "Magazine Display Stand", "Magazoo",
];

const magazineTypes = [
  "Magazine", "Book", "Catalogue", "Brochure", "Premium Magazine",
  "Instruction Manual", "Menu", "Unbound Sheets", "Bookmark",
];

export default function CategoryDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState({
    phone: "",
    email: "",
    company: "",
    firstName: "",
    magazineType: "Magazine",
    quantity: 100,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setInterval(() => setActiveImage((s) => (s + 1) % heroImages.length), 3500);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.firstName) {
      setError("Phone and First Name are required");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/quick-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      setForm({ phone: "", email: "", company: "", firstName: "", magazineType: "Magazine", quantity: 100 });
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* HERO SECTION */}
        <section className="pt-24 pb-16 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-sm text-white/50 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white/80">Magazines, Books & Catalogues</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Magazines, Books & Catalogues</h1>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Describe your brand, tell your story or showcase all your products in style. Choose the size, material and binding that suits you, and customise magazines, books and catalogues however you like quickly and easily.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#quick-order" className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-bgPure font-semibold text-sm rounded-lg hover:bg-secondary/90 shadow-lg">
                    Get a Quick Quote <ArrowRight size={16} />
                  </a>
                  <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold text-sm rounded-lg hover:bg-white/10">
                    Explore Options <Layers size={16} />
                  </button>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                {heroImages.map((img, i) => (
                  <div key={i} className={`absolute inset-0 transition-all duration-700 ${i === activeImage ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                    <img src={img} alt={`Magazine showcase ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeImage ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"}`} aria-label={`Image ${i + 1}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BINDING TYPES */}
        <section className="py-20 bg-bgLight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-textMain text-center mb-12">Choose by <span className="text-secondary">binding type</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {bindingTypes.map((bt) => (
                <div key={bt.name} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4"><Book className="w-6 h-6 text-secondary" /></div>
                  <h3 className="text-sm font-bold text-textMain mb-2">{bt.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{bt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCT TYPES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-textMain text-center mb-12">Choose by <span className="text-secondary">product type</span></h2>
            <div className="flex flex-wrap justify-center gap-3">
              {productTypes.map((pt) => (
                <button key={pt} className="px-5 py-3 border border-primary/20 rounded-xl text-sm font-medium text-textMain hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all shadow-sm">{pt}</button>
              ))}
            </div>
          </div>
        </section>

        {/* QUICK ORDER FORM */}
        <section id="quick-order" className="py-20 bg-primary">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-bgPure mb-3">Quick <span className="text-secondary">Order</span></h2>
              <p className="text-bgPure/60">Fill in your details and we'll get back to you with a quote within 24 hours.</p>
            </div>
            <div className="bg-bgPure rounded-2xl p-8 shadow-xl">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                  <p className="text-gray-500">We'll contact you within 24 hours with a quote.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 text-secondary font-medium text-sm hover:underline">Submit another request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                      <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="+254 7XX XXX XXX" required /></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="email@example.com" /></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                      <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="John" required /></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company / Personal</label>
                      <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><select value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none appearance-none bg-white"><option value="">Personal</option><option value="Company">Company</option><option value="Freelancer">Freelancer</option><option value="Non-profit">Non-profit</option><option value="Other">Other</option></select></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Magazine Type <span className="text-red-500">*</span></label>
                      <div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><select value={form.magazineType} onChange={(e) => setForm((p) => ({ ...p, magazineType: e.target.value }))} className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none appearance-none bg-white">{magazineTypes.map((mt) => (<option key={mt} value={mt}>{mt}</option>))}</select></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity <span className="text-red-500">*</span></label>
                      <input type="number" value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: parseInt(e.target.value) || 1 }))} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" min={1} required />
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
                  <button type="submit" disabled={submitting} className="w-full py-3 bg-secondary text-bgPure font-semibold text-sm rounded-lg hover:bg-secondary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    {submitting ? "Submitting..." : <><ShoppingCart size={16} /> Request Quote</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}