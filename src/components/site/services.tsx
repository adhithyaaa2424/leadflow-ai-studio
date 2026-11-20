import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/site-content";
import { SectionHeading } from "./section-heading";

export function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Services"
            title="Solutions That Move Your Business Forward."
            description="Practical digital solutions designed to simplify operations and accelerate business growth."
          />
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-glow"
          >
            Discuss your project <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, description, features }) => (
            <article
              key={title}
              className="group relative flex flex-col rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:border-primary/40 hover:bg-card sm:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-shadow duration-300 group-hover:glow-primary">
                  <Icon className="size-6" />
                </span>
                <a
                  href="#contact"
                  aria-label={`Ask about ${title}`}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary"
                >
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-foreground">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
              <ul className="mt-7 grid gap-2.5 border-t border-border/70 pt-6 sm:grid-cols-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground/90">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
