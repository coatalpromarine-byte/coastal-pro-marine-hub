import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container } from "../components/Section";
import { Check } from "lucide-react";
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
  },
  {
    range: "30 – 115 HP",
    name: "Mid-Range",
    blurb: "Workhorses for jon boats, bass rigs and pontoons.",
    specs: ["EFI fuel injection", "Power tilt & trim", "Quiet 4-stroke operation"],
  },
  {
    range: "150 – 250 HP",
    name: "Performance",
    blurb: "Twin-rigged ready power for center consoles and bay boats.",
    specs: ["V6 architecture", "Digital throttle & shift", "Variable cam timing"],
  },
  {
    range: "300 – 350 HP",
    name: "Offshore",
    blurb: "Maximum thrust for serious bluewater and commercial operators.",
    specs: ["V8 design", "Joystick-compatible", "Heavy-duty gearcase"],
  },
];

function Engines() {
  return (
    <>
      <PageHero
        eyebrow="Outboard Engines"
        title="From kicker to offshore monster."
        description="We're an authorized dealer for every major outboard brand. Whether you need a 2.5 HP backup or a quad-rigged 350, we'll spec, deliver and service it."
        image={engineImg}
      />
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {tiers.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-8 hover:shadow-deep transition-shadow">
                <div className="flex items-baseline justify-between mb-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-accent">{t.range}</div>
                </div>
                <h3 className="font-display text-3xl mb-3">{t.name}</h3>
                <p className="text-muted-foreground mb-6">{t.blurb}</p>
                <ul className="space-y-2">
                  {t.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
