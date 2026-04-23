import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container } from "../components/Section";
import boatImg from "@/assets/boat.jpg";

export const Route = createFileRoute("/boats")({
  head: () => ({
    meta: [
      { title: "Boats — Jon, Bass, Pontoon, Center Console | CoastalPro Marine" },
      { name: "description", content: "Shop new boats from trusted manufacturers. Jon boats, bass boats, pontoons and offshore center consoles." },
      { property: "og:title", content: "Boats | CoastalPro Marine" },
      { property: "og:description", content: "Jon boats, bass boats, pontoons and center consoles." },
    ],
  }),
  component: Boats,
});

const lines = [
  { name: "Jon Boats", use: "Backwater & utility", len: "10 – 18 ft", price: "from $2,990" },
  { name: "Bass Boats", use: "Tournament fishing", len: "17 – 21 ft", price: "from $24,900" },
  { name: "Pontoons", use: "Family cruising", len: "20 – 28 ft", price: "from $32,500" },
  { name: "Center Consoles", use: "Bluewater & charter", len: "22 – 36 ft", price: "from $58,000" },
];

function Boats() {
  return (
    <>
      <PageHero
        eyebrow="Boats"
        title="The right hull for every horizon."
        description="From skinny-water jon boats to fully-rigged offshore consoles, our showroom carries hulls for every captain and every mission."
        image={boatImg}
      />
      <section className="py-20">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4">Model line</th>
                  <th className="px-6 py-4">Best for</th>
                  <th className="px-6 py-4">Length</th>
                  <th className="px-6 py-4 text-right">Starting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {lines.map((l) => (
                  <tr key={l.name} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-5 font-display text-xl">{l.name}</td>
                    <td className="px-6 py-5 text-muted-foreground">{l.use}</td>
                    <td className="px-6 py-5 text-muted-foreground">{l.len}</td>
                    <td className="px-6 py-5 text-right font-semibold text-accent">{l.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Trade-ins welcome. Sea trials available by appointment.
          </p>
        </Container>
      </section>
    </>
  );
}
