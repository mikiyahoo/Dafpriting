import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "About | Radiance",
  description: "Learn about Radiance Events and our passion for crafting extraordinary experiences.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <Section className="pt-32">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-radiance-navy/60 mb-3">
                About Us
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-radiance-navy tracking-tight mb-8">
                We Believe in the Power of Moments
              </h1>
              <p className="text-radiance-navy/70 text-lg leading-relaxed mb-6">
                Radiance was founded on a simple belief: extraordinary events have the power to transform, inspire, and connect. For over a decade, we have partnered with visionary clients to create experiences that defy expectations.
              </p>
              <p className="text-radiance-navy/70 text-lg leading-relaxed">
                From intimate gatherings to grand galas, our team brings meticulous attention to detail, creative excellence, and unwavering dedication to every project we undertake.
              </p>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
