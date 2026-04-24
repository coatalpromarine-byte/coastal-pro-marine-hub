import { useEffect, useState } from "react";
import { useSeo } from "@/lib/seo";
import { Link } from "react-router-dom";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { ArrowRight, Users, Fish, Compass, Anchor, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import boatImg from "@/assets/boat.jpg";
import { fetchProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";

const lines = [
  { name: "Jon Boats", use: "Backwater & utility", len: "10 – 18 ft", price: "from $2,990", icon: Anchor, desc: "Aluminum flat-bottom hulls built for shallow creeks, pond fishing and heavy-duty work." },
  { name: "Bass Boats", use: "Tournament fishing", len: "17 – 21 ft", price: "from $24,900", icon: Fish, desc: "Lightning-fast fiberglass with aerated livewells, rod lockers and tournament-grade electronics." },
  { name: "Pontoons", use: "Family cruising", len: "20 – 28 ft", price: "from $32,500", icon: Users, desc: "Triple-tube performance with plush lounge seating, Bimini tops and Bluetooth audio." },
  { name: "Center Consoles", use: "Bluewater & charter", len: "22 – 36 ft", price: "from $58,000", icon: Compass, desc: "Deep-V offshore hulls with leaning posts, outriggers and twin- or quad-engine rigging." },
];

function Boats() {
  useSeo({
    title: "New Boats For Sale — Jon, Bass, Pontoon & Center Console | CoastalPro Marine",
    description: "Shop new boats for sale: jon boats, bass boats, pontoons and offshore center consoles from 10 to 36 ft. Authorized dealer with sea trials and trade-ins welcome.",
    keywords: "boats for sale, jon boats, bass boats, pontoon boats, center console boats, fishing boats, new boats, boat dealer NC, offshore boats, aluminum boats",
    ogTitle: "Boats For Sale | CoastalPro Marine",
    ogDescription: "Jon boats, bass boats, pontoons and center consoles. Sea trials available.",
    ogImage: boatImg,
    twitterImage: boatImg,
    twitterCard: "summary_large_image",
    canonical: "https://coastalpromarine.com/boats",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts("boats").then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Boats"
        title="The right hull for every horizon."
        italicWords={[4, 5]}
        description="From skinny-water jon boats to fully-rigged offshore consoles, our showroom carries hulls for every captain and every mission."
        image={boatImg}
      />

      {(loading || products.length > 0) && (
        <section className="py-20 md:py-28">
          <Container>
            <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
              <div>
                <Reveal><SectionLabel>In stock</SectionLabel></Reveal>
                <Reveal delay={0.1}>
                  <h2 className="font-display text-3xl md:text-5xl mt-4 leading-tight">Available <span className="italic font-normal text-muted-foreground">now.</span></h2>
                </Reveal>
              </div>
            </div>
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
          <Reveal><SectionLabel>Categories</SectionLabel></Reveal>
          <Reveal delay={0.1}><h2 className="font-display text-3xl md:text-5xl mt-4 mb-10 leading-tight">Explore the <span className="italic font-normal text-muted-foreground">lineup.</span></h2></Reveal>
          <StaggerGroup className="space-y-5">
            {lines.map((l) => {
              const Icon = l.icon;
              return (
                <StaggerItem key={l.name}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="group relative grid md:grid-cols-12 items-center gap-6 rounded-2xl border border-border bg-card p-7 hover:shadow-elevated transition-shadow duration-700"
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-px bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-700" />
                    <div className="md:col-span-1">
                      <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                        <Icon className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="font-display text-2xl">{l.name}</h3>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">{l.use}</p>
                    </div>
                    <p className="md:col-span-4 text-sm text-muted-foreground font-light">{l.desc}</p>
                    <div className="md:col-span-2 text-sm text-muted-foreground font-mono">{l.len}</div>
                    <div className="md:col-span-2 flex items-center justify-between">
                      <span className="font-display text-lg text-accent">{l.price}</span>
                      <div className="h-9 w-9 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
          <Reveal delay={0.2} className="mt-14 rounded-2xl bg-secondary p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              Trade-ins welcome. Sea trials available by appointment.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500 shrink-0"
            >
              Schedule a sea trial <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <ProductDetailModal product={active} onClose={() => setActive(null)} />
    </>
  );
}

export default Boats;
