import { VALUE_PROPS } from "@/lib/site-content";
import { SectionHeading } from "./section-heading";

export function ValueProps() {
  return (
    <section aria-labelledby="value-title" className="relative border-y border-border/60 bg-surface-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why LeadFlow"
          title={<span id="value-title">Smarter Systems. Better Business.</span>}
          description="Spend less time managing repetitive tasks and more time growing your business."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {VALUE_PROPS.map(({ icon: Icon, title, description }, i) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="ambient-glow pointer-events-none absolute -right-16 -top-16 size-48 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="font-display text-sm font-bold text-muted-foreground/50">0{i + 1}</span>
              </div>
              <h3 className="relative mt-6 text-xl font-bold text-foreground">{title}</h3>
              <p className="relative mt-3 leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
