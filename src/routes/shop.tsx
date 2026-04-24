"use client";
import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { Loader2, Search } from "lucide-react";
import heroImg from "@/assets/hero-boat.jpg";
import { fetchProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const CATS = [
  { key: "all", label: "All" },
  { key: "boats", label: "Boats" },
  { key: "engines", label: "Engines" },
  { key: "parts", label: "Parts" },
] as const;

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Marine Boats, Outboard Engines & Parts Online | CoastalPro Marine" },
      { name: "description", content: "Browse the full CoastalPro Marine catalog: new boats, outboard engines from 2.5 to 350 HP, propellers, batteries, electronics and 10,000+ marine parts shipped nationwide." },
      { name: "keywords", content: "shop marine boats, outboard engines for sale, marine parts online, boat propellers, marine batteries, fishing boats, pontoon boats, center console boats, marine accessories" },
      { property: "og:title", content: "Shop — CoastalPro Marine" },
      { property: "og:description", content: "The full catalog: boats, engines, parts and accessories." },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "https://coastalpromarine.com/shop" }],
  }),
  component: Shop,
});

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<(typeof CATS)[number]["key"]>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (q && !`${p.name} ${p.tagline ?? ""} ${p.description ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [products, cat, q]);

  return (
    <>
      <PageHero
        eyebrow="Shop the Catalog"
        title="Every product. One place."
        italicWords={[2, 3]}
        description="Boats, outboard engines, propellers, batteries, electronics — search and filter the full CoastalPro Marine catalog."
        image={heroImg}
      />

      <section className="py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionLabel>Browse</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl mt-4 mb-8 leading-tight">
              {filtered.length} <span className="italic font-normal text-muted-foreground">products</span>
            </h2>
          </Reveal>

          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10">
            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCat(c.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
                    cat === c.key
                      ? "bg-foreground text-background border-foreground"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-secondary border-0 rounded-full pl-11 pr-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">No products match your filters.</div>
          ) : (
            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </Container>
      </section>
    </>
  );
}
