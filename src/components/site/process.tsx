import { PROCESS_STEPS } from "@/lib/site-content";
import { SectionHeading } from "./section-heading";

export function Process() {
  return (
    <section id="how-it-works" className="relative overflow-hidden border-y border-border/60 bg-surface-muted py-20 lg:py-28">
      <div className="ambient-glow pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[720px] -translate-x-1/2 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="A Clear Path From Idea to Automation."
          description="A proven four-step process that keeps things simple, transparent and focused on results."
        />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block"
          />
          {PROCESS_STEPS.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className="relative">
              <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border border-primary/40 bg-background text-primary shadow-card">
                <Icon className="size-6" />
              </div>
              <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
