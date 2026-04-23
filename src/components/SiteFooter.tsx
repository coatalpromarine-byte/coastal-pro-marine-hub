import { Link } from "@tanstack/react-router";
import { Anchor, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-gradient-deep text-background mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-md bg-accent flex items-center justify-center">
              <Anchor className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-display font-bold text-xl">CoastalPro Marine</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-background/60">Authorized Dealer Since 1998</div>
            </div>
          </div>
          <p className="text-sm text-background/70 max-w-sm leading-relaxed">
            Engines, boats, parts and certified service for recreational and commercial captains across the United States.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-accent">Shop</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/engines" className="hover:text-accent">Outboard Engines</Link></li>
            <li><Link to="/boats" className="hover:text-accent">Boats</Link></li>
            <li><Link to="/parts" className="hover:text-accent">Parts & Accessories</Link></li>
            <li><Link to="/financing" className="hover:text-accent">Financing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-accent">Visit</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />2400 Harbor Way, Wilmington, NC</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />(800) 555-0199</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" />sales@coastalpromarine.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-background/50 flex flex-col sm:flex-row justify-between gap-2">
          <div>© {new Date().getFullYear()} CoastalPro Marine. All rights reserved.</div>
          <div>Authorized dealer · NMMA Certified · USCG Compliant</div>
        </div>
      </div>
    </footer>
  );
}
