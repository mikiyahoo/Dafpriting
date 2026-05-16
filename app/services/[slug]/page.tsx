import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Check } from "lucide-react";

const serviceDetails: Record<string, {
  title: string;
  description: string;
  details: string[];
  finishes: string[];
}> = {
  "business-stationery": {
    title: "Business Stationery",
    description: "Make a lasting impression with premium business stationery. From business cards to letterheads, we ensure every piece reflects your brand's identity with precision and quality.",
    details: [
      "Premium card stocks: 300gsm, 350gsm, 400gsm",
      "Finishes: Matte, Gloss, Soft Touch, Linen, Uncoated",
      "Spot UV, Foil stamping, and Embossing available",
      "Full color CMYK or Pantone matching",
      "Rounded corners, custom shapes, and die-cut options",
      "Bulk discounts for large orders",
    ],
    finishes: ["Matte", "Gloss", "Soft Touch", "Spot UV", "Foil Stamping", "Embossing"],
  },
  "marketing-materials": {
    title: "Marketing Materials",
    description: "Stand out from the competition with professionally printed marketing materials. We help you create brochures, flyers, and catalogs that captivate your audience.",
    details: [
      "Multiple sizes: A5, A4, A3, DL, custom sizes",
      "Paper options: Coated, Uncoated, Recycled, Specialty",
      "Binding: Stapled, Perfect bound, Saddle stitch",
      "Folding options: Half-fold, Tri-fold, Z-fold, Gate-fold",
      "High-resolution full color printing",
      "Fast turnaround for time-sensitive campaigns",
    ],
    finishes: ["Gloss Coating", "Matte Coating", "Aqueous Coating", "UV Coating"],
  },
  "large-format": {
    title: "Large Format Printing",
    description: "Make a big impact with our large format printing services. Perfect for events, trade shows, retail displays, and outdoor advertising.",
    details: [
      "Sizes up to 5ft wide, any length",
      "Materials: Vinyl, Canvas, Fabric, Foam board, PVC",
      "Indoor and outdoor UV-resistant inks",
      "Grommets, pole pockets, and mounting options",
      "Roll-up banners with free case",
      "Weather-resistant lamination available",
    ],
    finishes: ["Matte Lamination", "Gloss Lamination", "Mounting", "Framing"],
  },
  "apparel-printing": {
    title: "Apparel Printing",
    description: "Create custom apparel for your team, event, or brand. We offer multiple printing techniques to suit any fabric and design complexity.",
    details: [
      "DTG (Direct to Garment) for detailed designs",
      "Screen printing for bulk orders",
      "Heat transfer vinyl for small batches",
      "Embroidery available for premium look",
      "Wide range of garment colors and styles",
      "Eco-friendly water-based inks available",
    ],
    finishes: ["DTG Print", "Screen Print", "Heat Transfer", "Embroidery"],
  },
  "labels-stickers": {
    title: "Labels & Stickers",
    description: "Custom labels and stickers for products, packaging, promotions, and more. We offer a variety of materials and shapes to match your needs.",
    details: [
      "Materials: Vinyl, Paper, Clear, Holographic, Metallic",
      "Custom die-cut to any shape",
      "Roll labels with removable or permanent adhesive",
      "Waterproof and weather-resistant options",
      "Kiss-cut sheets for easy peeling",
      "Small to large production runs",
    ],
    finishes: ["Gloss", "Matte", "Clear", "Holographic", "Metallic"],
  },
  "packaging": {
    title: "Packaging Solutions",
    description: "Elevate your product presentation with custom packaging that protects and impresses. From gift boxes to rigid displays, we design and print packaging that sells.",
    details: [
      "Custom Box Types: Gift boxes, Mailer boxes, Rigid boxes",
      "Cardstock: 200gsm to 1200gsm boxboard",
      "Full color CMYK printing inside and out",
      "Foil stamping, Embossing, and Debossing",
      "Magnetic closures, ribbons, and inserts",
      "Eco-friendly and recyclable materials",
    ],
    finishes: ["Matte", "Gloss", "Soft Touch", "Foil Stamping", "Embossing"],
  },
  "books-publications": {
    title: "Books & Publications",
    description: "Professional book and publication printing for authors, businesses, and organizations. We handle everything from short to long runs.",
    details: [
      "Binding options: Perfect bound, Saddle stitch, Spiral, Case bound",
      "Interior: 80gsm to 120gsm book paper",
      "Cover: 250gsm to 350gsm with various finishes",
      "Sizes: A5, A4, Digest, Custom",
      "Full color or grayscale interior",
      "ISBN barcode printing available",
    ],
    finishes: ["Matte Cover", "Gloss Cover", "Soft Touch", "Spot UV"],
  },
};

export async function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = serviceDetails[params.slug];
  if (!service) return { title: "Service Not Found | Daf Printing" };
  return {
    title: `${service.title} | Daf Printing`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = serviceDetails[params.slug];
  if (!service) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="text-sm text-textMuted hover:text-primary transition-colors mb-6 inline-block"
            >
              &larr; Back to Services
            </Link>

            <div className="max-w-4xl mb-16">
              <h1 className="text-4xl md:text-5xl font-black text-textMain mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-textMuted text-lg leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-xl font-black text-textMain mb-6">What We Offer</h2>
                <ul className="space-y-4">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <span className="text-textMuted">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-black text-textMain mb-6">Available Finishes</h2>
                <div className="flex flex-wrap gap-3">
                  {service.finishes.map((finish) => (
                    <span
                      key={finish}
                      className="px-4 py-2 bg-bgPure border border-gray-200 text-sm font-medium text-textMuted rounded-lg"
                    >
                      {finish}
                    </span>
                  ))}
                </div>

                <div className="mt-10 p-8 bg-gradient-primary rounded-2xl text-bgPure">
                  <h3 className="text-lg font-black mb-2">Need a Quote?</h3>
                  <p className="text-bgPure/80 text-sm mb-6">
                    Tell us about your project and we'll provide a free quote within 24 hours.
                  </p>
                  <Link
                    href={`/request-quote?service=${params.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-bgPure text-sm font-bold tracking-wide uppercase rounded-full shadow-lg hover:bg-secondary/90 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get a Free Quote
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}