"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "Boat Loans & Marine Financing — Up to 240 Months | CoastalPro Marine" },
      { name: "description", content: "Finance your boat or outboard engine with competitive marine loan rates. Terms up to 240 months, online pre-approval in minutes, trade-in equity welcome." },
      { name: "keywords", content: "boat financing, marine loan, boat loan rates, finance outboard engine, marine lender, boat loan calculator, RV marine financing, low rate boat loan" },
      { property: "og:title", content: "Marine Financing | CoastalPro Marine" },
      { property: "og:description", content: "Flexible terms up to 240 months. Apply online for pre-approval in minutes." },
    ],
    links: [{ rel: "canonical", href: "https://coastalpromarine.com/financing" }],
  }),
  component: Financing,
});

const benefits = [
  "Terms from 60 to 240 months",
  "Competitive fixed rates from major marine lenders",
  "Online pre-approval in minutes",
  "Finance the engine, hull and electronics together",
  "Trade-in equity applied at signing",
];

const payments = [
  { term: "120 months", monthly: "$475" },
  { term: "180 months", monthly: "$355" },
  { term: "240 months", monthly: "$295" },
];

function Financing() {
  return (
    <>
      <PageHero
        eyebrow="Financing"
        title="Spread the cost. Hit the water sooner."
        italicWords={[3, 4, 5, 6]}
        description="Competitive rates, flexible terms and quick approvals. We work with the top marine lenders in the country."
      />
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal><SectionLabel>Benefits</SectionLabel></Reveal>
              <Reveal delay={0.1} className="mt-5">
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-10 text-balance">
                  Why finance <span className="italic font-normal text-muted-foreground">with us?</span>
                </h2>
              </Reveal>
              <StaggerGroup className="space-y-4">
                {benefits.map((b) => (
                  <StaggerItem key={b}>
                    <div className="flex gap-4 items-start group">
                      <div className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent transition-colors duration-500">
                        <Check className="h-3 w-3 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                      </div>
                      <span className="text-lg font-light">{b}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <Reveal delay={0.3} className="mt-10">
                <Link
                  to="/contact"
                  className="btn-premium inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
                >
                  Apply now <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <Reveal y={50} delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="rounded-2xl bg-gradient-deep text-background p-10 md:p-12 shadow-elevated noise relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[11px] uppercase tracking-[0.4em] text-accent mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" />
                    Monthly Estimate
                  </div>
                  <h3 className="font-display text-5xl leading-tight mb-8 text-shimmer">$45,000</h3>
                  <div className="space-y-0 divide-y divide-background/10">
                    {payments.map((p) => (
                      <div key={p.term} className="flex justify-between py-5 group">
                        <span className="text-background/60 font-light">{p.term}</span>
                        <span className="font-display text-xl group-hover:text-accent transition-colors duration-500">~ {p.monthly}/mo</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-background/40 mt-6 font-mono">
                    Estimates assume well-qualified credit at current market rates. Actual rates vary.
                  </p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
