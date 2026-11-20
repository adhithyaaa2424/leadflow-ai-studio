import { PRINCIPLES } from "@/lib/site-content";
import { SectionHeading } from "./section-heading";
import { LogoMark } from "./logo";

export function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Us"
            title={
              <>
                Automate Smarter. <span className="text-primary">Grow Faster.</span>
              </>
            }
          />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              LeadFlow AI Studio helps businesses automate repetitive tasks, capture leads, manage
              customer inquiries and streamline operations through intelligent digital solutions.
            </p>
            <p>
              We started with a simple observation: growing businesses lose clients not because of
              poor service, but because inquiries slip through the cracks and teams drown in admin.
              We build the systems that fix that, quietly and reliably.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-5 rounded-2xl border border-border bg-surface p-5">
            <LogoMark className="size-12 shrink-0" />
            <blockquote className="text-foreground">
              <p className="font-display text-lg font-semibold leading-snug">
                “Technology should give people time back, not create more work.”
              </p>
              <footer className="mt-1 text-sm text-muted-foreground">Our guiding philosophy</footer>
            </blockquote>
          </div>
        </div>

        <div className="grid content-start gap-4">
          {PRINCIPLES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="flex gap-5 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </article>
          ))}
          <div className="grid grid-cols-3 gap-4">
            {[
              { v: "40+", l: "Workflows built" },
              { v: "12", l: "Industries served" },
              { v: "100%", l: "Fixed-price quotes" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-surface p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-primary">{s.v}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
