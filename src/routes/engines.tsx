"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import engineImg from "@/assets/engine.jpg";

export const Route = createFileRoute("/engines")({
  head: () => ({
    meta: [
      { title: "Outboard Engines 2.5–350 HP | CoastalPro Marine" },
      { name: "description", content: "Portable kickers to offshore powerhouses. Authorized dealer for the leading outboard brands." },
      { property: "og:title", content: "Outboard Engines | CoastalPro Marine" },
      { property: "og:description", content: "Portable to offshore — 2.5 to 350 HP outboard engines." },
    ],
  }),
  component: Engines,
});

const tiers = [
  {
    range: "2.5 – 25 HP",
    name: "Portable",
    blurb: "Lightweight kickers for tenders, dinghies and small skiffs.",
    specs: ["Manual or electric start", "Tiller controls", "Single-cylinder reliability"],
    badge: "Best for backup",
  },
  {
    range: "30 – 115 HP",
    name: "Mid-Range",
    blurb: "Workhorses for jon boats, bass rigs and pontoons.",
    specs: ["EFI fuel injection", "Power tilt & trim", "Quiet 4-stroke operation"],
    badge: "Most popular",
  },
  {
    range: "150 – 250 HP",
    name: "Performance",
    blurb: "Twin-rigged ready power for center consoles and bay boats.",
    specs: ["V6 architecture", "Digital throttle & shift", "Variable cam timing"],
    badge: "Captain's pick",
  },
  {
    range: "300 – 350 HP",
    name: "Offshore",
    blurb: "Maximum thrust for serious bluewater and commercial operators.",
    specs: ["V8 design", "Joystick-compatible", "Heavy-duty gearcase"],
    badge: "Max power",
  },
];

function Engines() {
  return (
    <>
      <PageHero
        eyebrow="Outboard Engines"
        title="From kicker to offshore monster."
        italicWords={[2, 3, 4]}
        description="We're an authorized dealer for every major outboard brand. Whether you need a 2.5 HP backup or a quad-rigged 350, we'll spec, deliver and service it."
        image={engineImg}
      />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid md:grid-cols-2 gap-6">
            {tiers.map((t, i) => (
              <StaggerItem key={t.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="h-full rounded-2xl border border-border bg-card p-9 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-accent font-mono">{t.range}</div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-full px-3 py-1">{t.badge}</span>
                  </div>
                  <h3 className="font-display text-4xl mb-3">{t.name}</h3>
                  <p className="text-muted-foreground font-light mb-8">{t.blurb}</p>
                  <ul className="space-y-3">
                    {t.specs.map((s) => (
                      <li key={s} className="flex items-center gap-3 text-sm">
                        <div className="h-5 w-5 rounded-full bg-accent/15 flex items-center justify-center">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.2} className="mt-16 text-center">
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
