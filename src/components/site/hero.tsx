import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowVisual } from "./workflow-visual";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="ambient-glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 opacity-60" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            AI Automation &amp; Digital Solutions
          </p>

          <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.05] text-foreground sm:text-6xl lg:text-[4.25rem]">
            Turn Every Inquiry Into Your{" "}
            <span className="text-gradient-primary">Next Client.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We build intelligent automation systems that help businesses capture leads,
            streamline operations and grow without unnecessary manual work.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-7 text-[15px] font-semibold glow-primary hover:bg-primary-glow"
            >
              <a href="#services">
                Explore Our Services <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-surface/60 px-7 text-[15px] font-semibold text-foreground hover:border-primary/50 hover:bg-card"
            >
              <a href="#contact">
                <MessageCircle /> Let's Talk
              </a>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {["Free discovery call", "Fixed-price projects", "Live in weeks, not months"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <WorkflowVisual />
      </div>
    </section>
  );
}
