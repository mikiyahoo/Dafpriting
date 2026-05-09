import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Experiences } from "@/components/sections/Experiences";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <FeaturedPackages />
        <Experiences />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
