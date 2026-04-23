import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Container } from "../components/Section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Stop by. Or give us a call."
        description="Our sales, parts and service teams are on the dock six days a week, ready to help with your next build, repower or part."
      />
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { i: MapPin, t: "Showroom & Service", d: "2400 Harbor Way\nWilmington, NC 28401" },
                { i: Phone, t: "Phone", d: "(800) 555-0199" },
                { i: Mail, t: "Email", d: "sales@coastalpromarine.com" },
                { i: Clock, t: "Hours", d: "Mon–Fri 8am–6pm\nSat 9am–4pm · Sun closed" },
              ].map(({ i: Icon, t, d }) => (
                <div key={t} className="flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-display text-xl">{t}</div>
                    <div className="text-muted-foreground whitespace-pre-line text-sm mt-1">{d}</div>
                  </div>
                </div>
              ))}
            </div>

            <form className="rounded-2xl bg-card border border-border p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Name</label>
                  <input className="mt-1 w-full bg-secondary border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Phone</label>
                  <input className="mt-1 w-full bg-secondary border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <input type="email" className="mt-1 w-full bg-secondary border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">How can we help?</label>
                <textarea rows={4} className="mt-1 w-full bg-secondary border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-foreground text-background py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Send message
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
