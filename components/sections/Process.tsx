import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We begin with understanding your vision, objectives, and the story you want to tell.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our creative team crafts a bespoke concept with mood boards, layouts, and experiential flow.",
  },
  {
    number: "03",
    title: "Production",
    description:
      "Seamless execution with world-class vendors, precise timelines, and dedicated oversight.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "An unforgettable event delivered with flawless precision and lasting impact.",
  },
];

export function Process() {
  return (
    <Section className="bg-radiance-white">
      <Container>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-radiance-navy/60 mb-3">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-radiance-navy tracking-tight">
            Our Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-5xl font-light text-radiance-navy/10">
                {step.number}
              </span>
              <h3 className="text-xl font-medium text-radiance-navy mt-4 mb-3">
                {step.title}
              </h3>
              <p className="text-radiance-navy/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
