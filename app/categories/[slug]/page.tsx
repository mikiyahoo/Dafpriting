"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Book,
  FileText,
  Layers,
  Mail,
  Package,
  Phone,
  Ruler,
  ShoppingCart,
  Sparkles,
  User,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type CategoryContent = {
  title: string;
  eyebrow: string;
  description: string;
  images: string[];
  highlights: { name: string; desc: string }[];
  products: string[];
  materials: string[];
  quantity: number;
};

const works = {
  agenda: "/assets/Works/Agenda & Cap.jpg",
  banner: "/assets/Works/Banner.jpg",
  bannerTwo: "/assets/Works/Banner_2.jpg",
  businessCard: "/assets/Works/Business Card.jpg",
  cap: "/assets/Works/Cap.jpg",
  certificate: "/assets/Works/Certificate.jpg",
  envelope: "/assets/Works/Envelope.jpg",
  flag: "/assets/Works/Flag.jpg",
  flyer: "/assets/Works/Flyer.jpg",
  idCard: "/assets/Works/ID Card.jpg",
  menu: "/assets/Works/Menu.jpg",
  menuTwo: "/assets/Works/Menu_2.jpg",
  mica: "/assets/Works/Mica Sign.jpg",
  micaTwo: "/assets/Works/Mica Sign_2.jpg",
  micaThree: "/assets/Works/Mica Sign_3.jpg",
  mug: "/assets/Works/Mug.jpg",
  packaging: "/assets/Works/Packaging.jpg",
  pen: "/assets/Works/Pen.jpg",
  rollup: "/assets/Works/Rollup Banner.jpg",
  rollupTwo: "/assets/Works/Rollup Bannner_2.jpg",
  safetyVest: "/assets/Works/Safety Vests.jpg",
  sticker: "/assets/Works/Sticker.jpg",
  tshirt: "/assets/Works/T-shirt.jpg",
  tshirtCap: "/assets/Works/T-shirt & Cap, Mug.jpg",
  trophy: "/assets/Works/Trophy.jpg",
  waterBottle: "/assets/Works/Water Bottle.jpg",
  weddingCard: "/assets/Works/Weeding Card.jpg",
};

const baseHighlights = [
  { name: "Design-ready setup", desc: "Share your artwork or let our team prepare a clean production file." },
  { name: "Material guidance", desc: "We help you pick the right stock, finish and size for your use case." },
  { name: "Fast local production", desc: "Reliable print handling for urgent campaigns, launches and events." },
];

const categoryContent: Record<string, CategoryContent> = {
  "magazines-books": {
    title: "Magazines & Books",
    eyebrow: "Publications",
    description:
      "Full-color magazines, manuals, catalogues and books produced with clean binding, crisp pages and durable covers for brands, schools and publishers.",
    images: [works.menu, works.agenda, works.certificate],
    highlights: [
      { name: "Binding options", desc: "Saddle stitch, perfect binding, wire-o and premium cover finishing." },
      { name: "Sharp inside pages", desc: "Readable text, rich color and consistent page registration." },
      { name: "Short or bulk runs", desc: "Print small batches for approval or scale up for wide distribution." },
    ],
    products: ["Magazine", "Book", "Catalogue", "Manual", "Menu", "Booklet", "Annual report", "Notebook"],
    materials: ["Matte cover", "Gloss cover", "Art paper", "Bond paper", "Wire-o", "Stapled binding"],
    quantity: 100,
  },
  "advertisement-banners": {
    title: "Advertisement Banners",
    eyebrow: "Outdoor & Indoor Ads",
    description:
      "Large-format banners that make promotions visible from a distance, with durable finishing for stores, events, roadsides and campaigns.",
    images: [works.banner, works.bannerTwo, works.flag],
    highlights: [
      { name: "Large format clarity", desc: "Bold color and readable messaging for close-up or roadside visibility." },
      { name: "Outdoor-ready finishes", desc: "Eyelets, hemming, pole pockets and mounting support available." },
      { name: "Campaign sizes", desc: "From compact counter signs to wide storefront and event backdrops." },
    ],
    products: ["Vinyl banner", "Mesh banner", "Backdrop banner", "Flag banner", "Poster", "Wall banner", "Street banner"],
    materials: ["Vinyl", "Mesh", "Flex", "Sticker vinyl", "Matte lamination", "Gloss lamination"],
    quantity: 10,
  },
  apparel: {
    title: "T-shirt & Cap Printing",
    eyebrow: "Branded Apparel",
    description:
      "Custom apparel for teams, launches and giveaways, printed with artwork that holds up through regular use.",
    images: [works.tshirt, works.cap, works.tshirtCap],
    highlights: [
      { name: "Team-ready branding", desc: "Consistent placement and color matching across apparel sets." },
      { name: "Print or embroidery", desc: "Choose a finish that fits your fabric, budget and brand feel." },
      { name: "Event bundles", desc: "Pair shirts, caps and giveaways for a complete activation kit." },
    ],
    products: ["T-shirt", "Cap", "Polo shirt", "Hoodie", "Safety vest", "Uniform set", "Apron"],
    materials: ["Cotton", "Polyester", "DTF print", "Screen print", "Embroidery", "Heat press"],
    quantity: 25,
  },
  "tshirt-cap-apparel": {
    title: "T-shirt & Cap Printing",
    eyebrow: "Branded Apparel",
    description:
      "Custom apparel for teams, launches and giveaways, printed with artwork that holds up through regular use.",
    images: [works.tshirt, works.cap, works.tshirtCap],
    highlights: [
      { name: "Team-ready branding", desc: "Consistent placement and color matching across apparel sets." },
      { name: "Print or embroidery", desc: "Choose a finish that fits your fabric, budget and brand feel." },
      { name: "Event bundles", desc: "Pair shirts, caps and giveaways for a complete activation kit." },
    ],
    products: ["T-shirt", "Cap", "Polo shirt", "Hoodie", "Safety vest", "Uniform set", "Apron"],
    materials: ["Cotton", "Polyester", "DTF print", "Screen print", "Embroidery", "Heat press"],
    quantity: 25,
  },
  "office-stationery": {
    title: "Office Stationery",
    eyebrow: "Business Essentials",
    description:
      "Everyday office print items with a polished brand look, from business cards and letterheads to envelopes and staff ID materials.",
    images: [works.businessCard, works.envelope, works.idCard],
    highlights: [
      { name: "Brand consistency", desc: "Keep your logo, color and typography aligned across office materials." },
      { name: "Professional stocks", desc: "Choose practical paper weights and premium finishes where they matter." },
      { name: "Reusable templates", desc: "Build a repeatable system for staff, branches and departments." },
    ],
    products: ["Business card", "Envelope", "Letterhead", "ID card", "Certificate", "Folder", "Notepad"],
    materials: ["300gsm card", "Bond paper", "PVC card", "Matte finish", "Gloss finish", "Lamination"],
    quantity: 100,
  },
  "light-box": {
    title: "Light Box Signs",
    eyebrow: "Illuminated Signage",
    description:
      "Bright, clean signage for storefronts, reception areas and retail spaces where your brand needs to stay visible day and night.",
    images: [works.micaThree, works.micaTwo, works.mica],
    highlights: [
      { name: "High visibility", desc: "Illuminated surfaces make names, offers and directions easy to spot." },
      { name: "Custom sizing", desc: "Built around your location, frontage and viewing distance." },
      { name: "Installation planning", desc: "We advise on material, lighting and mounting before production." },
    ],
    products: ["Light box", "Mica sign", "Reception sign", "Shop sign", "Directional sign", "Wall sign"],
    materials: ["Acrylic", "Mica", "Vinyl face", "LED lighting", "Aluminum frame", "Mounting hardware"],
    quantity: 1,
  },
  "bill-receipt": {
    title: "Bill & Receipt Books",
    eyebrow: "Business Forms",
    description:
      "Custom bills, receipts, invoices and voucher books for smooth daily operations and cleaner record keeping.",
    images: [works.certificate, works.envelope, works.idCard],
    highlights: [
      { name: "Numbered sets", desc: "Sequential numbering and duplicate copies for easier tracking." },
      { name: "Clear layouts", desc: "Practical forms designed around the information your team records." },
      { name: "Business-ready books", desc: "Bound, perforated and padded formats for counters, offices and field teams." },
    ],
    products: ["Receipt book", "Invoice book", "Voucher", "Delivery note", "Order form", "NCR form"],
    materials: ["NCR paper", "Bond paper", "Perforation", "Numbering", "Stapled pad", "Book binding"],
    quantity: 20,
  },
  "flyers-brochures": {
    title: "Flyers & Brochures",
    eyebrow: "Marketing Print",
    description:
      "Campaign-ready flyers, leaflets and brochures that explain offers clearly and help your audience act quickly.",
    images: [works.flyer, works.menuTwo, works.menu],
    highlights: [
      { name: "Campaign layouts", desc: "Clean hierarchy for offers, services, menus and product highlights." },
      { name: "Fold choices", desc: "Single sheet, bi-fold, tri-fold and custom formats available." },
      { name: "Vivid color", desc: "Sharp print output for photography, graphics and promotional messaging." },
    ],
    products: ["Flyer", "Brochure", "Leaflet", "Menu", "Poster", "Product sheet", "Company profile"],
    materials: ["Art paper", "Gloss paper", "Matte paper", "Tri-fold", "Bi-fold", "UV finish"],
    quantity: 250,
  },
  "corporate-gifts": {
    title: "Corporate Gifts",
    eyebrow: "Promotional Items",
    description:
      "Useful branded gifts for clients, staff and events, produced with clear logos and thoughtful product pairing.",
    images: [works.pen, works.mug, works.waterBottle],
    highlights: [
      { name: "Gift bundles", desc: "Combine mugs, pens, bottles, caps and notebooks for memorable packs." },
      { name: "Brand placement", desc: "Logo sizing and color guidance for each material surface." },
      { name: "Event quantities", desc: "Flexible runs for executive gifts, conferences and customer giveaways." },
    ],
    products: ["Pen", "Mug", "Water bottle", "Trophy", "Notebook", "Cap", "Gift set"],
    materials: ["Ceramic", "Metal", "Plastic", "Engraving", "UV print", "Heat transfer"],
    quantity: 50,
  },
  "exhibition-display": {
    title: "Exhibition & Display",
    eyebrow: "Events & Trade Shows",
    description:
      "Portable display materials for trade shows, product launches and roadshows, built to set up quickly and photograph well.",
    images: [works.rollup, works.rollupTwo, works.flag],
    highlights: [
      { name: "Portable formats", desc: "Roll-up banners, flags and display graphics that travel easily." },
      { name: "Launch-ready visuals", desc: "High-impact graphics for booths, entrances and presentation areas." },
      { name: "Complete sets", desc: "Coordinate banners, flyers, badges and giveaway items for one event look." },
    ],
    products: ["Roll-up banner", "Pop-up display", "Flag", "Backdrop", "Table talker", "Event poster"],
    materials: ["Roll-up stand", "Flex", "Fabric", "Foam board", "PVC", "Carry case"],
    quantity: 5,
  },
  "business-cards": {
    title: "Business Cards",
    eyebrow: "First Impressions",
    description:
      "Premium business cards with clean typography, accurate color and finishes that make every introduction feel intentional.",
    images: [works.businessCard, works.businessCard, works.idCard],
    highlights: baseHighlights,
    products: ["Standard card", "PVC card", "Rounded card", "Premium card", "Staff card", "Appointment card"],
    materials: ["300gsm card", "350gsm card", "PVC", "Matte lamination", "Gloss lamination", "Spot UV"],
    quantity: 100,
  },
  "banners-posters": {
    title: "Banners & Posters",
    eyebrow: "Large Format",
    description:
      "Banners and posters for promotions, stores and events, printed in strong color with practical finishing options.",
    images: [works.bannerTwo, works.banner, works.rollup],
    highlights: baseHighlights,
    products: ["Banner", "Poster", "Roll-up banner", "Wall graphic", "Campaign banner", "Backdrop"],
    materials: ["Flex", "Vinyl", "Photo paper", "Canvas", "Matte lamination", "Eyelets"],
    quantity: 10,
  },
  "labels-stickers": {
    title: "Labels & Stickers",
    eyebrow: "Product Details",
    description:
      "Custom labels and stickers for packaging, promotions and product identification, cut to practical shapes and sizes.",
    images: [works.sticker, works.packaging, works.mica],
    highlights: baseHighlights,
    products: ["Product label", "Sticker sheet", "Die-cut sticker", "Window sticker", "Seal label", "Barcode label"],
    materials: ["Paper sticker", "Vinyl sticker", "Clear sticker", "Gloss finish", "Matte finish", "Die cut"],
    quantity: 500,
  },
  "apparel-tees": {
    title: "Apparel & Tees",
    eyebrow: "Wearable Branding",
    description:
      "Printed apparel for teams, merchandise and events, finished for a clean brand presence on everyday clothing.",
    images: [works.tshirt, works.safetyVest, works.cap],
    highlights: baseHighlights,
    products: ["T-shirt", "Polo shirt", "Cap", "Safety vest", "Uniform", "Hoodie"],
    materials: ["Cotton", "Polyester", "Screen print", "DTF print", "Embroidery", "Heat press"],
    quantity: 25,
  },
  packaging: {
    title: "Packaging",
    eyebrow: "Product Presentation",
    description:
      "Custom packaging that protects products and gives your brand a cleaner shelf, delivery and unboxing experience.",
    images: [works.packaging, works.packaging, works.sticker],
    highlights: baseHighlights,
    products: ["Product box", "Paper bag", "Sleeve", "Label", "Sticker seal", "Gift packaging"],
    materials: ["Duplex board", "Kraft", "Art card", "Matte lamination", "Gloss lamination", "Die cut"],
    quantity: 100,
  },
  stationery: {
    title: "Stationery",
    eyebrow: "Office Print",
    description:
      "Letterheads, envelopes and branded paper goods that keep your business communication neat and recognizable.",
    images: [works.envelope, works.certificate, works.businessCard],
    highlights: baseHighlights,
    products: ["Letterhead", "Envelope", "Notepad", "Folder", "Memo pad", "Certificate"],
    materials: ["Bond paper", "Conqueror paper", "Card stock", "Embossing", "Foil", "Offset print"],
    quantity: 100,
  },
  "wedding-events": {
    title: "Wedding & Events",
    eyebrow: "Event Print",
    description:
      "Invitations, cards, programs and event materials with polished finishing for weddings, celebrations and formal gatherings.",
    images: [works.weddingCard, works.menu, works.trophy],
    highlights: baseHighlights,
    products: ["Invitation", "Program", "Menu card", "Thank-you card", "Table card", "Welcome sign"],
    materials: ["Textured card", "Pearl card", "Foil", "Embossing", "Ribbon", "Envelope"],
    quantity: 100,
  },
  "promotional-merch": {
    title: "Promotional Merch",
    eyebrow: "Brand Giveaways",
    description:
      "Branded merchandise for campaigns, staff gifts and customer giveaways with clear, durable logo placement.",
    images: [works.mug, works.pen, works.trophy],
    highlights: baseHighlights,
    products: ["Mug", "Pen", "Water bottle", "Cap", "Trophy", "Notebook", "Gift set"],
    materials: ["UV print", "Engraving", "Heat transfer", "Ceramic", "Metal", "Plastic"],
    quantity: 50,
  },
  "books-catalogs": {
    title: "Books & Catalogs",
    eyebrow: "Bound Print",
    description:
      "Books and catalogues for product showcases, training, reporting and publishing, produced with clear pages and strong covers.",
    images: [works.agenda, works.menuTwo, works.certificate],
    highlights: baseHighlights,
    products: ["Book", "Catalogue", "Magazine", "Manual", "Report", "Booklet"],
    materials: ["Perfect binding", "Staple binding", "Wire-o", "Art paper", "Bond paper", "Cover lamination"],
    quantity: 100,
  },
};

const fallbackImage = works.flyer;

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getFallbackContent(slug: string): CategoryContent {
  const title = titleFromSlug(slug);
  return {
    title,
    eyebrow: "Custom Printing",
    description:
      "Custom print production with practical material advice, clean finishing and quick support from artwork to delivery.",
    images: [fallbackImage, works.businessCard, works.banner],
    highlights: baseHighlights,
    products: [title, "Custom size", "Premium finish", "Bulk order", "Sample print", "Design support"],
    materials: ["Matte finish", "Gloss finish", "Lamination", "Custom stock", "Full color", "Die cut"],
    quantity: 50,
  };
}

export default function CategoryDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "advertisement-banners";
  const content = useMemo(() => categoryContent[slug] || getFallbackContent(slug), [slug]);
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState({
    phone: "",
    email: "",
    company: "",
    firstName: "",
    productType: content.products[0],
    quantity: content.quantity,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveImage((current) => (current + 1) % content.images.length),
      3500
    );
    return () => window.clearInterval(timer);
  }, [content.images.length]);

  const selectedProduct = content.products.includes(form.productType)
    ? form.productType
    : content.products[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.firstName) {
      setError("Phone and first name are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/quick-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          email: form.email,
          company: form.company,
          firstName: form.firstName,
          magazineType: `${content.title} - ${selectedProduct}`,
          quantity: form.quantity,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setForm({
        phone: "",
        email: "",
        company: "",
        firstName: "",
        productType: content.products[0],
        quantity: content.quantity,
      });
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
        <section className="bg-primary pt-24 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-sm text-white/55">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/80">{content.title}</span>
            </div>

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-secondary">
                  <Sparkles className="h-4 w-4" />
                  {content.eyebrow}
                </span>
                <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">
                  {content.title}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-white/75">
                  {content.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#quick-order"
                    className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-bgPure shadow-lg hover:bg-secondary/90"
                  >
                    Quick Order
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#options"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    View Options
                    <Layers size={16} />
                  </a>
                </div>
              </div>

              <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl md:h-[450px]">
                {content.images.map((img, index) => (
                  <div
                    key={img}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === activeImage ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
                  >
                    <img src={img} alt={`${content.title} sample ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {content.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeImage ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Show ${content.title} image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bgLight py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-black text-textMain">
              What you can <span className="text-secondary">order</span>
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.highlights.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Book className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-textMain">{item.name}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="options" className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <h2 className="mb-8 text-3xl font-black text-textMain">
                Product <span className="text-secondary">options</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {content.products.map((product) => (
                  <button
                    key={product}
                    onClick={() => setForm((previous) => ({ ...previous, productType: product }))}
                    className={`rounded-xl border px-5 py-3 text-sm font-medium shadow-sm transition-all ${
                      selectedProduct === product
                        ? "border-secondary bg-secondary text-bgPure"
                        : "border-primary/20 text-textMain hover:border-secondary hover:bg-secondary/5 hover:text-secondary"
                    }`}
                  >
                    {product}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-8 text-3xl font-black text-textMain">
                Finishes & <span className="text-secondary">materials</span>
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {content.materials.map((material) => (
                  <div key={material} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-bgLight px-4 py-3">
                    <BadgeCheck className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm font-semibold text-textMain">{material}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="quick-order" className="bg-primary py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-black text-bgPure">
                Quick <span className="text-secondary">Order</span>
              </h2>
              <p className="text-bgPure/65">
                Send the basics now. Your request will appear in the admin Quick Orders page.
              </p>
            </div>

            <div className="rounded-2xl bg-bgPure p-8 shadow-xl">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <BadgeCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Request submitted</h3>
                  <p className="text-gray-500">We will contact you with the next steps.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium text-secondary hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm((previous) => ({ ...previous, phone: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="+251 9XX XXX XXX"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((previous) => ({ ...previous, email: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => setForm((previous) => ({ ...previous, firstName: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Company / Personal</label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm((previous) => ({ ...previous, company: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Company or personal"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Product Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <select
                          value={selectedProduct}
                          onChange={(e) => setForm((previous) => ({ ...previous, productType: e.target.value }))}
                          className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          {content.products.map((product) => (
                            <option key={product} value={product}>
                              {product}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          value={form.quantity}
                          onChange={(e) =>
                            setForm((previous) => ({ ...previous, quantity: parseInt(e.target.value, 10) || 1 }))
                          }
                          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                          min={1}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-sm font-semibold text-bgPure transition-all hover:bg-secondary/90 disabled:opacity-50"
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Send Quick Order
                      </>
                    )}
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
