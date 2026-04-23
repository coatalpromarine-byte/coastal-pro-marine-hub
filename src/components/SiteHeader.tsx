import { Link } from "@tanstack/react-router";
import { Anchor, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/engines", label: "Engines" },
  { to: "/boats", label: "Boats" },
  { to: "/parts", label: "Parts" },
  { to: "/service", label: "Service" },
  { to: "/financing", label: "Financing" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-md bg-gradient-deep flex items-center justify-center shadow-deep">
            <Anchor className="h-5 w-5 text-accent" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg tracking-tight">CoastalPro</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-0.5">Marine</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="tel:+18005550199"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            (800) 555-0199
          </a>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="py-2 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <a href="tel:+18005550199" className="mt-2 inline-flex justify-center rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold">
              (800) 555-0199
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
