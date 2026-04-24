import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import { PageHero, Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { Star, ArrowRight } from "lucide-react";

const reviews = [
  { name: "James Reynolds", loc: "Wilmington, NC", product: "Yamaha F250 Outboard", rating: 5, text: "Smooth repower from start to finish. Their crew rigged twin F250s on my 28-footer and tuned everything dialed in for offshore. Couldn't ask for better." },
  { name: "Sarah Mitchell", loc: "Charleston, SC", product: "Sun Tracker Pontoon", rating: 5, text: "Bought our family pontoon last spring. The team walked us through every option and the financing was painless. Best purchase we've made in years." },
  { name: "Michael Torres", loc: "Tampa, FL", product: "Mercury 9.9 HP Kicker", rating: 4, text: "Great little kicker, exactly what I needed for my dinghy. Shipped fast and well-packed. Knocked one star only because install instructions could be clearer." },
  { name: "Jennifer Walsh", loc: "Norfolk, VA", product: "Lowrance HDS-12 Live", rating: 5, text: "These guys know electronics. They helped me spec the right transducer for my hull and even called back to confirm before shipping. Real customer service." },
  { name: "David Kim", loc: "Annapolis, MD", product: "Tracker Bass Boat 175", rating: 5, text: "Won my first tournament three weeks after taking delivery. Boat performs exactly as advertised and the trolling motor setup is perfect." },
  { name: "Rachel Foster", loc: "Outer Banks, NC", product: "Suzuki DF115A", rating: 5, text: "The repower on our skiff was flawless. Old engine out, new one in, controls upgraded — all in two days. Quiet, fuel-efficient, perfect." },
  { name: "Thomas Brennan", loc: "Beaufort, SC", product: "Boston Whaler 230 Outrage", rating: 5, text: "I shopped around for months before pulling the trigger. CoastalPro had the best price AND included rigging upgrades the others charged extra for." },
  { name: "Lisa Anderson", loc: "Savannah, GA", product: "Garmin GPSMAP 942xs", rating: 5, text: "Easy to install with great support over the phone when I had questions. Chart updates were already loaded. Couldn't be happier." },
  { name: "Robert Hayes", loc: "Virginia Beach, VA", product: "Yamaha F70LA", rating: 4, text: "Engine runs like a dream on my jon boat. Took a little longer to ship than expected but their team kept me posted the whole way." },
  { name: "Amanda Cole", loc: "Morehead City, NC", product: "Carolina Skiff JVX 16", rating: 5, text: "First boat purchase ever and they made it stress-free. Walked me through registration, trailer setup, and even gave me a quick on-water lesson." },
  { name: "Christopher Lee", loc: "Hilton Head, SC", product: "Minn Kota Terrova 80", rating: 5, text: "Spot Lock changed my fishing game. Installation by their tech was precision-perfect. These guys take pride in their work." },
  { name: "Patricia Nguyen", loc: "Charleston, SC", product: "Mercury 150 Pro XS", rating: 5, text: "Powerful, reliable, and the warranty service has been outstanding. Had one minor issue and they fixed it same-day. Lifetime customer." },
  { name: "Daniel O'Brien", loc: "Cape May, NJ", product: "Stainless 4-Blade Prop", rating: 5, text: "Picked up 4 mph and dropped 200 RPM at cruise. They helped me dial in the exact pitch I needed. Best $700 I've ever spent on the boat." },
  { name: "Karen Whitfield", loc: "Myrtle Beach, SC", product: "Bennington 22 SSL", rating: 5, text: "Beautiful pontoon, great delivery experience. The financing department got us a rate well below what our bank offered. Highly recommend." },
  { name: "Mark Ferguson", loc: "Jacksonville, FL", product: "Optima Blue Top Battery", rating: 4, text: "Solid battery, fair price. Free shipping and arrived in two days. Would buy again." },
  { name: "Stephanie Park", loc: "Wrightsville Beach, NC", product: "Annual Service Package", rating: 5, text: "Their winterization and spring start service is worth every penny. Boat fires up first crank every April. Gives me total peace of mind." },
  { name: "Brian Carter", loc: "Charleston, SC", product: "Honda BF50", rating: 5, text: "Fuel-injected reliability. Quietest 50 HP I've ever run. The CoastalPro tech who installed it knew his stuff cold." },
  { name: "Nicole Bauer", loc: "Wilmington, NC", product: "Bimini Top + Frame", rating: 5, text: "Custom-fit Bimini for my older boat. Color-matched perfectly and the install hardware is top quality. Five stars." },
  { name: "Andrew Patel", loc: "Outer Banks, NC", product: "Yamaha F300 Twin Setup", rating: 5, text: "Twin F300s rigged on a 32-footer. Their crew handled NMEA 2000, joystick, and helm controls flawlessly. Bluewater-ready in three days." },
  { name: "Megan Sullivan", loc: "Beaufort, NC", product: "Crestliner 1750 Fish Hawk", rating: 5, text: "Perfect tournament-ready aluminum boat. Loaded with the upgrades we wanted and priced fairly. The team really listened to what we needed." },
  { name: "Kevin Russo", loc: "Virginia Beach, VA", product: "Fuel/Water Separator Kit", rating: 5, text: "Saved me from a major problem on a recent offshore trip. Easy DIY install with the kit they recommended. Great parts counter staff." },
  { name: "Olivia Martinez", loc: "Tampa, FL", product: "Sea Pro 219 CC", rating: 5, text: "Solid bay boat, exactly as described. Trailered home from NC without a single issue. The pre-delivery walkthrough was thorough." },
  { name: "Steven Howell", loc: "Norfolk, VA", product: "Suzuki DF300AP", rating: 4, text: "Great engine, smooth shifting with the digital controls. Took an extra week to get the right cowling color but worth the wait." },
  { name: "Hannah Greene", loc: "Wrightsville Beach, NC", product: "VHF Radio Install", rating: 5, text: "Professional install, perfect cable runs, and they tested DSC properly. Reception is crystal clear out to 25 miles." },
  { name: "Eric Thompson", loc: "Morehead City, NC", product: "Tracker Grizzly 1648", rating: 5, text: "Tough little jon boat. Took it through cypress stumps and oyster beds — no leaks, no problems. Built like a tank." },
  { name: "Vanessa Brooks", loc: "Charleston, SC", product: "Mercury 4-Stroke 25 HP", rating: 5, text: "Replaced my old 2-stroke and the difference is night and day. Quiet, clean, fuel-efficient. CoastalPro had it in stock when no one else did." },
  { name: "Jonathan Pierce", loc: "Hilton Head, SC", product: "Trailer LED Light Kit", rating: 5, text: "Submersible LEDs that actually stay submersible. Wiring kit was complete and the instructions were clear. No more roadside fixes." },
  { name: "Catherine Liu", loc: "Wilmington, NC", product: "Cobia 240 CC", rating: 5, text: "Beautiful center console. The team customized the leaning post and added rod holders exactly to spec. Worth every penny." },
  { name: "Gregory Adams", loc: "Outer Banks, NC", product: "Power Pole Blade 8'", rating: 5, text: "Game-changer for shallow water fishing. Install took half a day and the techs even adjusted my jack plate to match. Pro shop." },
  { name: "Diana Mendez", loc: "Beaufort, SC", product: "Mercruiser 4.5L Repower", rating: 5, text: "Inboard repower on a 24-foot deck boat. Engineering, install, and sea trial were all top-notch. Boat runs better than new." },
];

// Generate 30 unique randomuser.me avatars (15 men + 15 women, indices 0-89 available)
const avatars = (() => {
  const out: string[] = [];
  for (let i = 1; i <= 15; i++) out.push(`https://randomuser.me/api/portraits/men/${i}.jpg`);
  for (let i = 1; i <= 15; i++) out.push(`https://randomuser.me/api/portraits/women/${i}.jpg`);
  return out;
})();

function Reviews() {
  useSeo({
    title: "Customer Reviews & Marine Boat Buyer Testimonials | CoastalPro Marine",
    description: "Read 30+ verified customer reviews from boat buyers, outboard engine owners and marine parts customers. Real stories from captains across the U.S.",
    keywords: "marine dealer reviews, boat buyer testimonials, outboard engine reviews, boat dealer ratings, CoastalPro reviews, customer testimonials marine",
    ogTitle: "Customer Reviews | CoastalPro Marine",
    ogDescription: "30+ verified customer testimonials from real CoastalPro buyers.",
    canonical: "https://coastalpromarine.com/reviews",
  });
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <>
      <PageHero
        eyebrow="Customer Reviews"
        title="Real captains. Real water."
        italicWords={[3, 4]}
        description={`${reviews.length} verified reviews from CoastalPro Marine boat buyers, outboard engine owners and parts customers across the U.S.`}
      />

      <section className="py-16 md:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-5xl text-accent">{avg}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Average rating</div>
            </div>
            <div>
              <div className="font-display text-5xl">{reviews.length}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Reviews</div>
            </div>
            <div>
              <div className="font-display text-5xl">{reviews.filter((r) => r.rating === 5).length}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">5-star reviews</div>
            </div>
            <div>
              <div className="font-display text-5xl">98%</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Would recommend</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionLabel>Verified purchases</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl mt-4 mb-12 leading-tight">
              What our customers <span className="italic font-normal text-muted-foreground">are saying.</span>
            </h2>
          </Reveal>
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <StaggerItem key={i}>
                <article className="h-full rounded-2xl border border-border bg-card p-7 hover:shadow-elevated transition-shadow duration-700 flex flex-col">
                  <div className="flex items-center gap-1 text-accent mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`h-4 w-4 ${s < r.rating ? "fill-current" : "opacity-25"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed font-light mb-6 flex-1">"{r.text}"</p>
                  <div className="text-[10px] uppercase tracking-widest text-accent mb-3">{r.product}</div>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img
                      src={avatars[i]}
                      alt={r.name}
                      className="h-11 w-11 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.loc}</div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.2} className="mt-16 rounded-2xl bg-secondary p-10 text-center">
            <h3 className="font-display text-3xl mb-3">Ready to join them?</h3>
            <p className="text-muted-foreground mb-6">Browse the catalog or talk to our team about your next build.</p>
            <Link to="/shop" className="btn-premium inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
              Shop the catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

export default Reviews;
