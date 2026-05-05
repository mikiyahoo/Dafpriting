import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { BookingForm } from "@/components/forms/BookingForm";

export const metadata = {
  title: "Contact | Radiance",
  description: "Get in touch with Radiance Events to start planning your extraordinary experience.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Section className="pt-32">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-radiance-navy/60 mb-3">
                  Get in Touch
                </p>
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-radiance-navy tracking-tight mb-6">
                   Let&apos;s Create Together
                 </h1>
                <p className="text-radiance-navy/70 text-lg leading-relaxed mb-12">
                  Ready to bring your vision to life? Fill out the form and our team will reach out within 24 hours to discuss how we can make your event extraordinary.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium tracking-wide uppercase text-radiance-navy mb-2">
                      Email
                    </h3>
                    <p className="text-radiance-navy/70">hello@radiance.events</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-wide uppercase text-radiance-navy mb-2">
                      Phone
                    </h3>
                    <p className="text-radiance-navy/70">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-wide uppercase text-radiance-navy mb-2">
                      Location
                    </h3>
                    <p className="text-radiance-navy/70">New York, NY</p>
                  </div>
                </div>
              </div>

              <div className="bg-radiance-white border border-radiance-navy/10 p-8 md:p-10">
                <BookingForm />
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
