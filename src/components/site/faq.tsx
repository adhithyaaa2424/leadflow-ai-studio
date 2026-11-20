import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/site-content";
import { SectionHeading } from "./section-heading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative border-t border-border/60 bg-surface-muted py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title={<span id="faq-title">Questions, Answered.</span>}
          description="Everything you need to know before we start working together. Can't find your answer? Just ask."
        />
        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card px-6 data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-foreground hover:no-underline [&>svg]:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
