import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/site-content";
import { useActiveSection } from "@/hooks/use-active-section";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px]"
      >
        <a href="#home" aria-label="LeadFlow AI Studio home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-border/70 bg-surface/60 p-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  active === item.id
                    ? "bg-card text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden h-10 rounded-full px-5 font-semibold hover:bg-primary-glow md:inline-flex"
          >
            <a href="#contact">
              Get Started <ArrowRight />
            </a>
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="h-[calc(100dvh-4rem)] border-t border-border/70 bg-background px-5 pb-8 pt-4 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-border/60 py-4 font-display text-xl font-bold",
                    active === item.id ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.label}
                  <ArrowRight className="size-4 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8 h-12 w-full rounded-full font-semibold">
            <a href="#contact" onClick={() => setOpen(false)}>
              Get Started <ArrowRight />
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
