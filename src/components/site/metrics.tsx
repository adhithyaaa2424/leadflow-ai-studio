import { TrendingUp } from "lucide-react";
import { CASE_STUDIES, METRICS } from "@/lib/site-content";
import { SectionHeading } from "./section-heading";

export function Metrics() {
  return (
    <section id="results" aria-labelledby="results-title" className="relative border-y border-border/60 bg-surface-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Results"
          title={<span id="results-title">Real Outcomes, Measured.</span>}
          description="The kind of impact our automation systems are designed to deliver. Example scenarios shown for illustration."
        />

        <dl className="mt-14 grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4 [&>*]:bg-surface">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col gap-2 p-6 sm:p-8">
              <dd className="font-display text-4xl font-extrabold text-primary sm:text-5xl">{m.value}</dd>
              <dt className="text-sm text-muted-foreground">{m.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <article
              key={c.title}
              className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-colors hover:border-primary/40"
            >
              <p className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <TrendingUp className="size-3.5 text-primary" />
                {c.industry}
              </p>
              <h3 className="mt-5 text-xl font-bold text-foreground">{c.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{c.summary}</p>
              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-border/70 pt-6">
                {c.results.map((r) => (
                  <div key={r.label}>
                    <p className="font-display text-2xl font-extrabold text-primary">{r.value}</p>
                    <p className="text-xs text-muted-foreground">{r.label}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
