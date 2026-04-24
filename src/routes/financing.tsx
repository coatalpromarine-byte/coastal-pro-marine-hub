
import { useState, useMemo } from "react";
import { useSeo } from "@/lib/seo";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { motion } from "framer-motion";
import {
  Check,
  ShoppingCart,
  FileText,
  Truck,
  Sparkles,
  Calendar,
  RefreshCw,
  Building2,
  ShieldCheck,
  Zap,
  Landmark,
  Unlock,
  Wrench,
  Repeat,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FORMSUBMIT_ENDPOINT, FORMSUBMIT_AJAX } from "@/lib/constants";
import { toast } from "sonner";

const steps = [
  {
    icon: ShoppingCart,
    title: "Choose Your Product",
    body:
      "Browse our full inventory of outboard engines, boats, and packages. Add any item to your cart or request a custom quote from our team. There's no obligation at this stage — just pick what you want.",
  },
  {
    icon: FileText,
    title: "Apply Online",
    body:
      "Fill out our short financing application — it takes about 3 minutes. We do a soft credit check first, which means no impact to your credit score until you accept an offer. We work with multiple lenders to find your best available rate.",
  },
  {
    icon: Truck,
    title: "Get Approved & Take Delivery",
    body:
      "Most customers receive a decision within a few hours. Once approved, we confirm your order and arrange delivery or dealer pickup. In most cases your product ships within 3–7 business days of financing confirmation.",
  },
];

const options = [
  {
    icon: Sparkles,
    badge: "Most Popular",
    featured: true,
    title: "0% APR Promotional Offer",
    rate: "0% APR",
    rateLabel: "12 months, interest-free",
    bullets: [
      "Minimum purchase: $2,500 or more",
      "Pay zero interest if balance is paid within 12 months",
      "Minimum monthly payment required",
      "Deferred interest may apply if not paid in full",
      "Qualifies: credit score 680+",
      "Available on engines, boats, packages & accessories",
    ],
  },
  {
    icon: Calendar,
    title: "Standard Installment Plan",
    rate: "From 4.99% APR",
    rateLabel: "24 / 36 / 48 / 60 month terms",
    bullets: [
      "Minimum purchase: $500",
      "Fixed monthly payments — rate locked at approval",
      "24 mo — 5.49% APR",
      "36 mo — 6.49% APR",
      "48 mo — 6.99% APR · 60 mo — 7.49% APR",
      "Qualifies: credit score 580+ · Available on all products",
    ],
  },
  {
    icon: RefreshCw,
    title: "Trade-In + Finance",
    rate: "Lower your loan",
    rateLabel: "Apply trade equity at signing",
    bullets: [
      "Bring in your old outboard, boat or marine gear",
      "Fair market value applied as credit toward your purchase",
      "Finance only the remaining balance",
      "We accept any brand, any condition",
      "Online estimate — response within 24 hours",
      "Combine with any other financing option above",
    ],
  },
  {
    icon: Building2,
    title: "Commercial & Fleet Financing",
    rate: "Custom terms",
    rateLabel: "Charters · Marinas · Rentals · Gov't",
    bullets: [
      "Bulk pricing on 3+ units",
      "Net-30, Net-60, Net-90 payment terms",
      "Custom multi-year financing arrangements",
      "Dedicated account manager",
      "Priority parts and service access",
      "Contact our commercial team for a proposal",
    ],
  },
];

const whyFinance = [
  { icon: ShieldCheck, title: "No Hard Pull to Check Your Rate", body: "Soft inquiry first — see your options without affecting your credit score. Hard pull only when you accept an offer." },
  { icon: Zap, title: "Same-Day Decisions", body: "Most applications are reviewed within a few hours during business hours. Many receive instant automated approval." },
  { icon: Landmark, title: "Multiple Lender Partners", body: "We shop your application across a network of marine lending specialists to find you the most competitive rate." },
  { icon: Unlock, title: "No Prepayment Penalty", body: "Pay off your loan early at any time with zero penalty fees. Eliminates remaining interest on standard installment plans." },
  { icon: Wrench, title: "Finance Parts Too", body: "Orders of $500 or more — including parts, accessories and maintenance kits — are eligible for financing." },
  { icon: Repeat, title: "Easy Trade-In", body: "Get a fair estimate online. We handle the logistics and apply the credit directly — no separate transaction." },
];

const faqs = [
  { q: "What credit score do I need to qualify?", a: "Most of our lender partners work with credit scores from 580 and above. The 0% APR promotional offer typically requires a score of 680 or higher. If your score is below 580, contact our team — we have lenders who specialize in credit-challenged customers and can often still find a solution." },
  { q: "Does applying affect my credit score?", a: "No — checking your rate is a soft inquiry and does not affect your credit score at all. A hard inquiry only occurs once you formally accept a loan offer. This lets you explore your options completely risk-free." },
  { q: "How fast will I get a decision?", a: "Most customers receive a decision within a few hours during business hours. In many cases, the decision is instant. Once approved, we can arrange delivery within 3–7 business days depending on your location." },
  { q: "Can I finance parts and accessories?", a: "Yes. Any order totaling $500 or more is eligible for financing — including parts, accessories, and maintenance supplies. You can also add parts to an engine or boat purchase and finance the entire order together as one monthly payment." },
  { q: "Is there a prepayment penalty?", a: "Absolutely not. You can pay off your balance at any time with no fees or penalties. Paying early also eliminates any remaining interest on standard installment plans — so it always pays to pay ahead." },
  { q: "What documents do I need to apply?", a: "For most personal applications you'll need: a government-issued photo ID, proof of income (recent pay stub, tax return, or 3 months of bank statements), and your Social Security number. Commercial applicants may also need a business EIN and recent business financials." },
  { q: "Can I combine a trade-in with a financing plan?", a: "Yes. Submit your trade-in estimate first, we'll confirm the value, and that amount is applied as a down payment toward your financed purchase. This reduces your loan amount and lowers your monthly payment." },
  { q: "What happens if I don't pay off the 0% promo balance in 12 months?", a: "If the full balance is not paid by the end of the 12-month promotional period, deferred interest from the original purchase date may be applied at the standard rate. We recommend setting up automatic payments to avoid this." },
];

const trustStrip = [
  { icon: ShieldCheck, stat: "No Hard Pull", label: "Check your rate risk-free" },
  { icon: Zap, stat: "Same-Day Decision", label: "Most approved in hours" },
  { icon: Landmark, stat: "Multiple Lenders", label: "We find your best rate" },
  { icon: Unlock, stat: "No Prepayment Penalty", label: "Pay off early anytime" },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

const TERM_OPTIONS = [
  { value: "12", label: "12 Months – 0% APR", apr: 0 },
  { value: "24", label: "24 Months – 5.49% APR", apr: 5.49 },
  { value: "36", label: "36 Months – 6.49% APR", apr: 6.49 },
  { value: "48", label: "48 Months – 6.99% APR", apr: 6.99 },
  { value: "60", label: "60 Months – 7.49% APR", apr: 7.49 },
];

const DOWN_OPTIONS = [
  { value: "0", label: "No Down Payment (0%)" },
  { value: "10", label: "10% Down" },
  { value: "20", label: "20% Down" },
  { value: "30", label: "30% Down" },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function Financing() {
  useSeo({
    title: "Boat & Outboard Financing — 0% APR Available | CoastalPro Marine",
    description: "Finance your outboard engine, boat, or marine parts with 0% APR for 12 months or terms up to 60 months. Soft credit pull, same-day decisions, no prepayment penalty.",
    keywords: "boat financing, 0 APR boat loan, outboard engine financing, marine loan calculator, boat loan rates, finance marine parts, trade in boat motor, commercial fleet financing, no hard credit pull boat loan",
    ogTitle: "Financing Made Simple | CoastalPro Marine",
    ogDescription: "0% APR for 12 months or fixed rates from 4.99%. Apply in 3 minutes with no impact to your credit score.",
    canonical: "https://coastalpromarine.com/financing",
  });
  // Calculator state
  const [price, setPrice] = useState<number>(8299);
  const [downPct, setDownPct] = useState<string>("0");
  const [term, setTerm] = useState<string>("12");
  const [calculated, setCalculated] = useState<null | { monthly: number; total: number; interest: number; apr: number; n: number }>(null);

  const calculate = () => {
    const t = TERM_OPTIONS.find((x) => x.value === term)!;
    const down = (Number(downPct) / 100) * price;
    const principal = Math.max(0, price - down);
    const n = Number(term);
    let monthly = 0;
    if (t.apr === 0) {
      monthly = principal / n;
    } else {
      const r = t.apr / 100 / 12;
      monthly = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }
    const total = monthly * n;
    const interest = Math.max(0, total - principal);
    setCalculated({ monthly, total, interest, apr: t.apr, n });
  };

  // Application form
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSUBMIT_AJAX, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("Submission failed");
      toast.success("Application submitted! We'll be in touch shortly.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const ratesTable = useMemo(
    () => [
      { term: "12 months", apr: "0% (promo)", monthly: "~$691/mo" },
      { term: "24 months", apr: "5.49%", monthly: "~$365/mo" },
      { term: "36 months", apr: "6.49%", monthly: "~$254/mo" },
      { term: "48 months", apr: "6.99%", monthly: "~$198/mo" },
      { term: "60 months", apr: "7.49%", monthly: "~$166/mo" },
    ],
    [],
  );

  return (
    <>
      <PageHero
        eyebrow="Financing"
        title="Financing Made Simple"
        italicWords={[1]}
        description="Get on the water today — pay over time with flexible plans built for every budget."
      />

      {/* Intro */}
      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <p className="max-w-3xl mx-auto text-center text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
              Buying a new engine or boat is a big decision, and we want to make it as easy as possible. CoastalPro Marine partners with trusted lenders to offer competitive financing options for engines, boats, packages, and even parts and accessories. Whether you're buying your first outboard or upgrading to an offshore powerhouse, we have a payment plan that works for you. Apply online in minutes, get a decision the same day, and hit the water sooner than you think.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal><SectionLabel>How it works</SectionLabel></Reveal>
            <Reveal delay={0.1} className="mt-5">
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">
                Three steps <span className="italic font-normal text-muted-foreground">to the water</span>
              </h2>
            </Reveal>
          </div>
          <StaggerGroup className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="h-full rounded-2xl bg-background border border-border p-8 hover:shadow-elevated transition-shadow duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground tracking-[0.3em]">STEP {i + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Financing Options */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal><SectionLabel>Financing Options</SectionLabel></Reveal>
            <Reveal delay={0.1} className="mt-5">
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">
                Choose the plan <span className="italic font-normal text-muted-foreground">that fits.</span>
              </h2>
            </Reveal>
          </div>
          <StaggerGroup className="grid md:grid-cols-2 gap-8">
            {options.map((o) => (
              <StaggerItem key={o.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className={
                    o.featured
                      ? "relative h-full rounded-2xl bg-gradient-deep text-background p-10 shadow-elevated noise overflow-hidden"
                      : "relative h-full rounded-2xl bg-background border border-border p-10 hover:shadow-elevated transition-shadow duration-500"
                  }
                >
                  {o.featured && (
                    <>
                      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                      <div className="relative inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] mb-6">
                        <Sparkles className="h-3 w-3" />
                        {o.badge}
                      </div>
                    </>
                  )}
                  <div className="relative">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-6 ${o.featured ? "bg-accent/20 text-accent" : "bg-accent/15 text-accent"}`}>
                      <o.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-3xl mb-2">{o.title}</h3>
                    <div className={`font-display text-2xl mb-1 ${o.featured ? "text-accent" : ""}`}>{o.rate}</div>
                    <div className={`text-sm mb-6 ${o.featured ? "text-background/60" : "text-muted-foreground"}`}>{o.rateLabel}</div>
                    <ul className="space-y-3">
                      {o.bullets.map((b) => (
                        <li key={b} className="flex gap-3 items-start text-sm font-light">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${o.featured ? "text-accent" : "text-accent"}`} />
                          <span className={o.featured ? "text-background/80" : ""}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Calculator */}
      <section className="py-20 md:py-28 bg-muted/30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <Reveal><SectionLabel>Payment Calculator</SectionLabel></Reveal>
              <Reveal delay={0.1} className="mt-5">
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-5 text-balance">
                  Estimate your <span className="italic font-normal text-muted-foreground">monthly payment</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-muted-foreground font-light mb-8">
                  Adjust the numbers below to see what your payment could look like. This is an estimate — your actual rate depends on your credit profile and the lender's terms.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="rounded-2xl bg-background border border-border p-8 space-y-6">
                  <div>
                    <Label htmlFor="price" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Purchase Price</Label>
                    <Input
                      id="price"
                      type="number"
                      min={500}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value) || 0)}
                      className="mt-2 h-12 text-lg font-display"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Down Payment</Label>
                    <Select value={downPct} onValueChange={setDownPct}>
                      <SelectTrigger className="mt-2 h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {DOWN_OPTIONS.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Loan Term</Label>
                    <Select value={term} onValueChange={setTerm}>
                      <SelectTrigger className="mt-2 h-12"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {TERM_OPTIONS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <button
                    type="button"
                    onClick={calculate}
                    className="btn-premium w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
                  >
                    Calculate
                  </button>
                  <p className="text-[10px] text-muted-foreground/70 font-mono leading-relaxed">
                    Estimated for illustration purposes only. Actual APR, monthly payments, and loan terms depend on creditworthiness and lender approval. APR range: 0%–17.99%. Minimum finance amount: $500. See your lender agreement for full terms and conditions. CoastalPro Marine is not a lender — we connect customers with third-party financing partners.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal y={50} delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="rounded-2xl bg-gradient-deep text-background p-10 md:p-12 shadow-elevated noise relative overflow-hidden lg:sticky lg:top-28"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                <div className="relative">
                  <div className="text-[11px] uppercase tracking-[0.4em] text-accent mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" />
                    Your Estimate
                  </div>
                  {calculated ? (
                    <>
                      <div className="text-background/60 text-sm mb-2">Monthly Payment</div>
                      <h3 className="font-display text-6xl leading-tight mb-8 text-shimmer">{fmt(calculated.monthly)}</h3>
                      <div className="space-y-0 divide-y divide-background/10">
                        <div className="flex justify-between py-4">
                          <span className="text-background/60 font-light">Loan term</span>
                          <span className="font-display text-lg">{calculated.n} months</span>
                        </div>
                        <div className="flex justify-between py-4">
                          <span className="text-background/60 font-light">APR</span>
                          <span className="font-display text-lg">{calculated.apr === 0 ? "0% (promo)" : `${calculated.apr}%`}</span>
                        </div>
                        <div className="flex justify-between py-4">
                          <span className="text-background/60 font-light">Total paid</span>
                          <span className="font-display text-lg">{fmt(calculated.total)}</span>
                        </div>
                        <div className="flex justify-between py-4">
                          <span className="text-background/60 font-light">Total interest</span>
                          <span className="font-display text-lg text-accent">
                            {calculated.interest === 0 ? "$0.00 🎉" : fmt(calculated.interest)}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-shimmer">Sample rates on $8,299</h3>
                      <div className="space-y-0 divide-y divide-background/10">
                        {ratesTable.map((r) => (
                          <div key={r.term} className="flex justify-between py-4 group">
                            <span className="text-background/60 font-light">{r.term} · {r.apr}</span>
                            <span className="font-display text-lg group-hover:text-accent transition-colors duration-500">{r.monthly}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-background/50 mt-6 font-mono">
                        Click <span className="text-accent">Calculate</span> with your numbers for a personalized estimate.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why finance with us */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal><SectionLabel>Why finance with us</SectionLabel></Reveal>
            <Reveal delay={0.1} className="mt-5">
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">
                The difference is <span className="italic font-normal text-muted-foreground">in the details.</span>
              </h2>
            </Reveal>
          </div>
          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFinance.map((w) => (
              <StaggerItem key={w.title}>
                <div className="h-full rounded-2xl border border-border bg-background p-8 hover:shadow-elevated transition-shadow duration-500">
                  <div className="h-11 w-11 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-5">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl mb-2">{w.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{w.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-muted/30">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <Reveal><SectionLabel>FAQ</SectionLabel></Reveal>
              <Reveal delay={0.1} className="mt-5">
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">
                  Common <span className="italic font-normal text-muted-foreground">questions.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-muted-foreground font-light">
                  Still have questions? Our financing team is here to help — reach out anytime.
                </p>
              </Reveal>
            </div>
            <Reveal y={30} delay={0.2}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                    <AccordionTrigger className="text-left font-display text-lg md:text-xl py-6 hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Reveal><SectionLabel>Application</SectionLabel></Reveal>
              <Reveal delay={0.1} className="mt-5">
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">
                  Start your <span className="italic font-normal text-muted-foreground">application.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-muted-foreground font-light">
                  Takes about 3 minutes. No hard credit pull until you accept an offer.
                </p>
              </Reveal>
            </div>

            <Reveal y={30} delay={0.2}>
              <form
                onSubmit={onSubmit}
                action={FORMSUBMIT_ENDPOINT}
                method="POST"
                className="rounded-2xl bg-background border border-border p-8 md:p-10 space-y-6"
              >
                <input type="hidden" name="_subject" value="New Financing Application – CoastalPro Marine" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="First Name" required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="Last Name" required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="Email" type="email" required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="Phone" type="tel" required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select name="State" required>
                      <SelectTrigger className="mt-2 h-11"><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent className="max-h-64">
                        {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="loanAmount">Desired Loan Amount ($) *</Label>
                    <Input id="loanAmount" name="Desired Loan Amount" type="number" min={500} required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="financingType">What Are You Financing? *</Label>
                    <Select name="Financing For" required>
                      <SelectTrigger className="mt-2 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Outboard Engine">Outboard Engine</SelectItem>
                        <SelectItem value="Boat">Boat</SelectItem>
                        <SelectItem value="Engine + Boat Package">Engine + Boat Package</SelectItem>
                        <SelectItem value="Parts & Accessories">Parts & Accessories</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="purchasePrice">Estimated Purchase Price ($) *</Label>
                    <Input id="purchasePrice" name="Purchase Price" type="number" min={0} required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="income">Annual Income ($) *</Label>
                    <Input id="income" name="Annual Income" type="number" min={0} required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="employment">Employment Status *</Label>
                    <Select name="Employment Status" required>
                      <SelectTrigger className="mt-2 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Employed Full-Time">Employed Full-Time</SelectItem>
                        <SelectItem value="Employed Part-Time">Employed Part-Time</SelectItem>
                        <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="downPayment">Down Payment Amount ($)</Label>
                    <Input id="downPayment" name="Down Payment" type="number" min={0} className="mt-2 h-11" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" name="Notes" rows={4} className="mt-2" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-premium w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500 disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {submitting ? "Submitting..." : "Submit My Application →"}
                </button>

                <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-light">
                  By submitting this application, you authorize CoastalPro Marine and its lending partners to verify the information provided and perform a soft credit inquiry. This does not affect your credit score. A hard credit inquiry will only occur if you choose to accept a loan offer. Financing is subject to credit approval. CoastalPro Marine is not a lender — we act as a facilitator connecting customers with third-party marine lending partners. See full terms at checkout.
                </p>
              </form>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Trust Strip */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustStrip.map((t) => (
              <div key={t.stat} className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-lg md:text-xl">{t.stat}</div>
                <div className="text-xs text-muted-foreground mt-1 font-light">{t.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Financing;
