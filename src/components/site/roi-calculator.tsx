import { useMemo, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { calculateRoi, type RoiInputs } from "@/lib/roi";
import { SectionHeading } from "./section-heading";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

interface FieldConfig {
  key: keyof RoiInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}

const FIELDS: FieldConfig[] = [
  { key: "teamSize", label: "Team members doing manual work", min: 1, max: 50, step: 1, format: (v) => `${v}` },
  { key: "hoursPerWeek", label: "Hours per person on repetitive tasks / week", min: 1, max: 40, step: 1, format: (v) => `${v} hrs` },
  { key: "hourlyCost", label: "Average hourly cost", min: 15, max: 150, step: 5, format: (v) => usd.format(v) },
  { key: "automationRate", label: "Share of work we can automate", min: 20, max: 90, step: 5, format: (v) => `${v}%` },
];

export function RoiCalculator() {
  const [inputs, setInputs] = useState<RoiInputs>({
    teamSize: 5,
    hoursPerWeek: 10,
    hourlyCost: 40,
    automationRate: 60,
  });
  const result = useMemo(() => calculateRoi(inputs), [inputs]);

  return (
    <section id="calculator" aria-labelledby="roi-title" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Savings Calculator"
          title={<span id="roi-title">See What Automation Could Save You.</span>}
          description="Adjust the sliders to estimate the time and money your team could get back each year."
        />

        <div className="mt-14 grid overflow-hidden rounded-3xl border border-border bg-surface shadow-card lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-center gap-10 p-7 sm:p-10">
            {FIELDS.map((f) => {
              const id = `roi-${f.key}`;
              return (
                <div key={f.key}>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <label id={id} className="text-sm font-medium text-foreground">
                      {f.label}
                    </label>
                    <span className="rounded-lg border border-border bg-card px-2.5 py-1 font-display text-sm font-bold text-primary tabular-nums">
                      {f.format(inputs[f.key])}
                    </span>
                  </div>
                  <Slider
                    aria-labelledby={id}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={[inputs[f.key]]}
                    onValueChange={(v) => setInputs((prev) => ({ ...prev, [f.key]: v[0] ?? prev[f.key] }))}
                  />
                </div>
              );
            })}
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden border-t border-border bg-card p-7 sm:p-10 lg:border-l lg:border-t-0">
            <div className="ambient-glow pointer-events-none absolute -right-20 -top-20 size-72 opacity-60" />
            <div className="relative">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Calculator className="size-4 text-primary" /> Estimated annual savings
              </p>
              <p className="mt-3 font-display text-5xl font-extrabold text-primary tabular-nums sm:text-6xl" aria-live="polite">
                {usd.format(result.annualSavings)}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Hours saved / week", value: num.format(result.weeklyHoursSaved) },
                  { label: "Hours saved / month", value: num.format(result.monthlyHoursSaved) },
                  { label: "Monthly savings", value: usd.format(result.monthlySavings) },
                  { label: "Full-time roles freed", value: result.fteFreed.toFixed(1) },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-surface-muted/80 p-4">
                    <dt className="text-xs text-muted-foreground">{s.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold text-foreground tabular-nums">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative mt-8">
              <Button asChild size="lg" className="h-12 w-full rounded-full font-semibold hover:bg-primary-glow">
                <a href="#contact">
                  Get a tailored estimate <ArrowRight />
                </a>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Estimates only, based on 52 working weeks. Real results depend on your processes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
