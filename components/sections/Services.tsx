import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Sparkles, Users, Calendar, Star } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Event Design",
    description:
      "Bespoke creative direction and visual storytelling tailored to your vision.",
  },
  {
    icon: Users,
    title: "Guest Experience",
    description:
      "Curated hospitality and seamless guest management from arrival to departure.",
  },
  {
    icon: Calendar,
    title: "Production",
    description:
      "End-to-end logistics, vendor coordination, and on-site execution.",
  },
  {
    icon: Star,
    title: "Celebrations",
    description:
      "Weddings, galas, milestone events crafted with precision and passion.",
  },
];

export function Services() {
  return (
    <Section className="bg-radiance-white">
      <Container>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-radiance-navy/60 mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-radiance-navy tracking-tight">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 border border-radiance-navy/10 hover:border-radiance-navy/30 transition-colors duration-300"
            >
              <service.icon className="w-8 h-8 text-radiance-navy mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-medium text-radiance-navy mb-3">
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
  );
}
