"use client";
import { Link } from "@tanstack/react-router";
import { Anchor, Menu, X, Phone, ShoppingCart, LogIn, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/constants";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/engines", label: "Engines" },
  { to: "/boats", label: "Boats" },
  { to: "/parts", label: "Parts" },
  { to: "/service", label: "Service" },
  { to: "/financing", label: "Financing" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { user } = useAuth();

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

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative h-10 w-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">{count}</span>
            )}
          </button>
          {user ? (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> Admin
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" /> Login
            </Link>
          )}
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="btn-premium inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
          >
            <Phone className="h-3.5 w-3.5" />
            {CONTACT_PHONE_DISPLAY}
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative h-10 w-10 rounded-full hover:bg-secondary flex items-center justify-center"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">{count}</span>
            )}
          </button>
          <button
            className="p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
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
              <Link to={user ? "/admin" : "/login"} onClick={() => setOpen(false)} className="block py-3 text-2xl font-display text-accent">
                {user ? "Admin" : "Login"}
              </Link>
              <a href={`tel:${CONTACT_PHONE}`} className="mt-4 inline-flex justify-center rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
