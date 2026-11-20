import { useEffect, useState } from "react";
import { FileText, Sparkles, Database, Mail, Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { icon: FileText, title: "Lead captured", detail: "Website form · Sarah Chen" },
  { icon: Sparkles, title: "AI qualifies", detail: "Score 92 · High intent" },
  { icon: Database, title: "CRM updated", detail: "Deal created in pipeline" },
  { icon: Mail, title: "Follow-up sent", detail: "Personal reply in 48s" },
] as const;

export function WorkflowVisual() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2200);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative mx-auto w-full max-w-[520px] sm:pb-12 sm:pt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ambient-glow pointer-events-none absolute -inset-16 opacity-70" />

      {/* Main panel */}
      <div className="relative rounded-3xl border border-border bg-surface/90 p-5 shadow-card backdrop-blur sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Zap className="size-4" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-foreground">Inquiry → Client</p>
              <p className="text-xs text-muted-foreground">Automation workflow</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-primary" />
            Live
          </span>
        </div>

        <ol className="relative space-y-3" aria-label="Automation steps">
          {/* Connector line */}
          <svg
            className="pointer-events-none absolute left-[27px] top-6 h-[calc(100%-48px)] w-1"
            preserveAspectRatio="none"
            viewBox="0 0 2 100"
            aria-hidden="true"
          >
            <line x1="1" y1="0" x2="1" y2="100" className="stroke-border" strokeWidth="2" />
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              className="animate-flow stroke-primary"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {STEPS.map((step, i) => {
            const done = i < active;
            const current = i === active;
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  className={cn(
                    "relative flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-500",
                    current
                      ? "border-primary/50 bg-card glow-soft"
                      : "border-border/60 bg-surface-muted/70 hover:border-border",
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500",
                      current || done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="size-4" /> : <Icon className="size-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">{step.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {step.detail}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      current ? "text-primary" : done ? "text-muted-foreground" : "text-muted-foreground/50",
                    )}
                  >
                    {current ? "Running" : done ? "Done" : "Queued"}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Floating lead card */}
      <div className="animate-float absolute -left-4 top-0 hidden w-48 rounded-2xl border border-border bg-card/95 p-3 shadow-card backdrop-blur sm:block lg:-left-12">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          New lead
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-bold text-primary">
            SC
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">Sarah Chen</p>
            <p className="truncate text-[11px] text-muted-foreground">Bright Dental Co.</p>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div
        className="animate-float absolute bottom-0 -right-2 hidden w-56 rounded-2xl border border-primary/30 bg-card/95 p-3 shadow-card backdrop-blur sm:block lg:-right-10"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Mail className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground">Reply delivered</p>
            <p className="text-[11px] leading-snug text-muted-foreground">
              Consultation booked for Tue, 10:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
