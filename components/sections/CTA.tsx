import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 md:py-32 bg-radiance-white">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-radiance-navy tracking-tight max-w-3xl mx-auto">
          Ready to Create Something Extraordinary?
        </h2>
         <p className="mt-6 text-radiance-navy/60 text-lg max-w-xl mx-auto leading-relaxed">
           Let&apos;s discuss how we can bring your vision to life with precision
           and creativity.
         </p>
        <div className="mt-10">
          <Link href="/contact">
            <Button size="lg">Start Your Journey</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
