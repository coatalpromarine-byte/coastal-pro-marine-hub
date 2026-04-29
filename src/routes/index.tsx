import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Cog, Ship, Wrench, CreditCard, ShieldCheck, Anchor, ArrowUpRight, Quote, Award, Truck, Headphones, Sparkles, MapPin, Clock, ThumbsUp } from "lucide-react";
import heroImg from "@/assets/hero-boat.jpg";
import engineImg from "@/assets/engine.jpg";
import boatImg from "@/assets/boat.jpg";
import partsImg from "@/assets/parts.jpg";
import serviceImg from "@/assets/service.jpg";
import { Reveal, SplitHeading, StaggerGroup, StaggerItem } from "../components/Motion";
import { SectionLabel } from "../components/Section";
import { BrandMarquee, FloatingBadge } from "../components/BrandMarquee";

const categories = [
  { to: "/engines", label: "Outboard Engines", desc: "2.5 — 350 HP", img: engineImg, icon: Cog, no: "01" },
  { to: "/boats", label: "Boats", desc: "Jon · Bass · Pontoon · Center Console", img: boatImg, icon: Ship, no: "02" },
  { to: "/parts", label: "Parts & Accessories", desc: "10,000+ items in stock", img: partsImg, icon: Wrench, no: "03" },
] as const;

function Home() {
  useSeo({
    title: "CoastalPro Marine — Outboard Engines, Boats & Marine Parts Dealer",
    description: "Authorized marine dealer since 1998. Shop outboard engines (2.5–350 HP), new boats, 10,000+ marine parts and certified service. Financing available, shipping to all 50 states.",
    keywords: "marine dealer, outboard engines for sale, new boats for sale, marine parts, boat financing, certified marine service, Yamaha outboard, Mercury outboard, Suzuki outboard, fishing boats, pontoon boats",
    ogTitle: "CoastalPro Marine — Outboard Engines, Boats & Parts",
    ogDescription: "Authorized dealer of outboard engines, boats and 10,000+ marine parts. Certified service & financing.",
    ogImage: heroImg,
    ogType: "website",
    twitterImage: heroImg,
    twitterCard: "summary_large_image",
    canonical: "https://coastalpromarine.com/",
  });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-end overflow-hidden bg-deep noise">
        <motion.img
          src={heroImg}
          alt="Center console fishing boat at sunrise"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y: heroY, scale: heroScale }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-deep/40" />

        <motion.div style={{ opacity: heroOpacity }} className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 w-full text-background">
          <Reveal className="text-[11px] uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
            <Anchor className="h-3.5 w-3.5" />
            <span className="h-px w-10 bg-accent" />
            Authorized Marine Dealer · Est. 1998
          </Reveal>

          <SplitHeading
            text="Built for the long run."
            className="font-display text-5xl md:text-7xl lg:text-[7rem] font-semibold leading-[0.95] text-balance"
          />
          <SplitHeading
            text="Powered by the tide."
            italic={[0, 1, 2, 3]}
            className="font-display text-5xl md:text-7xl lg:text-[7rem] font-semibold leading-[0.95] text-balance mt-2"
          />

          <Reveal delay={0.7} className="mt-10 max-w-lg text-lg text-background/75 leading-relaxed font-light">
            Twenty-seven years rigging, repowering and servicing the boats that take captains
            from the marsh to the gulfstream.
          </Reveal>

          <Reveal delay={0.85} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/engines"
              className="btn-premium group inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold shadow-sun hover:scale-[1.02] transition-transform duration-500"
            >
              Browse engines
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
            <Link
              to="/boats"
              className="group inline-flex items-center gap-3 rounded-full border border-background/30 px-8 py-4 text-sm font-semibold backdrop-blur-sm hover:bg-background/10 hover:border-background/60 transition-all duration-500"
            >
              Shop boats
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-500" />
            </Link>
          </Reveal>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-3 text-background/60"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-background/40"
          />
        </motion.div>
      </section>

      {/* STAT STRIP */}
      <section className="relative -mt-px border-y border-border bg-background z-10">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          <FloatingBadge value="27" label="Years on the water" />
          <FloatingBadge value="350 HP" label="Max engine power" delay={0.1} />
          <FloatingBadge value="10K+" label="Parts in stock" delay={0.2} />
          <FloatingBadge value="50" label="States shipped" delay={0.3} />
        </div>
      </section>

      <BrandMarquee />

      {/* FEATURES */}
      <section className="py-24 md:py-32 bg-secondary noise relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <Reveal><SectionLabel>Why CoastalPro</SectionLabel></Reveal>
              <Reveal delay={0.1} className="mt-5">
                <h2 className="font-display text-5xl md:text-6xl leading-[1.02] text-balance max-w-2xl">
                  Built different. <span className="italic font-normal text-muted-foreground">Backed harder.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="max-w-sm text-muted-foreground text-pretty">
              Six reasons captains, charter operators and weekend anglers keep coming back to our docks.
            </Reveal>
          </div>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { i: Award, t: "Authorized Dealer", d: "Factory-authorized for Yamaha, Mercury, Suzuki, Honda and the leading boat builders." },
              { i: Truck, t: "Nationwide Shipping", d: "Parts ship same-day. Boats and engines delivered to all 50 states." },
              { i: ShieldCheck, t: "Master-Certified Techs", d: "Our service crew averages 15+ years on the bench. Warranty work is in-house." },
              { i: CreditCard, t: "Flexible Financing", d: "Terms up to 240 months with the top marine lenders. Pre-approval in minutes." },
              { i: Headphones, t: "Lifetime Support", d: "Talk to a real person. After-sale support that doesn't stop at the parking lot." },
              { i: Sparkles, t: "Trade-Ins Welcome", d: "Honest valuations and equity applied straight to your next boat or engine." },
            ].map(({ i: Icon, t, d }) => (
              <StaggerItem key={t}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="group h-full rounded-2xl bg-background border border-border p-7 hover:shadow-elevated transition-shadow duration-700 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent transition-colors duration-500">
                    <Icon className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-2xl mb-2">{t}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{d}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.3} className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { i: MapPin, t: "United States", d: "Showroom + service center" },
              { i: Clock, t: "Mon–Sat", d: "Six days a week on the dock" },
              { i: ThumbsUp, t: "98% recommend", d: "Verified customer reviews" },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="flex items-center gap-4 rounded-xl bg-background/60 p-5 border border-border/60">
                <Icon className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <div className="font-semibold text-sm">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>


      {/* CATEGORIES */}
      <section className="py-28 md:py-40 noise relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <Reveal>
                <SectionLabel>The Catalog</SectionLabel>
              </Reveal>
              <Reveal delay={0.1} className="mt-5">
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl max-w-2xl leading-[1.02] text-balance">
                  Everything that <span className="italic font-normal text-muted-foreground">moves on water.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="max-w-sm text-muted-foreground text-pretty">
              From a 2.5 HP kicker to a fully rigged offshore center console — we stock and service it all.
            </Reveal>
          </div>

          <StaggerGroup className="grid md:grid-cols-3 gap-6">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerItem key={c.to}>
                  <Link
                    to={c.to}
                    className="group relative block overflow-hidden rounded-2xl bg-card aspect-[4/5] shadow-card hover:shadow-elevated transition-shadow duration-700"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={c.img}
                        alt={c.label}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
                    <div className="absolute top-6 right-6 font-mono text-xs text-background/70">{c.no} / 03</div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-background">
                      <Icon className="h-7 w-7 text-accent" />
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.3em] text-background/70 mb-3">{c.desc}</div>
                        <div className="flex items-end justify-between gap-3">
                          <h3 className="font-display text-3xl md:text-4xl leading-tight">{c.label}</h3>
                          <div className="h-10 w-10 rounded-full border border-background/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all duration-500">
                            <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* PROMISE */}
      <section className="py-28 md:py-40 bg-secondary noise relative">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-12 items-center">
          <Reveal y={60} className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
              <img src={serviceImg} alt="Certified marine technician" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-background/85 rounded-xl p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-1">Master Tech</div>
                <div className="font-display text-xl">15+ years on the bench</div>
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-7 md:pl-8">
            <Reveal>
              <SectionLabel>Service & Support</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="mt-5">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-balance">
                Certified hands.<br />
                <span className="italic font-normal text-muted-foreground">Backed by 27 years on the water.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg font-light max-w-xl">
                Our master-certified marine techs handle warranty repairs, repowers, winterization
                and full diagnostics — for recreational captains, charter operators and commercial fleets.
              </p>
            </Reveal>
            <StaggerGroup className="grid sm:grid-cols-2 gap-5">
              {[
                { i: ShieldCheck, t: "Factory-Authorized", d: "Yamaha, Mercury, Suzuki & more" },
                { i: Wrench, t: "On-water Service", d: "Mobile diagnostics available" },
                { i: CreditCard, t: "Flexible Financing", d: "Terms up to 240 months" },
                { i: Cog, t: "Genuine OEM Parts", d: "Same-day shipping nationwide" },
              ].map(({ i: Icon, t, d }) => (
                <StaggerItem key={t}>
                  <div className="group flex gap-4 p-5 rounded-xl hover:bg-background/60 transition-colors duration-500">
                    <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-500">
                      <Icon className="h-4 w-4 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t}</div>
                      <div className="text-xs text-muted-foreground mt-1">{d}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Reveal delay={0.3}>
              <Link
                to="/service"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold link-underline"
              >
                Schedule service <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <Quote className="h-10 w-10 text-accent mx-auto mb-8 -scale-x-100" />
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="font-display text-3xl md:text-5xl leading-[1.15] text-balance">
              "They rigged a quad-350 setup on our 39-footer that's logged 4,000 hours offshore.
              <span className="italic text-muted-foreground"> Not one hiccup.</span>"
            </blockquote>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-brass flex items-center justify-center font-display text-lg text-primary">RT</div>
            <div className="text-left">
              <div className="font-semibold text-sm">Capt. Ray Tolliver</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Bluewater Charters · Morehead City</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTS CTA */}
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-deep text-background p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center noise shadow-elevated">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <Reveal>
                <SectionLabel>Parts Counter</SectionLabel>
              </Reveal>
              <Reveal delay={0.1} className="mt-5">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 text-balance">
                  10,000+ parts.<br />
                  <span className="italic font-normal text-shimmer">Shipped to all 50 states.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-background/70 max-w-md mb-10 text-lg font-light leading-relaxed">
                  Propellers, batteries, fuel systems, electronics, trailers, maintenance kits — if it's
                  marine, we stock it.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link
                  to="/parts"
                  className="btn-premium inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold hover:scale-[1.02] transition-transform duration-500"
                >
                  Shop the parts catalog <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
            <Reveal y={50} delay={0.2}>
              <motion.img
                src={partsImg}
                alt="Marine parts"
                className="rounded-2xl aspect-square object-cover w-full"
                loading="lazy"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="py-24 md:py-32 border-t border-border bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal><SectionLabel>About CoastalPro Marine</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl mt-5 mb-8 leading-[1.05] text-balance">
              Your full-service marine dealer <span className="italic font-normal text-muted-foreground">on the East Coast.</span>
            </h2>
          </Reveal>
          <div className="prose prose-lg max-w-none text-muted-foreground font-light leading-relaxed space-y-5">
            <p>
              For over 27 years, CoastalPro Marine has been the trusted name for boat sales, outboard engine repower
              and marine parts across the country. From our United States headquarters we serve recreational
              captains, charter operators and commercial fleets across all 50 states with the largest in-stock inventory
              of <strong>outboard engines from 2.5 to 350 HP</strong>, <strong>new boats</strong> from leading
              manufacturers, and over 10,000 line items of genuine OEM parts and accessories.
            </p>
            <p>
              We're an authorized dealer for the world's leading outboard brands — <strong>Yamaha, Mercury, Suzuki,
              Honda</strong> — and partner with builders making jon boats, bass boats, pontoons, bay boats and offshore
              center consoles. Whether you're rigging your first 14-foot jon boat or repowering a 36-footer with quad
              350s, our master-certified technicians have done it before, often hundreds of times.
            </p>
            <p>
              Beyond sales and service, we make ownership painless. Our financing partners offer competitive marine loan
              rates with terms up to 240 months, our parts counter ships same-day to anywhere in the U.S., and our
              winterization and spring-start packages keep your investment running for the long haul.
            </p>
            <h3 className="font-display text-2xl text-foreground mt-10 mb-4">What we sell and service</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Outboard engines:</strong> portable kickers, mid-range 4-strokes, V6 performance, V8 offshore.</li>
              <li><strong>Boats:</strong> jon boats, bass boats, pontoons, bay boats, center consoles, walkarounds.</li>
              <li><strong>Marine electronics:</strong> GPS chartplotters, sonar, VHF radios, autopilots, radar.</li>
              <li><strong>Parts &amp; accessories:</strong> propellers, batteries, fuel systems, trailer parts, maintenance kits.</li>
              <li><strong>Service:</strong> repowers, rigging, warranty work, diagnostics, winterization, on-water service.</li>
              <li><strong>Financing:</strong> pre-approval in minutes, terms up to 240 months, trade-in equity applied.</li>
            </ul>
            <p className="pt-4">
              Read what our customers say in our <Link to="/reviews" className="text-accent underline-offset-4 hover:underline">verified reviews</Link>,
              browse the full catalog in our <Link to="/shop" className="text-accent underline-offset-4 hover:underline">shop</Link>,
              or <Link to="/contact" className="text-accent underline-offset-4 hover:underline">get in touch</Link> with our sales team today.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
