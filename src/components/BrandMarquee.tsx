"use client";
import { motion } from "framer-motion";
import { Anchor } from "lucide-react";

const brands = [
  "Yamaha", "Mercury", "Suzuki", "Honda Marine", "Tohatsu",
  "Garmin", "Lowrance", "Humminbird", "Minn Kota", "Power-Pole",
];

export function BrandMarquee() {
  return (
    <section className="relative py-10 border-y border-border bg-background overflow-hidden">
      <div className="flex gap-16 whitespace-nowrap" style={{ animation: "marquee 35s linear infinite" }}>
        {[...brands, ...brands].map((b, i) => (
          <div key={i} className="flex items-center gap-3 text-foreground/40 hover:text-accent transition-colors duration-500">
            <Anchor className="h-3 w-3" />
            <span className="font-display text-2xl tracking-wide">{b}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FloatingBadge({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay }}
      className="px-6 py-5"
    >
      <div className="font-display text-3xl md:text-4xl font-semibold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1.5">{label}</div>
    </motion.div>
  );
}
