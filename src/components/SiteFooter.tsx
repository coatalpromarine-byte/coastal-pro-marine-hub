import { Link } from "react-router-dom";
import { Anchor, Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <footer className="relative bg-gradient-deep text-background mt-32 noise overflow-hidden">
      {/* huge brand watermark */}

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-md bg-accent flex items-center justify-center">
                <Anchor className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-semibold text-2xl">CoastalPro Marine</div>
                <div className="text-[9px] uppercase tracking-[0.32em] text-background/60">Authorized Dealer · Est. 1998</div>
              </div>
            </div>
            <p className="text-base text-background/70 max-w-md leading-relaxed font-light">
              Engines, boats, parts and certified service for recreational and commercial captains
              across the United States.
            </p>
            <div className="mt-8 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="h-10 w-10 rounded-full border border-background/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-base mb-5 text-accent">Catalog</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link to="/engines" className="link-underline hover:text-accent transition-colors">Outboard Engines</Link></li>
              <li><Link to="/boats" className="link-underline hover:text-accent transition-colors">Boats</Link></li>
              <li><Link to="/parts" className="link-underline hover:text-accent transition-colors">Parts & Accessories</Link></li>
              <li><Link to="/financing" className="link-underline hover:text-accent transition-colors">Financing</Link></li>
              <li><Link to="/service" className="link-underline hover:text-accent transition-colors">Service Center</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-base mb-5 text-accent">Visit the dock</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />2400 Harbor Way<br />Wilmington, NC 28401</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" />(904) 622-5861</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" />coastalpromarine@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-background/10 text-xs text-background/50 flex flex-col sm:flex-row justify-between gap-2">
          <div>© {new Date().getFullYear()} CoastalPro Marine. All rights reserved.</div>
          <div className="font-mono">NMMA Certified · USCG Compliant · ABYC Member</div>
        </div>
      </div>
    </footer>
  );
}
