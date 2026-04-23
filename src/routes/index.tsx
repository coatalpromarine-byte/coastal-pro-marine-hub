import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cog, Ship, Wrench, CreditCard, ShieldCheck, Anchor } from "lucide-react";
import heroImg from "@/assets/hero-boat.jpg";
import engineImg from "@/assets/engine.jpg";
import boatImg from "@/assets/boat.jpg";
import partsImg from "@/assets/parts.jpg";
import serviceImg from "@/assets/service.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CoastalPro Marine — Built for the Long Run" },
      { name: "description", content: "Outboard engines from 2.5 to 350 HP, boats, parts and certified service. Financing available across the U.S." },
      { property: "og:title", content: "CoastalPro Marine" },
      { property: "og:description", content: "Outboard engines, boats and certified marine service." },
    ],
  }),
  component: Home,
});

const categories = [
  { to: "/engines", label: "Outboard Engines", desc: "2.5 — 350 HP", img: engineImg, icon: Cog },
  { to: "/boats", label: "Boats", desc: "Jon · Bass · Pontoon · Center Console", img: boatImg, icon: Ship },
  { to: "/parts", label: "Parts & Accessories", desc: "10,000+ items in stock", img: partsImg, icon: Wrench },
] as const;

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-deep">
        <img
          src={heroImg}
          alt="Center console fishing boat at sunrise"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 w-full text-background">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-3">
            <Anchor className="h-3.5 w-3.5" />
            Authorized Marine Dealer · Est. 1998
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] max-w-5xl text-balance">
            Built for the long run.<br />
            <span className="text-accent italic font-normal">Powered by the tide.</span>
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/engines"
              className="group inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold shadow-sun hover:scale-[1.02] transition-transform"
            >
              Browse engines
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/boats"
              className="inline-flex items-center gap-3 rounded-full border border-background/30 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm hover:bg-background/10"
            >
              Shop boats
            </Link>
          </div>
        </div>

        {/* stat strip */}
        <div className="absolute bottom-0 left-0 right-0 hidden md:block">
          <div className="mx-auto max-w-7xl px-6">
            <div className="bg-background/95 backdrop-blur border-t border-border grid grid-cols-4 divide-x divide-border">
              {[
                ["27", "Years on the water"],
                ["350 HP", "Max engine power"],
                ["10K+", "Parts in stock"],
                ["50", "States shipped"],
              ].map(([n, l]) => (
                <div key={l} className="px-6 py-5">
                  <div className="font-display text-2xl md:text-3xl font-semibold text-foreground">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Catalog</div>
              <h2 className="font-display text-4xl md:text-5xl max-w-xl leading-tight">Everything that moves on water.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              From a 2.5 HP kicker to a fully rigged offshore center console — we stock and service it all.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group relative overflow-hidden rounded-2xl bg-card aspect-[4/5] shadow-deep"
                >
                  <img
                    src={c.img}
                    alt={c.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />
                  <div className="absolute inset-0 p-7 flex flex-col justify-between text-background">
                    <Icon className="h-6 w-6 text-accent" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-background/70 mb-2">{c.desc}</div>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-3xl">{c.label}</h3>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-deep">
            <img src={serviceImg} alt="Certified marine technician" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Service & Support</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              Certified technicians.<br />
              <span className="italic text-muted-foreground">Backed by 27 years on the water.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our master-certified marine techs handle warranty repairs, repowers, winterization and
              full diagnostics — for recreational captains, charter operators and commercial fleets.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { i: ShieldCheck, t: "Factory-Authorized", d: "Yamaha, Mercury, Suzuki & more" },
                { i: Wrench, t: "On-water Service", d: "Mobile diagnostics available" },
                { i: CreditCard, t: "Flexible Financing", d: "Terms up to 240 months" },
                { i: Cog, t: "Genuine OEM Parts", d: "Same-day shipping nationwide" },
              ].map(({ i: Icon, t, d }) => (
                <div key={t} className="flex gap-3">
                  <Icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">{t}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/service"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors"
            >
              Schedule service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTS CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-deep text-background p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Parts Counter</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-4">
                10,000+ parts.<br />Shipped to all 50 states.
              </h2>
              <p className="text-background/70 max-w-md mb-8">
                Propellers, batteries, fuel systems, electronics, trailers, maintenance kits — if it's
                marine, we stock it.
              </p>
              <Link
                to="/parts"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:scale-[1.02] transition-transform"
              >
                Shop the parts catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <img
              src={partsImg}
              alt="Marine parts"
              className="rounded-2xl aspect-square object-cover w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
