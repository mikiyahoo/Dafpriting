import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Sparkles, Users, Calendar, Star, Lightbulb, Palette } from "lucide-react";

export const metadata = {
  title: "Services | Radiance",
  description: "Explore our premium event services from design to execution.",
};

const services = [
  {
    icon: Sparkles,
    title: "Event Design",
    description:
      "Bespoke creative direction and visual storytelling tailored to your vision. We craft immersive environments that captivate and inspire.",
  },
  {
    icon: Users,
    title: "Guest Experience",
    description:
      "Curated hospitality and seamless guest management from arrival to departure. Every touchpoint is designed to delight.",
  },
  {
    icon: Calendar,
    title: "Production",
    description:
      "End-to-end logistics, vendor coordination, and on-site execution. We manage the complexity so you can enjoy the moment.",
  },
  {
    icon: Star,
    title: "Celebrations",
    description:
      "Weddings, galas, milestone events crafted with precision and passion. Your most important moments deserve nothing less.",
  },
  {
    icon: Lightbulb,
    title: "Brand Activations",
    description:
      "Transformative experiences that bring brands to life. From pop-ups to large-scale installations, we create impact.",
  },
  {
    icon: Palette,
    title: "Creative Consulting",
    description:
      "Strategic guidance and creative direction for brands and individuals seeking to elevate their event presence.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Section className="pt-32">
          <Container>
            <div className="max-w-3xl mb-16">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-radiance-navy/60 mb-3">
                What We Do
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-radiance-navy tracking-tight mb-6">
                Our Services
              </h1>
              <p className="text-radiance-navy/70 text-lg leading-relaxed">
                Comprehensive event solutions designed to elevate every occasion into an unforgettable experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group p-8 border border-radiance-navy/10 hover:border-radiance-navy/30 transition-colors duration-300"
                >
                  <service.icon className="w-8 h-8 text-radiance-navy mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-medium text-radiance-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-radiance-navy/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
