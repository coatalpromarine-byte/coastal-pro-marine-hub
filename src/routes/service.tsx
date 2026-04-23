"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { ShieldCheck, Wrench, Snowflake, Activity, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import serviceImg from "@/assets/service.jpg";

export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "Certified Marine Service | CoastalPro Marine" },
      { name: "description", content: "Master-certified marine technicians. Repowers, warranty work, winterization and on-water diagnostics." },
      { property: "og:title", content: "Marine Service | CoastalPro Marine" },
      { property: "og:description", content: "Certified marine techs. Repowers, warranty, winterization." },
    ],
  }),
  component: Service,
});

const services = [
  { i: Wrench, n: "Repowers & Rigging", d: "Full engine swaps, controls, gauges and steering. Done right the first time.", no: "01" },
  { i: ShieldCheck, n: "Warranty Work", d: "Authorized warranty repairs across all major outboard brands.", no: "02" },
  { i: Snowflake, n: "Winterization", d: "Fuel stabilization, fogging, lower unit service. Spring start guaranteed.", no: "03" },
  { i: Activity, n: "Diagnostics", d: "Factory diagnostic tools. Mobile and on-water service available.", no: "04" },
];

function Service() {
  return (
    <>
      <PageHero
        eyebrow="Service Center"
        title="Master-certified hands. Every time."
        italicWords={[0]}
        description="Our techs hold factory certifications across every major outboard brand. We service what we sell — and what you already own."
        image={serviceImg}
      />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid md:grid-cols-2 gap-6">
            {services.map(({ i: Icon, n, d, no }) => (
              <StaggerItem key={n}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="group rounded-2xl border border-border bg-card p-9 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                      <Icon className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{no} / 04</span>
                  </div>
                  <h3 className="font-display text-3xl mb-3">{n}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{d}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.2} className="mt-16 text-center">
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
            >
              Schedule service <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
