import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const experiences = [
  {
    title: "The Grand Gala",
    category: "Corporate",
    description:
      "An immersive evening of networking and celebration at an iconic venue.",
  },
  {
    title: "Seaside Soirée",
    category: "Social",
    description:
      "An elegant coastal gathering with curated dining and live entertainment.",
  },
  {
    title: "Urban Renaissance",
    category: "Brand Activation",
    description:
      "A bold, experiential launch that transforms city spaces into living art.",
  },
];

export function Experiences() {
  return (
    <Section className="bg-radiance-navy">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-radiance-white/60 mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-radiance-white tracking-tight">
              Featured Experiences
            </h2>
          </div>
          <Link href="/experiences">
            <Button variant="outline" className="border-radiance-white text-radiance-white hover:bg-radiance-white hover:text-radiance-navy">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className="group relative overflow-hidden bg-radiance-white/5 hover:bg-radiance-white/10 transition-colors duration-300"
            >
              <div className="aspect-[4/3] bg-radiance-white/10 flex items-center justify-center">
                <span className="text-radiance-white/30 text-6xl font-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium tracking-[0.15em] uppercase text-radiance-white/50 mb-2">
                  {exp.category}
                </p>
                <h3 className="text-xl font-medium text-radiance-white mb-3">
                  {exp.title}
                </h3>
                <p className="text-radiance-white/60 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
