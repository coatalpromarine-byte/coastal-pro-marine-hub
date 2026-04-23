import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container } from "../components/Section";
import { Check } from "lucide-react";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "Boat & Engine Financing | CoastalPro Marine" },
      { name: "description", content: "Flexible marine financing with terms up to 240 months. Apply online, get approved fast." },
      { property: "og:title", content: "Marine Financing | CoastalPro Marine" },
      { property: "og:description", content: "Flexible terms up to 240 months. Apply online." },
    ],
  }),
  component: Financing,
});

function Financing() {
  return (
    <>
      <PageHero
        eyebrow="Financing"
        title="Spread the cost. Hit the water sooner."
        description="Competitive rates, flexible terms and quick approvals. We work with the top marine lenders in the country."
        image={undefined}
      />
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl mb-6">Why finance with us?</h2>
              <ul className="space-y-4">
                {[
                  "Terms from 60 to 240 months",
                  "Competitive fixed rates from major marine lenders",
                  "Online pre-approval in minutes",
                  "Finance the engine, hull and electronics together",
                  "Trade-in equity applied at signing",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-deep text-background p-10 shadow-deep">
              <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Estimate</div>
              <h3 className="font-display text-4xl leading-tight mb-6">$45,000 financed</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-background/10 pb-3">
                  <span className="text-background/60">120-month term</span>
                  <span className="font-semibold">~ $475/mo</span>
                </div>
                <div className="flex justify-between border-b border-background/10 pb-3">
                  <span className="text-background/60">180-month term</span>
                  <span className="font-semibold">~ $355/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-background/60">240-month term</span>
                  <span className="font-semibold">~ $295/mo</span>
                </div>
              </div>
              <p className="text-xs text-background/50 mt-6">
                Estimates assume well-qualified credit at current market rates. Actual rates vary.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
