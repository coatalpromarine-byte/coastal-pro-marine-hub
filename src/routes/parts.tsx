import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container } from "../components/Section";
import partsImg from "@/assets/parts.jpg";
import { Battery, Compass, Cog, Fuel, Truck, Wrench } from "lucide-react";

export const Route = createFileRoute("/parts")({
  head: () => ({
    meta: [
      { title: "Marine Parts & Accessories | CoastalPro Marine" },
      { name: "description", content: "Propellers, batteries, fuel systems, electronics, trailers and maintenance kits. 10,000+ parts in stock, shipped nationwide." },
      { property: "og:title", content: "Marine Parts | CoastalPro Marine" },
      { property: "og:description", content: "10,000+ parts shipped nationwide." },
    ],
  }),
  component: Parts,
});

const cats = [
  { i: Cog, n: "Propellers", c: "Aluminum, stainless, 3 & 4 blade" },
  { i: Battery, n: "Batteries", c: "Cranking, deep cycle, lithium" },
  { i: Fuel, n: "Fuel Systems", c: "Tanks, pumps, filters, lines" },
  { i: Compass, n: "Electronics", c: "GPS, sonar, VHF, radar" },
  { i: Truck, n: "Trailers", c: "Galvanized, aluminum, parts" },
  { i: Wrench, n: "Maintenance", c: "Oil, filters, impellers, plugs" },
];

function Parts() {
  return (
    <>
      <PageHero
        eyebrow="Parts & Accessories"
        title="If it's marine, we stock it."
        description="Over 10,000 line items in our warehouse — genuine OEM parts and the accessories captains actually use."
        image={partsImg}
      />
      <section className="py-20">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cats.map(({ i: Icon, n, c }) => (
              <div key={n} className="group rounded-2xl border border-border bg-card p-7 hover:border-accent transition-colors">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent transition-colors">
                  <Icon className="h-6 w-6 text-foreground group-hover:text-accent-foreground" />
                </div>
                <h3 className="font-display text-2xl mb-1">{n}</h3>
                <p className="text-sm text-muted-foreground">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-secondary p-8 text-center">
            <p className="text-sm text-muted-foreground">Need a hard-to-find part? Call our parts counter.</p>
            <a href="tel:+18005550199" className="mt-2 inline-block font-display text-3xl text-accent">
              (800) 555-0199
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
