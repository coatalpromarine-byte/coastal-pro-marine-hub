"use client";
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { Battery, Compass, Cog, Fuel, Truck, Wrench, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import partsImg from "@/assets/parts.jpg";
import { fetchProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";

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
  { i: Cog, n: "Propellers", c: "Aluminum, stainless, 3 & 4 blade", count: "1,200+" },
  { i: Battery, n: "Batteries", c: "Cranking, deep cycle, lithium", count: "800+" },
  { i: Fuel, n: "Fuel Systems", c: "Tanks, pumps, filters, lines", count: "2,400+" },
  { i: Compass, n: "Electronics", c: "GPS, sonar, VHF, radar", count: "1,800+" },
  { i: Truck, n: "Trailers", c: "Galvanized, aluminum, parts", count: "600+" },
  { i: Wrench, n: "Maintenance", c: "Oil, filters, impellers, plugs", count: "3,200+" },
];

function Parts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts("parts").then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Parts & Accessories"
        title="If it's marine, we stock it."
        italicWords={[3, 4, 5]}
        description="Over 10,000 line items in our warehouse — genuine OEM parts and the accessories captains actually use."
        image={partsImg}
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
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cats.map(({ i: Icon, n, c, count }) => (
              <StaggerItem key={n}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="group rounded-2xl border border-border bg-card p-8 hover:shadow-elevated transition-shadow duration-700 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                      <Icon className="h-6 w-6 text-foreground group-hover:text-accent-foreground transition-colors duration-500" />
                    </div>
                    <span className="font-mono text-sm text-accent">{count}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-2">{n}</h3>
                  <p className="text-sm text-muted-foreground font-light">{c}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.2} className="mt-16 rounded-2xl bg-gradient-deep text-background p-10 md:p-12 text-center noise relative">
            <p className="text-sm text-background/70 mb-3">Need a hard-to-find part? Call our parts counter.</p>
            <a href="tel:+18005550199" className="inline-block font-display text-4xl md:text-5xl text-shimmer">
              (800) 555-0199
            </a>
          </Reveal>
        </Container>
      </section>
      <ProductDetailModal product={active} onClose={() => setActive(null)} />
    </>
  );
}
