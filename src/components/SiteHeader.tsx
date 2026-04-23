"use client";
import { Link } from "@tanstack/react-router";
import { Anchor, Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/85 border-b border-border/60 shadow-card"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-md bg-gradient-deep flex items-center justify-center shadow-deep overflow-hidden">
            <Anchor className="h-5 w-5 text-accent relative z-10 transition-transform duration-700 group-hover:rotate-[20deg]" />
            <div className="absolute inset-0 bg-gradient-sun opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-lg tracking-tight">CoastalPro</div>
            <div className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground -mt-0.5">Marine · Est. 1998</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative px-4 py-2 text-sm font-medium text-foreground/65 hover:text-foreground transition-colors group"
              activeProps={{ className: "text-foreground" }}
            >
              <span className="relative z-10">{n.label}</span>
              <span className="absolute inset-x-4 bottom-1 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+18005550199"
            className="btn-premium inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
          >
            <Phone className="h-3.5 w-3.5" />
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={n.to}
                    className="block py-3 text-2xl font-display"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <a href="tel:+18005550199" className="mt-4 inline-flex justify-center rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold">
                (800) 555-0199
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
