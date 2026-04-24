"use client";
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import engineImg from "@/assets/engine.jpg";
import { fetchProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";

export const Route = createFileRoute("/engines")({
  head: () => ({
    meta: [
      { title: "Outboard Engines For Sale 2.5–350 HP | Yamaha, Mercury, Suzuki | CoastalPro Marine" },
      { name: "description", content: "Authorized dealer for Yamaha, Mercury, Suzuki and Honda outboard engines from 2.5 to 350 HP. Portable kickers, mid-range 4-strokes, V6 performance and V8 offshore powerheads." },
      { name: "keywords", content: "outboard engines for sale, Yamaha outboard, Mercury outboard, Suzuki outboard, Honda outboard, 4-stroke outboard, V6 outboard, repower marine engine, 350 HP outboard, kicker motor" },
      { property: "og:title", content: "Outboard Engines | CoastalPro Marine" },
      { property: "og:description", content: "2.5 to 350 HP outboards from every major brand. Authorized dealer." },
      { property: "og:image", content: engineImg },
      { name: "twitter:image", content: engineImg },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://coastalpromarine.com/engines" }],
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts("engines").then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Outboard Engines"
        title="From kicker to offshore monster."
        italicWords={[2, 3, 4]}
        description="We're an authorized dealer for every major outboard brand. Whether you need a 2.5 HP backup or a quad-rigged 350, we'll spec, deliver and service it."
        image={engineImg}
      />

      {(loading || products.length > 0) && (
        <section className="py-20 md:py-28">
          <Container>
            <Reveal><SectionLabel>In stock</SectionLabel></Reveal>
            <Reveal delay={0.1}><h2 className="font-display text-3xl md:text-5xl mt-4 mb-10 leading-tight">Available <span className="italic font-normal text-muted-foreground">now.</span></h2></Reveal>
            {loading ? (
              <div className="py-10 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div>
            ) : (
              <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <StaggerItem key={p.id}><ProductCard product={p} onView={setActive} /></StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </Container>
        </section>
      )}

      <section className="py-16 md:py-24">
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
      <ProductDetailModal product={active} onClose={() => setActive(null)} />
    </>
  );
}
