import { Mail, MapPin, Linkedin, Twitter, Github, ArrowUp } from "lucide-react";
import { NAV_ITEMS, SERVICES } from "@/lib/site-content";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed text-muted-foreground">
              Intelligent automation and digital solutions that turn every inquiry into your next
              client.
            </p>
            <p className="mt-5 font-display text-sm font-bold text-primary">
              Automate Smarter. Grow Faster.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-bold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-sm text-muted-foreground transition-colors hover:text-primary-glow">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-primary-glow">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold text-foreground">Services</h3>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-sm text-muted-foreground transition-colors hover:text-primary-glow">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <a href="#contact" className="hover:text-primary-glow">hello@leadflowai.studio</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> Remote · Worldwide
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "X (Twitter)" },
                { icon: Github, label: "GitHub" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#home"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} LeadFlow AI Studio. All rights reserved.</p>
          <a href="#home" className="inline-flex items-center gap-1.5 hover:text-primary">
            Back to top <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
