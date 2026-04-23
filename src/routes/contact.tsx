"use client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, FORMSUBMIT_AJAX } from "@/lib/constants";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CoastalPro Marine" },
      { name: "description", content: "Visit our showroom in Wilmington, NC or reach our sales, parts and service teams." },
      { property: "og:title", content: "Contact | CoastalPro Marine" },
      { property: "og:description", content: "Reach our sales, parts and service teams." },
    ],
  }),
  component: Contact,
});

const info = [
  { i: MapPin, t: "Showroom & Service", d: "2400 Harbor Way\nWilmington, NC 28401" },
  { i: Phone, t: "Phone", d: CONTACT_PHONE_DISPLAY },
  { i: Mail, t: "Email", d: CONTACT_EMAIL },
  { i: Clock, t: "Hours", d: "Mon–Fri 8am–6pm\nSat 9am–4pm · Sun closed" },
];

function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSUBMIT_AJAX, { method: "POST", headers: { Accept: "application/json" }, body: fd });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you shortly.");
        e.currentTarget.reset();
      } else {
        const j = await res.json().catch(() => ({}));
        toast.error(j.message || "Failed to send. Try again.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Stop by. Or give us a call."
        italicWords={[3, 4, 5, 6]}
        description="Our sales, parts and service teams are on the dock six days a week, ready to help with your next build, repower or part."
      />
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Reveal><SectionLabel>Get in touch</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mt-5 mb-12 text-balance">
                  We're always <span className="italic font-normal text-muted-foreground">on the dock.</span>
                </h2>
              </Reveal>
              <StaggerGroup className="space-y-6">
                {info.map(({ i: Icon, t, d }) => (
                  <StaggerItem key={t}>
                    <div className="group flex gap-5">
                      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-500">
                        <Icon className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                      </div>
                      <div>
                        <div className="font-display text-xl">{t}</div>
                        <div className="text-muted-foreground whitespace-pre-line text-sm mt-1 font-light">{d}</div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <Reveal y={50} delay={0.2}>
              <motion.form
                onSubmit={onSubmit}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="rounded-2xl bg-card border border-border p-9 space-y-6 shadow-card hover:shadow-elevated transition-shadow duration-700 relative overflow-hidden"
              >
                <input type="hidden" name="_subject" value="New CoastalPro Marine contact message" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Name</label>
                    <input name="Name" required className="mt-2 w-full bg-secondary border-0 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Phone</label>
                    <input name="Phone" className="mt-2 w-full bg-secondary border-0 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</label>
                  <input name="Email" type="email" required className="mt-2 w-full bg-secondary border-0 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">How can we help?</label>
                  <textarea name="Message" required rows={5} className="mt-2 w-full bg-secondary border-0 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none" />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium group w-full rounded-full bg-foreground text-background py-4 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send message <Send className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-500" /></>}
                </button>
              </motion.form>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
