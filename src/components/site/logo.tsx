import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect x="1" y="1" width="30" height="30" rx="9" className="fill-primary" />
      <path
        d="M9 9v14h7"
        className="stroke-primary-foreground"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 16h7M16 9h7"
        className="stroke-primary-foreground"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="23" cy="23" r="2.4" className="fill-primary-foreground" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[17px] font-extrabold tracking-tight text-foreground">
        LeadFlow<span className="text-primary"> AI</span>
        <span className="ml-1 font-semibold text-muted-foreground">Studio</span>
      </span>
    </span>
  );
}
