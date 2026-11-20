import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { ValueProps } from "@/components/site/value-props";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { RoiCalculator } from "@/components/site/roi-calculator";
import { Metrics } from "@/components/site/metrics";
import { About } from "@/components/site/about";
import { ContactForm } from "@/components/site/contact-form";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";

const TITLE = "LeadFlow AI Studio — AI Automation & Lead Management Agency";
const DESCRIPTION =
  "LeadFlow AI Studio builds intelligent automation systems that capture leads, streamline operations and help businesses grow without manual work.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "LeadFlow AI Studio",
          slogan: "Automate Smarter. Grow Faster.",
          description: DESCRIPTION,
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ValueProps />
        <Services />
        <Process />
        <RoiCalculator />
        <Metrics />
        <About />
        <ContactForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
