import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container } from "../components/Section";
import serviceImg from "@/assets/service.jpg";
import { ShieldCheck, Wrench, Snowflake, Activity } from "lucide-react";

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
  { i: Wrench, n: "Repowers & Rigging", d: "Full engine swaps, controls, gauges and steering. Done right the first time." },
  { i: ShieldCheck, n: "Warranty Work", d: "Authorized warranty repairs across all major outboard brands." },
  { i: Snowflake, n: "Winterization", d: "Fuel stabilization, fogging, lower unit service. Spring start guaranteed." },
  { i: Activity, n: "Diagnostics", d: "Factory diagnostic tools. Mobile and on-water service available." },
];

function Service() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title="Master-certified hands. Every time."
        description="Our techs hold factory certifications across every major outboard brand. We service what we sell — and what you already own."
        image={serviceImg}
      />
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map(({ i: Icon, n, d }) => (
              <div key={n} className="rounded-2xl border border-border bg-card p-8">
                <Icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-display text-2xl mb-2">{n}</h3>
                <p className="text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
