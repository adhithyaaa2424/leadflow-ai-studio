import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowRight, CalendarCheck, CheckCircle2, ChevronDown, Clock, Loader2, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  consultationSchema,
  type ConsultationInput,
} from "@/lib/consultation-schema";
import { submitConsultation } from "@/lib/consultation.functions";
import { SectionHeading } from "./section-heading";

const inputClass =
  "h-12 w-full rounded-xl border border-input bg-surface-muted px-4 text-[15px] text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 aria-[invalid=true]:border-destructive";

function Field({
  id,
  label,
  error,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
        {label}
        {optional && <span className="text-xs font-normal text-muted-foreground">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const EMPTY: Partial<ConsultationInput> = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  preferredDate: "",
  message: "",
};

export function ContactForm() {
  const submit = useServerFn(submitConsultation);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: EMPTY,
    mode: "onTouched",
  });

  const messageLength = watch("message")?.length ?? 0;
  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = async (values: ConsultationInput) => {
    try {
      await submit({ data: values });
      toast.success("Consultation request received", {
        description: "Thanks! We'll reply within one business day.",
      });
      setSubmittedName(values.fullName.split(" ")[0] ?? values.fullName);
      reset(EMPTY);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        description: "We couldn't send your request. Please try again in a moment.",
      });
    }
  };

  const aria = (name: keyof ConsultationInput) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div className="ambient-glow pointer-events-none absolute -left-40 top-20 size-[520px] opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title={
              <>
                Book Your Free <span className="text-primary">Consultation.</span>
              </>
            }
            description="Tell us about your business and where time is slipping away. We'll come back with practical ideas, no strings attached."
          />
          <ul className="mt-10 space-y-5">
            {[
              { icon: CalendarCheck, title: "30-minute discovery call", text: "We review your workflows and lead process together." },
              { icon: Clock, title: "Reply within one business day", text: "A real person reads every request." },
              { icon: ShieldCheck, title: "No obligation", text: "Walk away with a clear plan, whether or not we work together." },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href="mailto:hello@leadflowai.studio"
            className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-4" /> Prefer email? hello@leadflowai.studio
          </a>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-9">
          {submittedName ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center text-center" role="status">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground glow-primary">
                <CheckCircle2 className="size-8" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-foreground">You're all set, {submittedName}!</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Your consultation request is in. We'll review your details and get back to you within
                one business day.
              </p>
              <Button
                variant="outline"
                className="mt-8 rounded-full border-border bg-card text-foreground hover:border-primary/50"
                onClick={() => setSubmittedName(null)}
              >
                Send another request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
              <Field id="fullName" label="Full name" error={errors.fullName?.message}>
                <input id="fullName" autoComplete="name" placeholder="Jane Cooper" className={inputClass} {...register("fullName")} {...aria("fullName")} />
              </Field>
              <Field id="email" label="Work email" error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" placeholder="jane@company.com" className={inputClass} {...register("email")} {...aria("email")} />
              </Field>
              <Field id="company" label="Company" optional error={errors.company?.message}>
                <input id="company" autoComplete="organization" placeholder="Acme Inc." className={inputClass} {...register("company")} {...aria("company")} />
              </Field>
              <Field id="phone" label="Phone" optional error={errors.phone?.message}>
                <input id="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 1234" className={inputClass} {...register("phone")} {...aria("phone")} />
              </Field>
              <Field id="service" label="Service of interest" error={errors.service?.message}>
                <div className="relative">
                  <select id="service" defaultValue="" className={cn(inputClass, "appearance-none pr-10")} {...register("service")} {...aria("service")}>
                    <option value="" disabled>Select a service</option>
                    {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </Field>
              <Field id="budget" label="Estimated budget" error={errors.budget?.message}>
                <div className="relative">
                  <select id="budget" defaultValue="" className={cn(inputClass, "appearance-none pr-10")} {...register("budget")} {...aria("budget")}>
                    <option value="" disabled>Select a range</option>
                    {BUDGET_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </Field>
              <Field id="preferredDate" label="Preferred call date" optional error={errors.preferredDate?.message} className="sm:col-span-2">
                <input id="preferredDate" type="date" min={today} className={cn(inputClass, "[color-scheme:dark]")} {...register("preferredDate")} {...aria("preferredDate")} />
              </Field>
              <Field id="message" label="What would you like to automate?" error={errors.message?.message} className="sm:col-span-2">
                <textarea
                  id="message"
                  rows={5}
                  placeholder="e.g. We get 50+ inquiries a week from our website and follow-up is slow..."
                  className={cn(inputClass, "h-auto resize-none py-3")}
                  {...register("message")}
                  {...aria("message")}
                />
                <p className="mt-1.5 text-right text-xs text-muted-foreground tabular-nums">{messageLength}/1000</p>
              </Field>
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full text-[15px] font-semibold glow-primary hover:bg-primary-glow"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending request...
                    </>
                  ) : (
                    <>
                      Book My Free Consultation <ArrowRight />
                    </>
                  )}
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  We only use your details to respond to this request.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
